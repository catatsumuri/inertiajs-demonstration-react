<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
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
Route::inertia('file-download', 'file-download')->name('file-download');

Route::inertia('password-download', 'password-download')->name('password-download');
Route::post('password-download', function (Request $request): BinaryFileResponse {
    $request->validate([
        'password' => ['required', 'string'],
    ]);

    if ($request->string('password')->toString() !== 'letmein123') {
        throw ValidationException::withMessages([
            'password' => 'The password is incorrect.',
        ]);
    }

    return response()->download(public_path('favicon.ico'), 'unlocked-favicon.ico');
})->name('password-download.attempt');

require __DIR__.'/settings.php';
