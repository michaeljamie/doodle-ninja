import React from 'react';
import './Login.css';

export default function Login(){

function login(){
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

    let redirectUri = encodeURIComponent(`http://localhost:3005/auth/callback`);

    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
}

    return(
        <div className="Login">
            <h1 className = 'welcome'>Doodle Ninja</h1>
            <button className = 'LoginButton' onClick={login}>Login</button>
            <button className = 'LoginButton' onClick={login}>Register</button>
            
        </div>
    )
} 