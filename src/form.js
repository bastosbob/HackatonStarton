import ReactDOM from 'react-dom';
import {AppBar, Toolbar, IconButton, Icon, Typography, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './form.css';

function Form() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: '',
  });


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

            <TextField id="outlined-basic" label="Show date" variant="outlined" />

            <TextField id="outlined-basic" label="Price" variant="outlined" />

            <TextField id="outlined-basic" label="Single ticket number" variant="outlined" />

            <TextField id="outlined-basic" label="Date of sale" variant="outlined" />
          <Button type="submit">Submit</Button>
        </div>
      </form>

    </div>
  );

}
export default Form;

