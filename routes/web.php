<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('show.welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/home', 'HomeController@index')->name('home');
Route::get('/todolist', 'HomeController@todolist')->name('todolist');
Route::get('/showregisteredusers', 'AdminController@showusers');

//Route::get('/userprofile', function (Request $request) {
//    return view('userprofile'); 
//}); 
Route::get('/userprofile','UserController@retrieve_last_update');


use Illuminate\Http\Request;

//Route::get('/userprofile/{user_id?}', 
//    array('as' => 'userprofile', 'uses' => 'AdminController@userprofile'));

Route::get('/userprofile/{user_id}', 'AdminController@userprofile');

Route::get('/uploadlist/{user_id}','AdminController@retrieve_uploads');


Route::post('/userprofile', function (Request $request) {
    $data = $request->validate([
        'title' => 'required|max:255',
        'name' => 'required|max:255',
        'hospital' => 'required|max:255',
        'address' => 'required|max:512',
        'remark' => 'required|max:512',
    ]);
    $data['user_id'] = auth()->user()->id;
    //echo gettype($data);

    //$link = tap(new App\Link($data))->save();
    $user_profile = tap(new App\user_profile($data))->save();

    return redirect('/home');
});

Route::get('/uploadfile','UploadFileController@index');
Route::post('/uploadfile','UploadFileController@showUploadFile');
Route::get('/uploadlist','UploadFileController@retrieve_uploads');
Route::post('/displayimage','UploadFileController@displayimage');

// DICOM viewer
Route::resource('/dwviewer','StateController');
Route::get('/viewer', function(){
    return view('show.dicom.viewer_knd');
});
Route::post('/dwviewer/savestate','StateController@savestate');


//Route::get('/dicom', function () {
//    return view('dicom.viewers.static.dicom_viewer');
//});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Below are tus upload routes
Route::post('/tus_up_paras', 'TusUploadController@upload_parameters');
Route::get('/tus-js', function () {
    return view('tus-js.demo.tus-js');
});

Route::get('test', 'TestController@index');
//Route::post('/getAjaxMsg', 'TestController@testAjax');
Route::post('/getAjaxMsg', 'TusUploadController@upload_parameters');



// Below are routing code from blog
//Route::get('/', 'PagesController@index');
Route::get('/about', 'PagesController@about');
Route::get('/tech', 'PagesController@imaging_analytics');
Route::resource('/contact','ContactUsController');
Route::resource('posts','PostsController');
////Auth::routes();
////Route::get('contact', 'ContactUsController@index');
////Route::post('contact','ContactUsController@store');
Route::get('/dashboard', 'DashboardController@index');

Route::post('/locale', array(
	'before' => 'csrf',
	'as' => 'language-chooser',
	'uses' => 'LanguageController@setLocale'
));