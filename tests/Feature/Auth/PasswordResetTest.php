<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_reset_routes_are_not_registered(): void
    {
        $this->assertFalse(Route::has('password.request'));
        $this->assertFalse(Route::has('password.email'));
        $this->assertFalse(Route::has('password.reset'));
        $this->assertFalse(Route::has('password.store'));
        $this->assertFalse(Route::has('password.update'));
    }
}
