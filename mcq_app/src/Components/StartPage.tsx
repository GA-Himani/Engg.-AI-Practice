import React from "react";
import { Box, Input, InputLabel, MenuItem, Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import McqData from "../Data/McqData";
import { useDispatch } from "react-redux";
import { addData } from "../Redux/Reducer";
const classes = {
  form: {
    marginLeft: "1.1rem",
    marginTop: "2rem",
  },
  Input: {
    width: "25rem",
    marginBottom: "1rem",
  },
  button: {
    marginTop: "1rem",
    marginLeft: "9rem",
  },
  h1Style: {
    marginLeft: "45rem",
  },
};


const StartPage: React.FC = () => {
  const [lang, setLang] = React.useState("");
  const navigate = useNavigate();
 const dispatch = useDispatch()

const langChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    McqData.forEach((val:any) =>{
      if(val.lang === lang) {
        dispatch(addData(val.questions))
        navigate('/Question/1')
      }
    })
  };

  return (
    <>
      <Box
        border={1}
        borderColor="grey.500"
        bgcolor="white.main"
        boxShadow={3}
        width={450}
        height={350}
        mx="auto"
        mt="2rem"
      >
        <form style={classes.form} data-test='login-form' onSubmit={submitHandler}>
          <Input
            style={classes.Input}
            type="text"
            required
            className="form-control"
            placeholder="Name"
            name="username"
          />
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            style={classes.Input}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            required
          >
            <MenuItem value={10}>Male</MenuItem>
            <MenuItem value={20}>Female</MenuItem>
            <MenuItem value={30}>Other</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            style={classes.Input}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label="language"
            onChange={langChange}
            required
          >
            <MenuItem value="english">English</MenuItem>
            {/*<MenuItem value="hindi">Hindi</MenuItem>*/}
          </Select>
          <Button
          data-testid = "button"
            style={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Start MCQ
          </Button>
        </form>
      </Box>
    </>
  );
};

export default StartPage;