import * as React from 'react';
import ReactDOM from 'react-dom';
import {AppBar, Toolbar, IconButton, Icon, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (

        <div className="App">
            <header className="App-header">
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <AppBar>
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Button variant="contained" color="primary" onClick={()=>navigate("/check")}>Show Spectacles</Button>
            </header>
        </div>
    );
}

export default Home;
