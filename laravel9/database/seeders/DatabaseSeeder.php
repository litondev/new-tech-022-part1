<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{
    User,
    Product
};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {    
        User::create([
            "name" => "admin",
            "email" => "admin@gmail.com",
            "password" => \Hash::make("12345678")
        ]);

        for($i=0;$i<10;$i++){
            Product::create([
                "title" => "Product-".$i,                
            ]);
        }
    }
}
