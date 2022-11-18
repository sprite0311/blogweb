import React, { useState } from "react";
import Home from "./containers/Home/Home";
import LandingPage from "./containers/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from "./containers/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Utilis/Navbar";
import { useEffect } from "react";
import PostDetails from "./containers/PostDetails/PostDetails";

const App = () => {
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('profile'))){
      setIsLogin(true)
    }
  }, [])
  
  const [isLogin, setIsLogin] = useState(false);
  const CLIENT_ID = "549408464034-5c1m9kam162p8m4l03fv5blng45vh8ge.apps.googleusercontent.com"

  return(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <BrowserRouter>
    <Navbar isLogin={isLogin}/>
      <Routes>
        {/* <Route exact path="/" element={isLogin ? 
            <Home isLogin={isLogin} />
           :
            <LandingPage isLogin={isLogin} />
          }
        /> */}
        <Route exact path= "/blogs/:id" element={<PostDetails/>}/>
        <Route exact path="/" element={isLogin ? <Navigate to="/blogs"/> : <LandingPage/>}/>
        <Route exact path="/blogs" element={<Home isLogin={isLogin}/>}/>
        <Route exact path="/auth" element={isLogin? <Navigate to="/blogs"/> :<Auth/>} setIsLogin={setIsLogin}/>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
};

export default App;
