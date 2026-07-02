<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PasswordDownloadTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_can_visit_the_password_download_page()
    {
        $response = $this->get(route('password-download'));

        $response->assertOk();
    }

    public function test_correct_password_downloads_the_file()
    {
        $response = $this->post(route('password-download.attempt'), [
            'password' => 'letmein123',
        ]);

        $response->assertDownload('unlocked-favicon.ico');
    }

    public function test_incorrect_password_is_rejected()
    {
        $response = $this->post(route('password-download.attempt'), [
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors('password');
    }
}
