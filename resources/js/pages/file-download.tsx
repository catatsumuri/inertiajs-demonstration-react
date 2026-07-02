import { Head, setLayoutProps } from '@inertiajs/react';
import { useLang } from '@erag/lang-sync-inertia/react';
import { Code2, Download, FileDown } from 'lucide-react';
import SourcePanel from '@/components/source-panel';
import { Button } from '@/components/ui/button';
import { fileDownload } from '@/routes';

const downloadExampleCode = `<Button asChild>
    <a href={faviconDownloadUrl}>
        <Download className="size-4" />
        {__('Download :file', { file: 'favicon.ico' })}
    </a>
</Button>`;

const backendExampleCode = `Route::get('file-download/favicon', fn (): BinaryFileResponse => response()->download(public_path('favicon.ico'), 'favicon.ico'))
    ->name('file-download.favicon');

Route::get('file-download', fn (): Response => Inertia::render('file-download', [
    'faviconDownloadUrl' => route('file-download.favicon', absolute: false),
]))->name('file-download');`;

type Props = {
    faviconDownloadUrl: string;
};

export default function FileDownload({ faviconDownloadUrl }: Props) {
    const { __ } = useLang();
    const sourceExamples = [
        {
            label: __('Frontend'),
            language: 'tsx',
            code: downloadExampleCode,
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
                                <a href={faviconDownloadUrl}>
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
