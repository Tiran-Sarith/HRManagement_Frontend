//App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebsiteLayout from './WebsiteLayout';
import AdminLayout from './AdminLayout';

//Website

import Home from './Screens/Home';
import Career from "./Screens/Career";
import JobDetails from "./Screens/JobDetails"
import ContactPage from "./Screens/ContactPage";
import ServicesPage from "./Screens/ServicesPage";
import About from "./Screens/AboutUsPage/About";
import JobApplication from "./JobApplication/JobApplication";
import HRLogin from "./Screens/HRLogin";

function App() {
  return (
<BrowserRouter>
      <Routes>
        
        {/* Website Layout */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="aboutus" element={<About />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="career" element={<Career />} />
          <Route path="career/:id" element={<JobDetails />} />
          <Route path="career/:id/apply" element={<JobApplication />} />
          <Route path="hrlogin" element={<HRLogin/>} /> 
        </Route>

        {/* Admin Layout */}
        <Route path="/*" element={<AdminLayout />} />
        

      </Routes>
    </BrowserRouter>

  );
}

export default App;
