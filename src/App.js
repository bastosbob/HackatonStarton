import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {AppBar, Toolbar, IconButton, Icon, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';



function App() {
  return (

    <div className="App">
      <header className="App-header">
          <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <AppBar position="sticky">
              <Toolbar variant="dense">
                  <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  </IconButton>
                  <Typography variant="h6" color="inherit" component="div">
                      Photos
                  </Typography>
              </Toolbar>
          </AppBar>
        <Button variant="contained" color="primary">Create a ticket</Button>
      </header>
    </div>
  );
}

export default App;
