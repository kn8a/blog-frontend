import { useEffect, useState } from "react";
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from "./pages/Main";
import Post from "./pages/Post";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/posts/:postId' exact element={<Post/>} />
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
