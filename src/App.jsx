
//App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


//Website

import Navbar from './Components/Navbar';
import Home from './Screens/Home';
import Footer from "./Components/Footer";
import Career from "./Screens/Career";
import JobDetails from "./Screens/JobDetails"
import ContactPage from "./Screens/ContactPage";
import ServicesPage from "./Screens/ServicesPage";
import About from "./AboutUsPage/About";

//HR
import MainHR from "./HRPages/MainHR";
import JobApplication from "./JobApplication/JobApplication";




function App() {
  return (

    <div>

      <Router>
        <div className="App">

{/* website pages */}

           <Navbar/>
          <Routes>
            {/* <Route path="/apply" element={<JobApplication/>}/> */}
            <Route path="/home" element={<Home/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/career" element={<Career/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/services" element={<ServicesPage/>} />
            <Route path="/aboutus" element={<About/>} />
            <Route path="/career/:id" element={<JobDetails/>} />
            <Route path="/career/:id/apply" element={<JobApplication/>} />


          </Routes>
          <Footer/>

{/* HR Pages */}
          



        </div>
      </Router> 
    </div>

  );
}

export default App;
