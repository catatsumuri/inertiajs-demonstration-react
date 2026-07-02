<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_authentication_routes_are_not_registered()
    {
        $this->assertFalse(Route::has('login'));
        $this->assertFalse(Route::has('login.store'));
        $this->assertFalse(Route::has('logout'));
    }
}
