@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <h1>{{ __('Registered Users') }} </h1>
            @if(count($users) > 0)
                <ul>
                    @foreach($users as $user)
                        <li>{{ __('User Name') }}: {{ $user->name }}</a>
                            {{ __('E-Mail Address') }}: {{ $user->email }}</a>
                            {{ __('Registered Time') }}: {{ $user->created_at }}
                            <a href="/userprofile/{{ $user->id }}">{{ __('User Profile') }}/ </a>
                            <a href="/uploadlist/{{ $user->id }}">{{ __('List Uploaded Files') }}</a>
                        </li>
                    @endforeach
                </ul>
            @else
                <h2>{{ __('No reg user') }}!</h2>
            @endif            
        </div>
    </div>
@endsection

<!-- ->email profiles users-->
