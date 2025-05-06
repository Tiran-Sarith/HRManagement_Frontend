import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
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
import HRLogin from "./Screens/HRLogin";

// Layout component that conditionally renders Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Check if the current path is HR-related
  const isHRPage = location.pathname.includes('/hrHome') || 
                   location.pathname.includes('/hrlogin');
  
  return (
    <>
      {!isHRPage && <Navbar />}
      {children}
      {!isHRPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/home" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/career" element={
              <Layout>
                <Career />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout>
                <ContactPage />
              </Layout>
            } />
            <Route path="/services" element={
              <Layout>
                <ServicesPage />
              </Layout>
            } />
            <Route path="/aboutus" element={
              <Layout>
                <About />
              </Layout>
            } />
            <Route path="/career/:id" element={
              <Layout>
                <JobDetails />
              </Layout>
            } />
            <Route path="/career/:id/apply" element={
              <Layout>
                <JobApplication />
              </Layout>
            } />
            <Route path="/apply" element={
              <Layout>
                <JobApplication />
              </Layout>
            } />
            
            {/* HR pages without navbar and footer */}
            <Route path="/hrlogin" element={<HRLogin />} />
            <Route path="/hrHome" element={<MainHR />} />
          </Routes>
        </div>
        <MainHR />
      </Router>

   
    </div>
  );
}

export default App;