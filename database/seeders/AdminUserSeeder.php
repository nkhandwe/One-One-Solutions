<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make the first user an admin
        $firstUser = User::first();
        if ($firstUser) {
            $firstUser->makeAdmin();
            $this->command->info('First user has been made admin.');
        }
    }
}
