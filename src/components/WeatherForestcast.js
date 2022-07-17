import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth, storeUserInfo } from '../lib/firebase'
import { useNavigate } from 'react-router-dom'
import SelectDefaultLocation from './SelectDefaultLocation'



function WeatherForestcast() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('hanoi')
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})
    const [userData, setUserData] = useState(null)
    const [bindLocation, setBindLocation] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            let newUser = null;
            if (user) {
                newUser = await storeUserInfo(user);
                setUserData(newUser)
                if (newUser.location === "") {
                    setOpen(true)
                } else {
                    setBindLocation(newUser.location)
                }
            }
        });
    }, []);

    const logout = () => {
        auth.signOut();
        navigate("/", { replace: true })
    };

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${bindLocation}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

    const searchLocation = (event) => {
        console.log("location", location);
        if (event.key === 'Enter') {
            setBindLocation(location)
        }
    }

    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data)
            console.log(response.data)
        })
        setLocation('')
    }, [bindLocation])
    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text" />
                <div className='logout-1st'>
                    <button className='logout-btn' onClick={logout}>Log out</button>
                </div>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1 style={{ color: 'white' }}>{((data.main.temp.toFixed() - 32) / 1.8).toFixed(2)}°C</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>
            <SelectDefaultLocation open={open} setOpen={setOpen} user={userData} setBindLocation={setBindLocation} />
        </div>
    );
}

export default WeatherForestcast;