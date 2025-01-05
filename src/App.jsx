
//App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


//Website
// import Navbar from './Components/Navbar';
// import Home from './Screens/Home';
// import Footer from "./Components/Footer";
// import Career from "./Screens/Career";
// import JobDetails from "./Screens/JobDetails"
// import ContactPage from "./Screens/ContactPage";
// import ServicesPage from "./Screens/ServicesPage";
// import AboutUs from "./AboutUsPage/AboutUs";


//HR
import MainHR from "./HRPages/MainHR";
import About from "./AboutUsPage/About";
import JobApplication from "./JobApplication/jobApplication";

function App() {
  return (
    <Router>
      <div className="App">
         <Navbar />
        <Routes>
          <Route path="/apply" element={<JobApplication/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<About/>} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/:id" element={<JobDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
        <Footer /> 
      </div>
      {/* <MainHR /> */}
    </Router>


function App() {
  return (
    <div>

      <Router>
        <div className="App">

{/* website pages */}
          {/* <Navbar/>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            
            <Route path="/" element={<Home/>} />
            <Route path="/career" element={<Career/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/services" element={<ServicesPage/>} />
            <Route path="/career/:id" element={<JobDetails/>} />
          </Routes>

          <Footer/> */}

{/* HR Pages */}
          <MainHR />

        </div>
      </Router> 
    </div>
  );
}

export default App;