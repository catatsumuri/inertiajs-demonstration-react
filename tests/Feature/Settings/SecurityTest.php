<?php

namespace Tests\Feature\Settings;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class SecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_security_routes_are_not_registered()
    {
        $this->assertFalse(Route::has('security.edit'));
        $this->assertFalse(Route::has('user-password.update'));
    }
}
