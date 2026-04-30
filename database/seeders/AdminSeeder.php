<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeede extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Admin::create([
                'admin_id' => 1,
                'admin_name' => 'System Admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
            ]);

            public function run(): void {
                $this->call(AdminSeeder::class);
            }
    }
}
