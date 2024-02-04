<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Abdalhalem',
            'email' => 'abdalhalem@app.com',
            'password' => Hash::make('password123$$'),
            'role' => 'creator'
        ]);


        User::create([
            'name' => 'Mohamed',
            'email' => 'mohamed@app.com',
            'password' => Hash::make('password123$$'),
            'role' => 'user'
        ]);
    }
}
