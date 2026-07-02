import { Head, setLayoutProps, usePage } from '@inertiajs/react';
import { useLang } from '@erag/lang-sync-inertia/react';
import { Code2, KeyRound, Lock } from 'lucide-react';
import InputError from '@/components/input-error';
import SourcePanel from '@/components/source-panel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { passwordDownload } from '@/routes';
import { attempt } from '@/routes/password-download';

const formExampleCode = `import { usePage } from '@inertiajs/react';
import { attempt } from '@/routes/password-download';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const { errors } = usePage<{ errors: { password?: string } }>().props;

// A real full-page POST, not an Inertia XHR visit, so the response can
// be a raw file download instead of an Inertia page/redirect.
<form {...attempt.form()}>
    <Label htmlFor="password">{__('Password')}</Label>
    <Input id="password" type="password" name="password" />
    <InputError message={errors.password} />

    <Button type="submit">{__('Unlock download')}</Button>
</form>`;

const backendExampleCode = `Route::post('password-download', function (Request $request): BinaryFileResponse {
    $request->validate([
        'password' => ['required', 'string'],
    ]);

    if ($request->string('password')->toString() !== 'letmein123') {
        throw ValidationException::withMessages([
            'password' => 'The password is incorrect.',
        ]);
    }

    return response()->download(public_path('favicon.ico'), 'unlocked-favicon.ico');
})->name('password-download.attempt');`;

export default function PasswordDownload() {
    const { __ } = useLang();
    const { errors } = usePage<{ errors: { password?: string } }>().props;
    const sourceExamples = [
        {
            label: __('Frontend'),
            language: 'tsx',
            code: formExampleCode,
            description: [
                __(
                    "It's a plain HTML <form>, not Inertia's <Form> component, because a successful response is a raw file download rather than an Inertia page visit.",
                ),
                __(
                    "Wayfinder's attempt.form() still supplies the action and method attributes for the native form.",
                ),
                __(
                    'Validation errors arrive through the errors shared prop after Laravel redirects back to this page.',
                ),
                __(
                    "No CSRF token field is needed: modern browsers send Sec-Fetch-Site: same-origin on same-origin form submissions, which Laravel's CSRF middleware accepts automatically.",
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
                title: __('Password Download'),
                href: passwordDownload(),
            },
        ],
    });

    return (
        <>
            <Head title={__('Password Download')} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <section className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-background dark:border-sidebar-border">
                    <div className="border-b border-sidebar-border/70 bg-muted/30 px-5 py-3 dark:border-sidebar-border">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4 text-muted-foreground" />
                            <h1 className="text-sm font-semibold">
                                {__('Password Download')}
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 p-5">
                        <div className="rounded-lg border border-dashed border-sidebar-border/70 bg-muted/20 p-5 dark:border-sidebar-border">
                            <p className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                {__(
                                    'Enter the password to unlock the download.',
                                )}
                                <Badge
                                    variant="secondary"
                                    className="font-mono"
                                >
                                    letmein123
                                </Badge>
                            </p>

                            <form
                                {...attempt.form()}
                                className="flex max-w-sm flex-col gap-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        {__('Password')}
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="off"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <Button type="submit" className="w-fit">
                                    <KeyRound className="size-4" />
                                    {__('Unlock download')}
                                </Button>
                            </form>
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
