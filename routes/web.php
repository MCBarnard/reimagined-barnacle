<?php

use Illuminate\Support\Facades\Route;

Route::get('/{vue?}', function () {
    return view('index');
})->where('vue', '^((?!js|css|fonts|images|vendors~js)[\/\w\.-]*)');
