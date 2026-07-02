<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class PasswordConfirmationTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_confirmation_routes_are_not_registered()
    {
        $this->assertFalse(Route::has('password.confirm'));
        $this->assertFalse(Route::has('password.confirm.store'));
        $this->assertFalse(Route::has('password.confirmation'));
    }
}
