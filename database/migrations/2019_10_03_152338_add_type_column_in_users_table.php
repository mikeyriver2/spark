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

        $companyNames = [
            "Other",
            "Individual",
            "Accenture",
            "AMA Education System",
            "ANZCham",
            "Avon Philippines",
            "Ayala Foundation",
            "Baker McKenzie",
            "BDO",
            "British Embassy",
            "Candy Magazine",
            "Century Properties Group, Inc.",
            "Commune Coffee",
            "Cream Silk",
            "Dutch Chamber of Commerce Inc",
            "E&J Gallo Winery Asia Pacific",
            "Embassy of Belgium",
            "Emperador",
            "European Chamber of Commerce in the Philippines",
            "Felicidad T. Sy Foundation",
            "Fercat Holdings",
            "First Gen Corporation",
            "Globe Telecom, Inc.",
            "Havas Ortega",
            "Hyundai Asia Resources Inc.",
            "Investing in Women",
            "Italian Chamber of Commerce",
            "JG Summit Holdings",
            "Johnson & Johnson International (Singapore), Pte. Ltd",
            "Jollibee",
            "Kimberly Clark",
            "Kotex PH",
            "KPMG RG Manabat & Co",
            "L'Oreal",
            "Ladouce Tampons",
            "LBC Foundation",
            "Lopez Group of Companies",
            "LOreal",
            "Luis Miguel Aboitiz",
            "Magsaysay Global Services Inc.",
            "Mcdonalds",
            "Meralco",
            "Modess",
            "Nestlé",
            "Pepsi-Cola Products Philippines, Inc.",
            "PHINMA, Inc.",
            "PLDT Global Corporation",
            "Procter & Gamble",
            "RFM Corporation",
            "RIMCO",
            "Rustan's Coffee",
            "Rustans",
            "San Miguel Corporation",
            "Sanitary Care Products Asia, Inc. (SCPA)",
            "Seaoil Foundation, Inc.",
            "SGV & Co",
            "Spark",
            "SSI",
            "Teledirect Teleperformance",
            "UCPB-CIIF Foundation",
            "UPS",
            "Whisper",
            "Zuellig Pharma Corporation",
        ];

        foreach($companyNames as $companyName){
            \App\Company::create([
                'name' => $companyName
            ]);
        }

        \App\User::create([
            "name" => "Admin",
            "password" => Hash::make("nimda0917"),
            'email' => "ktbarnes@sparkphilippines.org",
            'company_id' => \App\Company::where('name','Spark')->first()->id,
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
