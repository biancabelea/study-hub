import React from 'react';
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    {/*<Route path='/login' element={<Login/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
