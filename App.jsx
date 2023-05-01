import React, {useState} from "react";
import "./App.css";
import {Routes, Route} from "react-router-dom";
import debug from "sabio-debug";
import Home from "./components/user/Home";
import TestAndAjax from "./components/user/TestAndAjax";
import Friends from "./components/friends/Friends";
import Jobs from "./components/jobs/Jobs";
import Companies from "./components/techcompanies/Companies";
import Events from "./components/events/Events";
import Login from "./components/user/LogIn";
import Register from "./components/user/Register";
import Footer from "./components/user/Footer";
import Nav from "./components/user/SiteNav";
import PoliticalCandidates from "./components/codeChallenge/PoliticalCandidates";
import New from "./components/friends/New";
import Cars from "./components/codeChallenge/Cars";



function App() {

  const _logger = debug.extend("App");
  _logger("Hello World");

  const [state] = useState({
    firstName: "Unknown",
    lastName: "User",
    isLoggedIn: false,
  }
)

  return (
    <React.Fragment>
     
    <Nav user={state}></Nav>

   
     
      <div className="container">
        <Routes>
          <Route path="/Home" element={<Home user={state}></Home>}></Route>
          <Route path="/TestAndAjaxCall" element={<TestAndAjax/>}></Route>
          <Route path="/Friends" element={<Friends/>}></Route>
          <Route path="/Jobs" element={<Jobs/>}></Route>
          <Route path="/Techcompanies" element={<Companies/>}></Route>
          <Route path="/Events" element={<Events/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/politicalcandidates" element={<PoliticalCandidates/>}></Route>      
          <Route path="/Friends/New" element={<New/>}></Route> 
          <Route path="/Friends/:aPersonid" element={<New/>}></Route> 
          <Route path="/cars" element={<Cars/>}></Route> 
        </Routes>
      </div>

      <Footer/>
    </React.Fragment>
  );
}

export default App;
