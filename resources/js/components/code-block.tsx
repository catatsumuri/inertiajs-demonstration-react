import { useEffect, useState } from 'react';
import { useLang } from '@erag/lang-sync-inertia/react';
import { Check, Copy } from 'lucide-react';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';

type Props = {
    code: string;
    label?: string;
    language?: string;
    className?: string;
};

type HighlightLanguage = 'bash' | 'blade' | 'json' | 'markdown' | 'php' | 'tsx';
type HighlightTheme = 'github-dark' | 'github-light';

const plainTextLanguages = new Set(['text', 'txt', 'plain', 'plaintext']);
const languageAliases: Record<string, HighlightLanguage> = {
    blade: 'blade',
    console: 'bash',
    json: 'json',
    markdown: 'markdown',
    md: 'markdown',
    php: 'php',
    shell: 'bash',
    sh: 'bash',
    tsx: 'tsx',
};

const highlighter = createHighlighterCore({
    themes: [
        () => import('@shikijs/themes/github-light'),
        () => import('@shikijs/themes/github-dark'),
    ],
    langs: [
        () => import('@shikijs/langs/bash'),
        () => import('@shikijs/langs/blade'),
        () => import('@shikijs/langs/json'),
        () => import('@shikijs/langs/markdown'),
        () => import('@shikijs/langs/php'),
        () => import('@shikijs/langs/tsx'),
    ],
    engine: createJavaScriptRegexEngine(),
});

type HighlightedCode = {
    html: string;
    key: string;
};

export default function CodeBlock({ code, label, language, className }: Props) {
    const { __ } = useLang();
    const { resolvedAppearance } = useAppearance();
    const [copiedText, copy] = useClipboard();
    const [highlightedCode, setHighlightedCode] =
        useState<HighlightedCode | null>(null);
    const copied = copiedText === code;
    const normalizedLanguage = language?.toLowerCase();
    const highlightLanguage = normalizedLanguage
        ? languageAliases[normalizedLanguage]
        : undefined;
    const theme: HighlightTheme =
        resolvedAppearance === 'dark' ? 'github-dark' : 'github-light';
    const highlightKey = highlightLanguage
        ? `${theme}:${highlightLanguage}:${code}`
        : null;
    const highlightedHtml =
        highlightedCode?.key === highlightKey ? highlightedCode.html : null;

    useEffect(() => {
        let ignore = false;

        if (
            !normalizedLanguage ||
            plainTextLanguages.has(normalizedLanguage) ||
            !highlightLanguage
        ) {
            return;
        }

        void highlighter
            .then((shiki) =>
                shiki.codeToHtml(code, {
                    lang: highlightLanguage,
                    theme,
                }),
            )
            .then((html) => {
                if (!ignore) {
                    setHighlightedCode({
                        html,
                        key: `${theme}:${highlightLanguage}:${code}`,
                    });
                }
            })
            .catch(() => {
                // Keep the plain text fallback visible when Shiki cannot parse a language.
            });

        return () => {
            ignore = true;
        };
    }, [code, highlightLanguage, normalizedLanguage, theme]);

    return (
        <div
            className={cn(
                'overflow-hidden rounded-md border border-sidebar-border/70 bg-background dark:border-sidebar-border',
                className,
            )}
        >
            <div className="flex min-h-10 items-center justify-between gap-3 border-b border-sidebar-border/70 px-3 py-2 dark:border-sidebar-border">
                <div className="flex min-w-0 items-center gap-2">
                    {label && (
                        <span className="truncate text-sm font-medium">
                            {label}
                        </span>
                    )}
                    {language && (
                        <span className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground uppercase">
                            {language}
                        </span>
                    )}
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 shrink-0 px-2"
                    onClick={() => void copy(code)}
                >
                    {copied ? (
                        <Check className="size-3.5" />
                    ) : (
                        <Copy className="size-3.5" />
                    )}
                    {copied ? __('Copied') : __('Copy')}
                </Button>
            </div>
            {highlightedHtml ? (
                <div
                    className="overflow-x-auto text-xs leading-5 [&_code]:font-mono [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:!bg-transparent [&_pre]:p-4"
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
            ) : (
                <pre className="overflow-x-auto p-4 text-xs leading-5">
                    <code>{code}</code>
                </pre>
            )}
        </div>
    );
}
