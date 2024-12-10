
//App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";



import Navbar from './Components/Navbar';
import Home from './Screens/Home';
import Footer from "./Components/Footer";

import Career from "./Screens/Career";
import JobDetails from "./Screens/JobDetails"
import ContactPage from "./Screens/ContactPage";
import ServicesPage from "./Screens/ServicesPage";

import MainHR from "./HRPages/MainHR";
import HeroSlider from "./Components/Hero";

import About from "./AboutUsPage/About";

import ServicesPageHR from "./HRPages/ServicesPage";


// import JobPosting from "./Screens/JobPost"
// import MainHR from "./HRPages/MainHR";

function App() {
  return (
    <div>

      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/aboutus" element={<About/>} />
            
            <Route path="/" element={<Home/>} />
            <Route path="/career" element={<Career/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/services" element={<ServicesPage/>} />
            <Route path="/career/:id" element={<JobDetails/>} />

           
            
          </Routes>

    {/* <Navbar/> */}

{/* <ServicesPage/> */}
      
      {/* <MainHR/> */}

          <Footer/>
        </div>
      </Router> 
      {/*<MainHR/>*/}
      

    </div>
  );
}

export default App;
