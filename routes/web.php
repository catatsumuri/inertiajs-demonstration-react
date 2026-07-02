<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use LaravelLang\Locales\Facades\Locales;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

Route::inertia('/', 'welcome')->name('home');

Route::post('/locale', function (Request $request) {
    $locale = $request->string('locale')->toString();

    if (Locales::isInstalled($locale)) {
        session()->put('Accept-Language', $locale);
    }

    return back();
})->name('locale.switch');

Route::inertia('dashboard', 'dashboard')->name('dashboard');
Route::get('file-download/favicon', fn (): BinaryFileResponse => response()->download(public_path('favicon.ico'), 'favicon.ico'))
    ->name('file-download.favicon');
Route::get('file-download', fn (): Response => Inertia::render('file-download', [
    'faviconDownloadUrl' => route('file-download.favicon', absolute: false),
]))->name('file-download');

require __DIR__.'/settings.php';
