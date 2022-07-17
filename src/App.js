import React from 'react'
import HomePage from './components/HomePage'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import WeatherForestcast from './components/WeatherForestcast';
import Admin from './components/Admin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/weather-foresetcast' element={<WeatherForestcast />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
