//App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from './Components/Navbar';
import Home from './Screens/Home';
import Footer from "./Components/Footer";
import Career from "./Screens/Career";
import JobDetails from "./Screens/JobDetails";
import ContactPage from "./Screens/ContactPage";
import ServicesPage from "./Screens/ServicesPage";
import AboutUs from "./AboutUsPage/AboutUs";
import MainHR from "./HRPages/MainHR";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/:id" element={<JobDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
        <Footer /> */}
      </div>
      <MainHR />
    </Router>
  );
}

export default App;
