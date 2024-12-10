import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";



import Navbar from './Components/Navbar';
import Home from './Screens/Home';
import Footer from "./Components/Footer";
import MainHR from "./HRPages/MainHR";
import HeroSlider from "./Components/Hero";
import AboutUs from "./AboutUsPage/AboutUs";


function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Navbar/>
          {/* <HeroSlider/> */}
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            
            
          </Routes>
          <Footer/>
        </div>
      </Router>
      {/* <MainHR/> */}
    </div>
  );
}

export default App;
