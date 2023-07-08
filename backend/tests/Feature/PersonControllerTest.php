<?php

use App\Models\Person;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class PersonControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function testIndex()
    {
        // Create some dummy people records in the database
        Person::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'url' => 'https://example.com/john',
        ]);
        Person::factory()->create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'url' => 'https://example.com/jane',
        ]);

        // Send a GET request to the index route
        $response = $this->getJson('/api/people');

        // Assert the response status code is 200 (OK)
        $response->assertStatus(200);

        // Assert the response data contains the expected people records
        $response->assertJson([
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'url' => 'https://example.com/john',
            ],
            [
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'url' => 'https://example.com/jane',
            ],
        ]);

        // Assert the response data has the correct structure (id, first_name, last_name, url)
        $response->assertJsonStructure([
            '*' => ['id', 'first_name', 'last_name', 'url'],
        ]);
    }
}
