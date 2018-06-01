
@guest

<div  class="container-fluid" style="background-color: #111111;color: white;">
        <div class="container"  >
            <div class="row " style="margin:1%; ">
        <div class="col-sm-3">


            <h4 class="title">Contact Us</h4>
            <p> <a href="http://www.a-star.edu.sg/" target="_blank">A*Star</a> Central <br>
                Blk 79 Ayer Rajah Crescent <br>
                JTC Launch Pad #05-03 <br>
                Singapore 139955<br>
                <a href="https://www.google.com/maps/dir/Queenstown/A*START+Central,+JTC+LaunchPad,+79+Ayer+Rajah+Crescent,+%2305-03,+139955/@1.296709,103.7844766,17z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x31da1a5234b05815:0x500f7acaedaa4b0!2m2!1d103.7861271!2d1.2941664!1m5!1m1!1s0x31da1a4fe5a3c24f:0x7b7914143b1aade8!2m2!1d103.78747!2d1.298011">Get directions</a><br>
                enquiry@fitpuhealthcare.com </p>
        </div>

        <div class="col-sm-3">
            <h4 class="title">More menu 1</h4>
            <span class="acount-icon">          
            <a href="#"><i class="fa fa-heart" aria-hidden="true"></i> List</a><br>
            <a href="#"><i class="fa fa-users" aria-hidden="true"></i>Group</a><br>
            <a href="#"><i class="fa fa-user" aria-hidden="true"></i> Profile</a><br>
            <a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Language</a>           
            </span>
        </div>
        <div class="col-sm-3">
            <h4 class="title">More menu 2</h4>

            <span class="acount-icon">          
            <a href="#"><i class="fa fa-heart" aria-hidden="true"></i> List</a><br>
            <a href="#"><i class="fa fa-users" aria-hidden="true"></i>Group</a><br>
            <a href="#"><i class="fa fa-user" aria-hidden="true"></i> Profile</a><br>
            <a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Language</a>           
            </span>
        </div>
        <div class="col-sm-3">
            <h4 class="title">Laguage</h4>
            <!-- Language Options-->
              <form action="{{ URL::route('language-chooser')}}" method="post">
                <select name ="locale" style="color: #000;">
                <option value="en">English</option>
                <option value="zh-CN"{{ App::getLocale() === 'zh-CN' ? ' selected': ''}}>
                中文</option>
                
                <input type="submit" value="Choose" style="color: red;">
                               {{Form::token()}} 
                </select>
            </form>
        </div>
        </div>
    </div>  
</div>
<br>
<div class="row text-center" >Copyright © Fitpu Healthcare Pte Ltd, Singapore. 2018<br></div>
@else
<hr>
<div class="row text-center" >Copyright © Fitpu Healthcare Pte Ltd, Singapore. 2018<br></div>
@endguest