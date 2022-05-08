import * as React from 'react';
import ReactDOM from 'react-dom';
import {AppBar, Toolbar, IconButton, Icon, Typography, Paper} from "@mui/material";
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { useNavigate} from "react-router-dom";
import axios from "axios";
import './check.css';

const backend = axios.create({
        baseURL: "http://localhost:9090",
        headers: {
            accept: "application/json",
        }
    }
);


function MintAll(name) {
    //axios
    backend.post('http://localhost:9090/mint_all/' + name, {
    }
    ).then(function (response) {
        console.log(response);
    }
    ).catch(function (error) {
        console.log(error);
    }
    );
}

function addAddress(name) {
    let address = prompt("Enter the address to add");

 backend.post('http://localhost:9090/write_item/' + name,
    {
 "item" : {
    "address" : address
 }
}
 ).then(function (response) {
     console.log(response);

 }  ).catch(function (error) {
     console.log(error);
 }
 );
}

 function Check() {

     const [data, setData] = React.useState([]);

     React.useEffect(() => {
         backend.get("/get_collections").then(res => {
             setData(res.data);
             console.log('res =', res.data);
         }).catch(err => {
             console.log(err);
         } );
         return () => { };
     } , []);

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
                        <Button variant="contained" color="primary" onClick={()=>navigate("/collection")}>Create a spectacle</Button>
                    </Toolbar>
                </AppBar>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Paper elevation={3}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1>Spectacle</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            {data.map(collection => {
                                                return (
                                                    <div className="col-md-4">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5 className="card-title">{collection.name}</h5>
                                                                <p className="card-text">{collection.description}</p>
                                                                <Button variant="contained" color="primary" onClick={() => MintAll(collection.name)} >Send to all adresses</Button>
                                                                <Button variant="contained" color="primary" onClick={() => addAddress(collection.name)}>Add an adress</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Check;
