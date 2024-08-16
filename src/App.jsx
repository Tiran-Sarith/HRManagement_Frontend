import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";



import Navbar from './Components/Navbar';
import Home from './Screens/Home';
import Footer from "./Components/Footer";
import MainHR from "./HRPages/MainHR";


function App() {
  return (
    <div>
      {/* <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/home" element={<Home/>} />
          </Routes>
          <Footer/>
        </div>
      </Router> */}
      <MainHR/>
    </div>
  );
}

export default App;
