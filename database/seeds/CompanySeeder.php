<?php

use Illuminate\Database\Seeder;
use App\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $companyNames = [
            'Hackazouk',
            'Spark',
            'Xolve',
            'Kantong Banda'
        ];

        foreach($companyNames as $companyName){
            Company::create([
                'name' => $companyName
            ]);
        }
    }
}
