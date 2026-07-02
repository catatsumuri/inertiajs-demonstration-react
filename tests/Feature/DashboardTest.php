<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_can_visit_the_dashboard()
    {
        $response = $this->get(route('dashboard'));

        $response->assertOk();
    }

    public function test_guests_can_visit_the_file_download_page()
    {
        $response = $this->get(route('file-download'));

        $response->assertOk();
    }

    public function test_guests_can_download_the_favicon()
    {
        $response = $this->get(route('file-download.favicon'));

        $response->assertDownload('favicon.ico');
    }
}
