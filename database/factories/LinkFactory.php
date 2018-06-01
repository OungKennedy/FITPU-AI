<?php

use Faker\Generator as Faker;

$factory->define(App\Link::class, function (Faker $faker) {
    printf("title: %s, ", $faker->sentence(2));
    printf("url: %s \n", $faker->url);
    return [
        'title' => substr($faker->sentence(2), 0, -1),
        'url' => $faker->url,
        'description' => $faker->paragraph, 
    ];
});
