<?php

namespace App\Helpers;

class Google
{
    private $apiKey = 'AIzaSyDGrHzPznPzIkbgcNW7T1x1Dc6si47vaZ4';
    private $cx = '41a9bc62e9b88403a';
    private $customSearchUrl = 'https://www.googleapis.com/customsearch/v1?key=';

    public function searchGoogle(string $firstName, string $lastName): string
    {
        $query = "{$firstName}_{$lastName}";
        // $url = "https://www.googleapis.com/customsearch/v1?key=" . urlencode($this->apiKey) . "&cx=" . urlencode($this->cx) . "&q=" . urlencode($query);
        $url = urldecode($this->customSearchUrl) . urlencode($this->apiKey) . "&cx=" . urlencode($this->cx) . "&q=" . urlencode($query);
        $json = file_get_contents($url);
        $data = json_decode($json);
        
        if (isset($data->items[0]->link)) {
            return $data->items[0]->link;
        }
        
        return '';
    }
}