<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Person;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Helpers\Google;

class PeopleController extends Controller
{
    public function index()
    {
        $people = Person::select('id', 'first_name', 'last_name', 'url')->get();
    
        return response()->json($people, 200);
    }
    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        $person = Person::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'url' => $this->googleSearchUrl(
                $validatedData['first_name'],
                $validatedData['last_name'],
            )
        ]);

        return response()->json($person, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        $person = Person::findOrFail($id);

        $person->update([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'url' => $this->googleSearchUrl(
                $validatedData['first_name'],
                $validatedData['last_name']
            ),
        ]);

        return response()->json($person, 200);
    }

    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->delete();
    
        return response()->json(['message' => 'Person deleted successfully'], 200);
    }

    private function googleSearchUrl(string $firstName, string $lastName): string
    {
        $google = new Google();
        
        return $google->searchGoogle($firstName, $firstName);
    }
}
