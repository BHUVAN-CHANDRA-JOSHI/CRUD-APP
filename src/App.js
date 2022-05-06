import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword'
import Allusers from "./components/Allusers"
import EditUser from './components/EditUser';
import Login from './components/Login'
import Signup from './components/Signup'




function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<SignInOutContainer />} /> */}
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />

          <Route exact path="/allusers" element={<Allusers />} />

          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Login />} />




        </Routes>

      </Router>


    </div>

  );
}

export default App;
