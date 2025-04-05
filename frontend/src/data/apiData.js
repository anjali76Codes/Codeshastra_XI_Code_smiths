const apiData = {
  'Get users': {
    title: 'Get users',
    description: 'Fetch a list of all users.',
    endpoint: 'http://localhost:3000/api/users',
    method: 'GET',
    usage: `
    <ul class="list-disc list-inside space-y-1">
      <li>Use this endpoint in any HTTP client (like Fetch, Axios, Postman).</li>
      <li>The endpoint supports <strong>GET</strong> requests.</li>
      <li>No path or query parameters are needed.</li>
      <li>You can try the code in the right panel using various programming languages.</li>
    </ul>
  `,
    code: {
      javascript: {
        fetch: `fetch('http://localhost:3000/api/users')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`,

        axios: `import axios from 'axios';

axios.get('http://localhost:3000/api/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,

        http: `const http = require('http');

http.get('http://localhost:3000/api/users', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
}).on('error', err => console.error(err));`
      },
      python: {
        requests: `import requests

response = requests.get('http://localhost:3000/api/users')
print(response.json())`,

        urllib: `import urllib.request
import json

with urllib.request.urlopen('http://localhost:3000/api/users') as response:
    data = json.loads(response.read().decode())
    print(data)`,

        httpx: `import httpx

response = httpx.get('http://localhost:3000/api/users')
print(response.json())`
      },
      ruby: {
        nethttp: `require 'net/http'
require 'json'

uri = URI('http://localhost:3000/api/users')
res = Net::HTTP.get(uri)
puts JSON.parse(res)`,

        httparty: `require 'httparty'

response = HTTParty.get('http://localhost:3000/api/users')
puts response.parsed_response`,

        faraday: `require 'faraday'
require 'json'

conn = Faraday.new
response = conn.get('http://localhost:3000/api/users')
puts JSON.parse(response.body)`
      },
      php: {
        file_get_contents: `<?php
$response = file_get_contents('http://localhost:3000/api/users');
$data = json_decode($response, true);
print_r($data); ?>`,

        curl: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:3000/api/users');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
$data = json_decode($response, true);
print_r($data); ?>`,

        guzzle: `<?php
require 'vendor/autoload.php';

$client = new GuzzleHttp\\Client();
$response = $client->request('GET', 'http://localhost:3000/api/users');
$data = json_decode($response->getBody(), true);
print_r($data); ?>`
      },
    },
  },


  'Get user by id': {
    title: 'Get user by ID',
    description: 'Fetch a single user by their unique ID.',
    endpoint: 'http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad',
    method: 'GET',
    usage: `
    <ul class="list-disc list-inside space-y-1">
      <li>Use this endpoint in any HTTP client (like Fetch, Axios, Postman).</li>
      <li>The endpoint supports <strong>GET</strong> requests.</li>
      <li>Replace <code>{id}</code> in the URL with the user's actual ID (e.g., <code>/users/67f0e09f55ea7cfc6a47d8ad</code>).</li>
      <li>You can try the code in the right panel using various programming languages.</li>
    </ul>
  `,
    code: {
      javascript: {
        fetch: `fetch('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`,

        axios: `import axios from 'axios';

axios.get('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,

        http: `const http = require('http');

http.get('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
}).on('error', err => console.error(err));`
      },
      python: {
        requests: `import requests

response = requests.get('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad')
print(response.json())`,

        urllib: `import urllib.request
import json

with urllib.request.urlopen('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad') as response:
    data = json.loads(response.read().decode())
    print(data)`,

        httpx: `import httpx

response = httpx.get('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad')
print(response.json())`
      },
      ruby: {
        nethttp: `require 'net/http'
require 'json'

uri = URI('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad')
res = Net::HTTP.get(uri)
puts JSON.parse(res)`,

        httparty: `require 'httparty'

response = HTTParty.get('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad')
puts response.parsed_response`,

        faraday: `require 'faraday'
require 'json'

conn = Faraday.new
response = conn.get('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad')
puts JSON.parse(response.body)`
      },
      php: {
        file_get_contents: `<?php
$response = file_get_contents('http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad');
$data = json_decode($response, true);
print_r($data); ?>`,

        curl: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
$data = json_decode($response, true);
print_r($data); ?>`,

        guzzle: `<?php
require 'vendor/autoload.php';

$client = new GuzzleHttp\\Client();
$response = $client->request('GET', 'http://localhost:3000/api/users/67f0e09f55ea7cfc6a47d8ad');
$data = json_decode($response->getBody(), true);
print_r($data); ?>`
      },
    },
  },


  'Get a random quote': {
    title: 'Get a random quote',
    description: 'Fetch a randomly selected quote from the list.',
    endpoint: 'https://api.freeapi.app/api/v1/public/quotes/quote/random',
    method: 'GET',
    usage: `
        <ul class="list-disc list-inside space-y-1">
          <li>Use this endpoint in any HTTP client (like Fetch, Axios, Postman).</li>
          <li>The endpoint supports <strong>GET</strong> requests.</li>
          <li>No parameters are required. It returns a single random quote.</li>
          <li>You can try the code in the right panel using various programming languages.</li>
        </ul>
      `,
    code: {
      javascript: {
        fetch: `fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
                  .then(res => res.json())
                  .then(data => console.log(data))
                  .catch(err => console.error(err));`,

        axios: `import axios from 'axios';
              
              axios.get('https://api.freeapi.app/api/v1/public/quotes/quote/random')
                .then(response => console.log(response.data))
                .catch(error => console.error(error));`,

        http: `const https = require('https');
              
              https.get('https://api.freeapi.app/api/v1/public/quotes/quote/random', (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => console.log(JSON.parse(data)));
              }).on('error', err => console.error(err));`
      },
      python: {
        requests: `import requests
  
  response = requests.get('https://api.freeapi.app/api/v1/public/quotes/quote/random')
  print(response.json())`,

        urllib: `import urllib.request
  import json
  
  with urllib.request.urlopen('https://api.freeapi.app/api/v1/public/quotes/quote/random') as response:
      data = json.loads(response.read().decode())
      print(data)`,

        httpx: `import httpx
  
  response = httpx.get('https://api.freeapi.app/api/v1/public/quotes/quote/random')
  print(response.json())`
      },
      ruby: {
        nethttp: `require 'net/http'
  require 'json'
  
  uri = URI('https://api.freeapi.app/api/v1/public/quotes/quote/random')
  res = Net::HTTP.get(uri)
  puts JSON.parse(res)`,

        httparty: `require 'httparty'
  
  response = HTTParty.get('https://api.freeapi.app/api/v1/public/quotes/quote/random')
  puts response.parsed_response`,

        faraday: `require 'faraday'
  require 'json'
  
  conn = Faraday.new
  response = conn.get('https://api.freeapi.app/api/v1/public/quotes/quote/random')
  puts JSON.parse(response.body)`
      },
      php: {
        file_get_contents: `<?php
  $response = file_get_contents('https://api.freeapi.app/api/v1/public/quotes/quote/random');
  $data = json_decode($response, true);
  print_r($data); ?>`,

        curl: `<?php
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://api.freeapi.app/api/v1/public/quotes/quote/random');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($ch);
  curl_close($ch);
  $data = json_decode($response, true);
  print_r($data); ?>`,

        guzzle: `<?php
  require 'vendor/autoload.php';
  
  $client = new GuzzleHttp\\Client();
  $response = $client->request('GET', 'https://api.freeapi.app/api/v1/public/quotes/quote/random');
  $data = json_decode($response->getBody(), true);
  print_r($data); ?>`
      },
    },
  },

  'Get a random joke': {
    title: 'Get a random joke',
    description: 'Retrieve a random joke from the API.',
    endpoint: 'https://api.freeapi.app/api/v1/public/jokes/joke/random',
    method: 'GET',
    usage: `
        <ul class="list-disc list-inside space-y-1">
          <li>Use this endpoint in any HTTP client (like Fetch, Axios, Postman).</li>
          <li>The endpoint supports <strong>GET</strong> requests.</li>
          <li>No parameters are required. It returns a random joke on each request.</li>
          <li>You can try the code in the right panel using various programming languages.</li>
        </ul>
      `,
    code: {
      javascript: {
        fetch: `fetch('https://api.freeapi.app/api/v1/public/jokes/joke/random')
                  .then(res => res.json())
                  .then(data => console.log(data))
                  .catch(err => console.error(err));`,

        axios: `import axios from 'axios';
              
              axios.get('https://api.freeapi.app/api/v1/public/jokes/joke/random')
                .then(response => console.log(response.data))
                .catch(error => console.error(error));`,

        http: `const https = require('https');
              
              https.get('https://api.freeapi.app/api/v1/public/jokes/joke/random', (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => console.log(JSON.parse(data)));
              }).on('error', err => console.error(err));`
      },
      python: {
        requests: `import requests
  
  response = requests.get('https://api.freeapi.app/api/v1/public/jokes/joke/random')
  print(response.json())`,

        urllib: `import urllib.request
  import json
  
  with urllib.request.urlopen('https://api.freeapi.app/api/v1/public/jokes/joke/random') as response:
      data = json.loads(response.read().decode())
      print(data)`,

        httpx: `import httpx
  
  response = httpx.get('https://api.freeapi.app/api/v1/public/jokes/joke/random')
  print(response.json())`
      },
      ruby: {
        nethttp: `require 'net/http'
  require 'json'
  
  uri = URI('https://api.freeapi.app/api/v1/public/jokes/joke/random')
  res = Net::HTTP.get(uri)
  puts JSON.parse(res)`,

        httparty: `require 'httparty'
  
  response = HTTParty.get('https://api.freeapi.app/api/v1/public/jokes/joke/random')
  puts response.parsed_response`,

        faraday: `require 'faraday'
  require 'json'
  
  conn = Faraday.new
  response = conn.get('https://api.freeapi.app/api/v1/public/jokes/joke/random')
  puts JSON.parse(response.body)`
      },
      php: {
        file_get_contents: `<?php
  $response = file_get_contents('https://api.freeapi.app/api/v1/public/jokes/joke/random');
  $data = json_decode($response, true);
  print_r($data); ?>`,

        curl: `<?php
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://api.freeapi.app/api/v1/public/jokes/joke/random');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($ch);
  curl_close($ch);
  $data = json_decode($response, true);
  print_r($data); ?>`,

        guzzle: `<?php
  require 'vendor/autoload.php';
  
  $client = new GuzzleHttp\\Client();
  $response = $client->request('GET', 'https://api.freeapi.app/api/v1/public/jokes/joke/random');
  $data = json_decode($response->getBody(), true);
  print_r($data); ?>`
      },
    },
  },

  'Get products': {
    title: 'Get products',
    description: 'Fetch a list of available products.',
    endpoint: 'https://api.freeapi.app/api/v1/public/products',
    method: 'GET',
    usage: `
        <ul class="list-disc list-inside space-y-1">
          <li>Use this endpoint in any HTTP client (like Fetch, Axios, Postman).</li>
          <li>The endpoint supports <strong>GET</strong> requests.</li>
          <li>No parameters are needed. You will receive a list of all available products.</li>
          <li>You can try the code in the right panel using various programming languages.</li>
        </ul>
      `,
    code: {
      javascript: {
        fetch: `fetch('https://api.freeapi.app/api/v1/public/products')
                  .then(res => res.json())
                  .then(data => console.log(data))
                  .catch(err => console.error(err));`,

        axios: `import axios from 'axios';
              
              axios.get('https://api.freeapi.app/api/v1/public/products')
                .then(response => console.log(response.data))
                .catch(error => console.error(error));`,

        http: `const https = require('https');
              
              https.get('https://api.freeapi.app/api/v1/public/products', (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => console.log(JSON.parse(data)));
              }).on('error', err => console.error(err));`
      },
      python: {
        requests: `import requests
  
  response = requests.get('https://api.freeapi.app/api/v1/public/products')
  print(response.json())`,

        urllib: `import urllib.request
  import json
  
  with urllib.request.urlopen('https://api.freeapi.app/api/v1/public/products') as response:
      data = json.loads(response.read().decode())
      print(data)`,

        httpx: `import httpx
  
  response = httpx.get('https://api.freeapi.app/api/v1/public/products')
  print(response.json())`
      },
      ruby: {
        nethttp: `require 'net/http'
  require 'json'
  
  uri = URI('https://api.freeapi.app/api/v1/public/products')
  res = Net::HTTP.get(uri)
  puts JSON.parse(res)`,

        httparty: `require 'httparty'
  
  response = HTTParty.get('https://api.freeapi.app/api/v1/public/products')
  puts response.parsed_response`,

        faraday: `require 'faraday'
  require 'json'
  
  conn = Faraday.new
  response = conn.get('https://api.freeapi.app/api/v1/public/products')
  puts JSON.parse(response.body)`
      },
      php: {
        file_get_contents: `<?php
  $response = file_get_contents('https://api.freeapi.app/api/v1/public/products');
  $data = json_decode($response, true);
  print_r($data); ?>`,

        curl: `<?php
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://api.freeapi.app/api/v1/public/products');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($ch);
  curl_close($ch);
  $data = json_decode($response, true);
  print_r($data); ?>`,

        guzzle: `<?php
  require 'vendor/autoload.php';
  
  $client = new GuzzleHttp\\Client();
  $response = $client->request('GET', 'https://api.freeapi.app/api/v1/public/products');
  $data = json_decode($response->getBody(), true);
  print_r($data); ?>`
      },
    },
  },
};

export default apiData; 