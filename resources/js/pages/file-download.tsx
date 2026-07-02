import { Head, setLayoutProps } from '@inertiajs/react';
import { useLang } from '@erag/lang-sync-inertia/react';
import { Code2, Download, FileDown } from 'lucide-react';
import SourcePanel from '@/components/source-panel';
import { Button } from '@/components/ui/button';
import { fileDownload } from '@/routes';
import { favicon } from '@/routes/file-download';

const downloadExampleCode = `import { favicon } from '@/routes/file-download';

<Button asChild>
    <a href={favicon.url()}>
        <Download className="size-4" />
        {__('Download :file', { file: 'favicon.ico' })}
    </a>
</Button>`;

const backendExampleCode = `Route::get('file-download/favicon', fn (): BinaryFileResponse => response()->download(public_path('favicon.ico'), 'favicon.ico'))
    ->name('file-download.favicon');

Route::get('file-download', fn (): Response => Inertia::render('file-download'))
    ->name('file-download');`;

export default function FileDownload() {
    const { __ } = useLang();
    const sourceExamples = [
        {
            label: __('Frontend'),
            language: 'tsx',
            code: downloadExampleCode,
            description: [
                __(
                    "It's a plain <a href>, not Inertia's <Link>, because visiting it is a real file download rather than an Inertia page visit.",
                ),
                __(
                    'favicon is a Wayfinder GET route helper; only favicon.url() is needed here, since a link only needs the href string, not a method.',
                ),
                __(
                    "No CSRF token is involved: GET requests are read-only, so Laravel's CSRF middleware skips verification for them entirely.",
                ),
            ],
        },
        {
            label: __('Backend'),
            language: 'php',
            code: backendExampleCode,
        },
    ];

    setLayoutProps({
        breadcrumbs: [
            {
                title: __('File Download'),
                href: fileDownload(),
            },
        ],
    });

    return (
        <>
            <Head title={__('File Download')} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <section className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-background dark:border-sidebar-border">
                    <div className="border-b border-sidebar-border/70 bg-muted/30 px-5 py-3 dark:border-sidebar-border">
                        <div className="flex items-center gap-2">
                            <FileDown className="size-4 text-muted-foreground" />
                            <h1 className="text-sm font-semibold">
                                {__('File Download')}
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 p-5">
                        <div className="rounded-lg border border-dashed border-sidebar-border/70 bg-muted/20 p-5 dark:border-sidebar-border">
                            <Button asChild className="w-fit">
                                <a href={favicon.url()}>
                                    <Download className="size-4" />
                                    {__('Download :file', {
                                        file: 'favicon.ico',
                                    })}
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-1">
                        <Code2 className="size-4 text-muted-foreground" />
                        <h2 className="text-sm font-semibold">
                            {__('Source')}
                        </h2>
                    </div>

                    <SourcePanel sources={sourceExamples} />
                </section>
            </div>
        </>
    );
}
