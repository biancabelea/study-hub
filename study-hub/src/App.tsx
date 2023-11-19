import React from 'react';
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddResource from "./components/AddResource";
import HomePage from "./components/HomePage";

import SearchMentors from "./components/SearchMentors";

import Logout from "./components/Logout";
import ViewResources from "./components/ViewResources";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/view-resources' element={<ViewResources/>}/>
                    <Route path='/resources' element={<AddResource/>}/>
                    <Route path='/mentors-search' element={<SearchMentors/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
