import React from 'react'
import HomePage from './components/HomePage'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import WeatherForestcast from './components/WeatherForestcast';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/weather-foresetcast' element={<WeatherForestcast />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
