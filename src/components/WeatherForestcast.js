import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth, storeUserInfo } from '../lib/firebase'
import { useNavigate } from 'react-router-dom'
import { slugify } from '../common/string.fn'
import SelectDefaultLocation from './SelectDefaultLocation'



function WeatherForestcast() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('hanoi')
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})
    const [userData, setUserData] = useState(null)
    const [bindLocation, setBindLocation] = useState(null)
    const [recommend, setRecommend] = useState([])
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
            const dataUsing = response.data
            console.log("🚀 ~ file: WeatherForestcast.js ~ line 50 ~ axios.get ~ dataUsing", dataUsing)
            const weatherDataUsing = dataUsing.weather[0]
            const { main, description } = weatherDataUsing
            const windData = dataUsing.wind
            const currentData = [];
            if (main === 'Thunderstorm') {
                if (description === 'thunder storm with light rain' || description === 'thunder storm with rain') {
                    currentData.push(<p>Có sấm chớp và mưa vừa và nhẹ, chú ý mang áo mưa, trú vào nơi an toàn nếu thời tiết trở xấu</p>)
                    if (windData.speed > 14) {
                        currentData.push(<p>Gió to, có lốc, có thể sắp mưa to gây ngập lụt, tắc đường</p>)
                    }
                } else {
                    currentData.push(<p>Trời có dông tố và mưa to, tránh một số đoạn đường hay ngập, tắc như...tránh các giao lộ đông đúc</p>)
                }
            }

            if (main === 'Drizzle') {
                if (['light intensity drizzle', 'drizzle'].includes(description)) {
                    currentData.push(<p>Mưa phùn nhẹ, không ảnh hưởng tới tầm nhìn hay giao thông</p>)
                } else {
                    currentData.push(<p>Mưa phùn nặng, gây cản trở tầm nhìn, chú ý cẩn thận</p>)
                }
            }

            if (main === 'Rain') {
                if (description === 'light rain') {
                    currentData.push(<p>Mưa nhẹ, không ảnh hưởng gì đến tầm nhìn hay giao thông</p>)
                } else {
                    currentData.push(<p>Mưa từ vừa đến rất to, cản trở tầm nhìn, đường trơn trượt nguy hiểm ,gây ngập lụt</p>)
                }
            }

            if (main === 'Snow') {
                if (description === 'light snow') {
                    currentData.push(<p>Tuyết rơi mức độ nhẹ, không ảnh hưởng tới giao thông</p>)
                } else {
                    currentData.push(<p>Tuyết rơi, nhiều đoạn đường có thể bị đóng băng gây trơn trượt</p>)
                }
            }

            if (main === 'Clear') {
                currentData.push(<p>Trời trong, thời tiết đẹp, không ảnh hưởng tới giao thông</p>)
            }

            if (main === 'Clouds') {
                if (currentData.main.humidity < 80) {
                    currentData.push(<p>Trời nhiều mây không ảnh hưởng tới giao thông</p>)
                } else {
                    currentData.push(<p>Trời nhiều mây, độ ẩm cao, có khả năng có mưa. Mang ô, áo mưa,...đề phòng</p>)
                }
            }
            setRecommend(currentData)
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
                        <div style={{ width: '100%' }}>
                            <p className='description-up'>{data.weather ? <p>{data.weather[0].main}</p> : null}</p>
                        </div>
                        {/* {data.weather ? <p>{data.weather[0].main}</p> : null} */}
                    </div>
                    <div>
                        {recommend.length && recommend.map(e => e)}
                    </div>
                    {/* <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div> */}
                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className='bold'>{((data.main.feels_like.toFixed() - 32) / 1.8).toFixed(2)}°C</p> : null}
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