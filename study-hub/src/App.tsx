import React from 'react';
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ResourceLibrary from "./components/ResourceLibrary";
import HomePage from "./components/HomePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/resources' element={<ResourceLibrary/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
