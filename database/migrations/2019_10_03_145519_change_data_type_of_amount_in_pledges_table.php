<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeDataTypeOfAmountInPledgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pledges', function (Blueprint $table) {
            $table->integer('amount')->change();
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->integer('goal_amount')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pledges', function (Blueprint $table) {
            $table->decimal('amount', 8, 2)->change();
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->decimate('goal_amount',8,2)->change();
        });
    }
}
