<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

class AddTypeColumnInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('type')->default('normal');
        });

        $company = \App\Company::create([
            "name" => "Spark"
        ]);

        \App\User::create([
            "name" => "Admin",
            "password" => Hash::make("nimda0917"),
            'email' => "ktbarnes@sparkphilippines.org",
            'company_id' => $company->id,
            'type' => "admin"
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
}
