import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {AppBar, Toolbar, IconButton, Icon, Typography, Rout} from "@mui/material";
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Home";
import Form from "./form";
import Collection from "./collection";
import Check from "./check";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/form" element={<Form/>}/>
              <Route path="/collection" element={<Collection/>}/>
              <Route path="/check" element={<Check/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
