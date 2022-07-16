import React, { useState, useEffect } from 'react'
import { auth, storeUserInfo } from '../lib/firebase'
import Login from './Login'
import { useNavigate } from 'react-router-dom'
import WeatherForestcast from './WeatherForestcast';

function HomePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            let newUser = null;
            if (user) {
                newUser = await storeUserInfo(user);
                navigate("/weather-foresetcast", { replace: true })
            }
            setUser(newUser);
        });
    }, []);

    const HeaderContent = () => {
        if (user) {
            return (
                <WeatherForestcast />
            )
        } else {
            return (<Login />)
        }
    }


    return (
        <div className="">
            <header class="navbar">
                <HeaderContent />
            </header >
        </div >
    )
}

export default HomePage