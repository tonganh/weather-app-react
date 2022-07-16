import React, { useState, useEffect } from 'react'
import WeatherForestcast from './components/WeatherForestcast'
import Login from './components/Login'
import { auth, storeUserInfo } from './lib/firebase'
function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      let newUser = null;
      if (user) {
        newUser = await storeUserInfo(user);
      }
      setUser(newUser);
    });
  }, []);

  const HeaderContent = () => {
    if (user) {
      return (
        <div class="navbar-end">
          {/* <div class="navbar-item">
            <Upload userImage={user.image} onSletctedImage={handleImageChanged} />
            {user.name}
          </div> */}
          {/* <div class="navbar-item">
            <button class="button is-danger is-light is-small" onClick={logout} > Logout</button>
          </div> */}
        </div >
      )
    } else {
      return (<Login />)
    }
  }



  return (
    <div className="">
      <header class="navbar">
        {/* {loading ? (
          <p>
            LOADING.....
          </p>
        ) : (
          <HeaderContent />
        )} */}
        <HeaderContent />
      </header >
      <div>
        {user && <WeatherForestcast userData={user} />}
      </div>
    </div >
  )
}

export default App;
