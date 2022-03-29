import React, { useState, ChangeEvent } from "react";
import { Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  addData,
  hideLoading,
  loading,
  showDetailReducer,
  showLoading,
} from "../Redux/SliceReducer";
import { CircularProgress } from "@mui/material";

const classes = {
  form: {
    marginLeft: "1.1rem",
    marginTop: "2rem",
  },
  Input: {
    width: "25rem",
    marginBottom: "1rem",
  },
  button :{
    marginTop:'1rem',
    marginLeft:'9rem'
  },
  loadStyle :{
    marginLeft:'50%',
    marginTop :'15rem'
  }

};
//
export const InputForm: React.FC = () => {
  const history = useNavigate();
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState<number>(0);
  const dispatch = useDispatch();
  const load: boolean = useSelector(loading);

  const handleChange = (e: any) => {
    setInput(e.target.value);
    setFlag(1);
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    getCountryData(input);
    setInput("");
  };

  const getCountryData = async (id: any) => {
    dispatch(showLoading());
    try {
      const response: any = await axios.get(
        `https://restcountries.com/v2/name/${input.toLowerCase().trim()}`
      );
      if (response.status === 200) {
        dispatch(addData(response.data));
        dispatch(showDetailReducer());
        dispatch(hideLoading());
        if (response.data.status !== 404) {
          history(
            "/CountryDetail",
          );
        } else {
          alert("Oops no country found!!!");
        }
      }
    } catch (err) {
      throw new Error("Cannot Fetch Country");
    }
  };

  return (
    <>
      
      {load ? (
        <CircularProgress
          size={68}
          style={classes.loadStyle}
        />
      ) : (
        <Box
          border={1}
          borderColor="grey.500"
          borderRadius={5}
          bgcolor="white.main"
          boxShadow={3}
          width={450}
          height={200}
          mx="auto"
          mt="2rem"
        >
          
          <form data-test="login-form" style={classes.form} onSubmit={submitHandler}>
            <TextField
              id="outlined-basic" 
              data-testid="name-data-input"
              value={input}
              label='CountryName'
              style={classes.Input}
              className="form-control"
              placeholder="Enter Country"
              onChange={handleChange}
            />
            <Button
              variant="contained" 
              data-testid="submit-button" 
              type="submit" 
              style={classes.button}
              disabled={flag < 1}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};

export default InputForm;
