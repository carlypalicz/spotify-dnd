import React from 'react';
import "./Login.css";
import { loginURL } from "./spotify"

function Login() {
    return (
        <div className="login-body">
            <h1>Log In Page!!</h1>
            <a href={loginURL} className="login-button">Log In With Spotify</a>
        </div>
    )
}

export default Login
