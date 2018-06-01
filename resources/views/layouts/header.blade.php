<div class="container-fluid">
@guest
    <div align="center" style="margin-top: 1%; "><a href='/'><img src="{{asset('storage/images/logo01.png')}}" height="70px"></a></div>
@endguest
 
</div><nav class="navbar navbar-default navbar-static-top" > 
    @guest
    <div style="background-color: #333333;height: 1px"></div>
    @endguest
    <div class="container" style="font-size: large">
        <div class="navbar-header">
            <!-- Collapsed Hamburger -->
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="app-navbar-collapse" style="colot: black;">
        <!-- Left Side Of Navbar -->
        <ul class="nav navbar-nav bg-dark" >  
            @guest     
                <li><a href="{{ url('/')}}">{{ __('Home') }}</a> </li>
                <li><a href="{{ url('/tech')}}">{{ __('Technology') }}</a></li>
                <li><a href="{{ url('/about')}}">{{ __('About') }}</a></li>    
            @else   
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                    PACS<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                     <li><a href="{{ url('/uploadfile') }}">{{ __('Upload Image File') }}</a></li>
                     <li><a href="{{ url('/uploadlist') }}">{{ __('List Uploaded Files') }}</a></li>
                    <li><a href="{{ url('/tus-js') }}">{{ __('tus upload') }}</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">FITPU<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a href="{{ url('/')}}">{{ __('Home') }}</a> </li>
                    <li><a href="{{ url('/tech')}}">{{ __('Technology') }}</a></li>
                    <li><a href="{{ url('/about')}}">{{ __('About') }}</a></li> 
                    </ul>
                </li> 
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">SETTING<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="{{ url('/userprofile')}}">{{ __('User Profile') }}</a></li>
                        <li><a href="{{ url('/dashboard')}}">{{ __('Posts') }}</a></li>
                    </ul>
                </li>
            @endguest
        </ul> 

        <!-- Right Side Of Navbar -->
        <ul class="nav navbar-nav navbar-right">
            <!-- Authentication Links -->
            @guest
                <li><a href="{{ route('login') }}">Login</a></li>
                <li><a href="{{ route('register') }}">Register</a></li>
            @else
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                        {{ Auth::user()->name }} <span class="caret"></span>
                    </a>

                    <ul class="dropdown-menu">
                    <li>
                        <a href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                     document.getElementById('logout-form').submit();">
                            Logout
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                        </li>
                    </ul>
                </li>
            @endguest
        </ul>
        </div>
    </div>
<div style="background-color: #333333;height: 1px"></div>
</nav>
