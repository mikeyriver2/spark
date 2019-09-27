<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignIds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function(Blueprint $table){
            $table->unsignedInteger('company_id')->foreign('company_id')->references('id')->on('companies');
        });
        Schema::table('pledges', function(Blueprint $table){
            $table->unsignedInteger("user_id")->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies', function(Blueprint $table){
            $table->dropColumn('user_id');
        });

        Schema::table('pledges', function(Blueprint $table){
            $table->dropColumn('user_id');
        });
    }
}
