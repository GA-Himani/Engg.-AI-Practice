import {
  Button,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchData,
  isAnswered,
  addAnswer,
  addMultiOption,
  fifthAnswer,
} from "../Redux/Reducer"
import ResultModal from './ResultModal';
import React from "react";

const Question = () => {
  const navigate = useNavigate();
  const data = useSelector(fetchData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const handleListItemClick = (event: any, index: number, val: any) => {
    dispatch(isAnswered(val.id));
    dispatch(addAnswer({ id: val.id, value: event.target.value }));
  };

  const multiSelectHandler = (event: any, index: number, val: any) => {
    dispatch(isAnswered(val.id));
    const newArray = [...data[4].answerValue];
    if (event.target.checked && !newArray.includes(event.target.value)) {
      newArray.push(event.target.value);
      dispatch(addMultiOption(newArray));
      console.log(newArray);
    } else {
      const afterRemoveArray = newArray.filter(
        (val) => val !== event.target.value
      );
      dispatch(addMultiOption(afterRemoveArray));
      if (afterRemoveArray.length === 0) {
        dispatch(fifthAnswer(val.id));
      }
    }
  };

  const pageHandler = (val: any, index: number) => {
    setSelectedIndex(index);
    navigate(`/Question/${index + 1}`);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => prev + 1);
    navigate(`/Question/${data[selectedIndex].questionNo + 1}`);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => prev - 1);
    navigate(`/Question/${data[selectedIndex].questionNo - 1}`);
  };


  const [result, setResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [correct, setCorrect] = useState(0);


  const ansArray: any = [];
  const finalSubmit = () => {
    setShowModal(true);
    data.slice(0, 4).forEach((val: any) => {
      if (val.answerValue === val.correctAnswer) {
        setCorrect((prev) => prev + 1);
      }
    });
    data[4].answerValue.map((elem: any) => {
      if (data[4].correctAnswer.includes(elem)) {
        ansArray.push(true);
      } else {
        ansArray.push(false);
      }
    });
    if (ansArray.length) {
      if (ansArray.every((val: Boolean) => val === true)) {
        if (data[4].correctAnswer.length === ansArray.length) {
          setResult(true);
        } else {
          setResult(false);
        }
      }
    }
  };

  return (
    <Container>
      {showModal && (
        <ResultModal
          correct={result ? correct + 1 : correct}
          open={showModal}
          setShowModal={setShowModal}
          setCorrect={setCorrect}
        />
      )}

      {data.map((val: any, index: number) => {
        return (
          <Button
            style={{
              margin: "0.8rem",
              backgroundColor: val.isAnswer ? "red" : "grey",
            }}
            variant="contained"
            onClick={() => pageHandler(val, index)}
            key={index}
          >
            {val.questionNo}
          </Button>
        );
      })}
      <div>
        <h3 data-testid="count">
          Question No.{data.length && data[selectedIndex].questionNo}
        </h3>
        <h2>{data.length && data[selectedIndex].question}</h2>
        {data[selectedIndex].questionNo === 4 &&
          data[3].columnOne.map((val: any, index: number) => {
            return (
              <h3 style={{ wordSpacing: "80px" }} key={index}>
                {val}
              </h3>
            );
          })}
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <FormControl component="fieldset">
            <RadioGroup aria-label="answers" name="radio-buttons-group">
              {data[selectedIndex].questionNo < 5 &&
                data[selectedIndex].answers.map((val: any, index: number) => {
                  return (
                    <FormControlLabel
                      onChange={(event) =>
                        handleListItemClick(event, index, data[selectedIndex])
                      }
                      value={val}
                      control={
                        <Radio
                          checked={
                            data[selectedIndex].answerValue === val
                              ? true
                              : false
                          }
                        />
                      }
                      label={val}
                      key={index}
                    />
                  );
                })}
              {data[selectedIndex].questionNo === 5 &&
                data[4].answers.map((val: any, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={val}
                      onChange={(event) =>
                        multiSelectHandler(event, index, data[selectedIndex])
                      }
                      control={
                        <Checkbox
                          checked={
                            data[4].answerValue.includes(val) ? true : false
                          }
                        />
                      }
                      label={val}
                      style={{ margin: "0.8rem" }}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: 185, margin: "2rem" }}
          disabled={selectedIndex === 0}
          onClick={() => handlePrev()}
        >
          Previous
        </Button>
        {selectedIndex < 4 ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={finalSubmit}
          >
            Submit
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Question;
