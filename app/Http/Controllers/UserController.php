<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Register
     */
    public function register(Request $request)
    {
        Log::debug(__METHOD__ . " : BOF");

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string',
            'password' => 'required|string'
        ]);

        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            $success = true;
            $message = 'User registered successfully';
        } catch (QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
        }

        Log::debug(__METHOD__ . " : EOF");
        return response()->standardResponse([
            'status' => $success,
            'message' => $message
        ]);
    }

    /**
     * Login
     */
    public function login(Request $request)
    {
        Log::debug(__METHOD__ . " : BOF");

        $request->validate([
            'email' => 'required|email|string',
            'password' => 'required|string'
        ]);

        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $success = true;
            $message = 'User logged in successfully';
        } else {
            $success = false;
            $message = 'Unauthorised';
        }
        Log::debug(__METHOD__ . " : EOF");
        return response()->standardResponse([
            'status' => $success,
            'message' => $message
        ]);
    }

    /**
     * Logout
     */
    public function logout()
    {
        Log::debug(__METHOD__ . " : BOF");
        try {
            Session::flush();
            $success = true;
            $message = 'Successfully logged out';
        } catch (QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
        }
        Log::debug(__METHOD__ . " : EOF");
        return response()->standardResponse([
            'status' => $success,
            'message' => $message
        ]);
    }
}
