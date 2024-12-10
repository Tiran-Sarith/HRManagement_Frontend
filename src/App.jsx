import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";



import Navbar from './Components/Navbar';
import Home from './Screens/Home';
import Footer from "./Components/Footer";
import MainHR from "./HRPages/MainHR";
import HeroSlider from "./Components/Hero";
import ServicesPage from "./HRPages/ServicesPage";


function App() {
  return (
    <div>
    <Navbar/>

<ServicesPage/>
      
      {/* <MainHR/> */}
          <Footer/>
        </div>
      </Router> */}
      <MainHR/>
      

    </div>
  );
}

export default App;
