import CodeBlock from '@/components/code-block';

type SourceExample = {
    code: string;
    description?: string | string[];
    label: string;
    language?: string;
};

type Props = {
    sources: SourceExample[];
};

export default function SourcePanel({ sources }: Props) {
    return (
        <section className="space-y-4">
            {sources.map((source) => (
                <div
                    key={source.label}
                    className="rounded-xl border border-sidebar-border/70 bg-muted/20 p-4 dark:border-sidebar-border"
                >
                    <CodeBlock
                        code={source.code}
                        label={source.label}
                        language={source.language}
                    />
                    {source.description &&
                        (Array.isArray(source.description) ? (
                            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                                {source.description.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-3 text-sm text-muted-foreground">
                                {source.description}
                            </p>
                        ))}
                </div>
            ))}
        </section>
    );
}
