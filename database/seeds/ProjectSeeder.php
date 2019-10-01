<?php

use Illuminate\Database\Seeder;
use App\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = [
            [
                "title" => "Discover charity fundraisers on GoFundMe",
                "description" => "Help others by donating to their fundraiser, or start one for someone you care about.",
                "goal_amount" => 50000,
                "banner" => "https://d25oniaj7o2jcw.cloudfront.net/photo-category-charity@2x.jpg"
            ],
            [
                "title" => "Banana Chief's - The Chief of all Banana Chips!",
                "description" => "Banana Chief’s is made of giant bananas (saba) and cooked in coconut oil. Taste the Best Banana Chips in the Philippines !",
                "goal_amount" => 10000,
                "banner" => "https://static01.nyt.com/images/2019/10/01/world/01china-parade-photos-newtop/merlin_161898429_73d817b2-55f1-4ed8-80d0-a7c6f8629176-articleLarge.jpg?quality=90&auto=webp 600w,https://static01.nyt.com/images/2019/10/01/world/01china-parade-photos-newtop/merlin_161898429_73d817b2-55f1-4ed8-80d0-a7c6f8629176-jumbo.jpg?quality=90&auto=webp 1024w,https://static01.nyt.com/images/2019/10/01/world/01china-parade-photos-newtop/merlin_161898429_73d817b2-55f1-4ed8-80d0-a7c6f8629176-superJumbo.jpg?quality=90&auto=webp 2048w"
            ],
            [
                "title" => "RIOtaso: Scrap Fabric to Fashion",
                "description" => "#RIOtaso: carefully curating scrap fabric to create new things",
                "goal_amount" => 100,
                "banner" => "https://www.pandotrip.com/wp-content/uploads/2018/11/Top-10-Things-to-See-and-Do-in-the-Philippines.jpg"
            ],
        ];

        foreach($projects as $project){
            Project::create(
                $project
            );
        }
    }
}
