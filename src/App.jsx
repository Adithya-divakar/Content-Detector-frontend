import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Post from "./Components/Post/Post";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { errorStatusBar, successStatusBar } from "./Components/StatusBars/StatusBars";

function App() {
  const { isAuth } = useSelector((state) => state.authentication);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {

    function onlineHandler() {
      setIsOnline(true);
  }

  function offlineHandler() {
      setIsOnline(false);
  }

    
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);
  
    return () => {
      window.removeEventListener("online", onlineHandler);
      		window.removeEventListener("offline", offlineHandler)
    }
  }, [])
  
  return (
    <>
     <>
      		{isOnline ? 
        		
            ''
      		 : 
           errorStatusBar('You are offline. Please check your internet connection.')
      		}
    	</>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {isAuth ? (
            <Route path="/login" element={<Navigate to="/post" />} />
          ) : (
            <Route
              path="/login"
              element={
                <div className="container">
                  <Login />
                </div>
              }
            />
          )}
          {/* {isAuth? : <Route path="/login" element={<Login/>} />} */}
         {isAuth ?
           <Route path="/signup" element={<Navigate to="/post" />} />
         : <Route
            path="/signup"
            element={
              <div className="container">
                <Signup />
              </div>
            }
          />}

          {/* <ProtectedRoute
            path="/post"
            element={<Post />}
            isAuthenticated={isAuthenticated}
          /> */}

          {isAuth ? (
            <Route path="/post" element={<Post />} />
          ) : (
            <Route path="/post" element={<Navigate to="/login" />} />
          )}
          <Route path="/" element={<Navigate to="/login" />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
