import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import weatherImg from '../assets/0-weather-apps.jpg'
/* ライブラリ */
import { auth, uiConfig } from "../lib/firebase";

function Login() {
    return (
        <div className="column panel-block login">
            <div className='login-1st'>
                <div className='login-2st'>
                    <img src={weatherImg} alt="weather-app"></img>
                    <p>今日の天気と交通状況</p>
                    <p>ログインしてから、そのアプリケーションを使えます。</p>
                </div>
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    );
};

export default Login;