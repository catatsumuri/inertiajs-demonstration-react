<?php

namespace Tests\Feature\Settings;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_routes_are_not_registered()
    {
        $this->assertFalse(Route::has('profile.edit'));
        $this->assertFalse(Route::has('profile.update'));
        $this->assertFalse(Route::has('profile.destroy'));
    }

    public function test_appearance_settings_page_is_displayed()
    {
        $response = $this->get(route('appearance.edit'));

        $response->assertOk();
    }

    public function test_settings_redirects_to_appearance_settings()
    {
        $response = $this->get('/settings');

        $response->assertRedirect('/settings/appearance');
    }
}
