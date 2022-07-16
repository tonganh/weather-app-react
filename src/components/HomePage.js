import React, { useState, useEffect } from 'react'
import { auth, rolesEnum, storeUserInfo } from '../lib/firebase'
import Login from './Login'
import { useNavigate } from 'react-router-dom'
import WeatherForestcast from './WeatherForestcast';
import Admin from './Admin';

function HomePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            let newUser = null;
            if (user) {
                newUser = await storeUserInfo(user);
                if (newUser.role === rolesEnum.USER) {
                    navigate("/weather-foresetcast", { replace: true })
                }
                if (newUser.role === rolesEnum.ADMIN) {
                    navigate("/admin", { replace: true })
                }
            }
            setUser(newUser);
        });
    }, []);

    const HeaderContent = () => {
        if (user && user.role === rolesEnum.USER) {
            return (
                <WeatherForestcast />
            )
        } else if (user && user.role === rolesEnum.ADMIN) {
            return (
                <Admin />
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