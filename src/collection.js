import ReactDOM from 'react-dom';
import {AppBar, Toolbar, IconButton, Icon, Typography, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './form.css';

function Collection() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
            name: '',
        }
    );
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/');
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button onClick={() => navigate('/')}>Home</Button>
                    <Typography variant="h6" color="inherit">
                        Form
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit} id="form_react">
                <div>
                    <TextField id="outlined-basic" label="Name of the event" variant="outlined" />
                </div>
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}
export default Collection;

