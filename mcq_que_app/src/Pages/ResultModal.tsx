import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PieChart } from "react-minimal-pie-chart";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
//
const ResultModal = (props:any) => {
  const { correct,open,setShowModal,setCorrect } = props;
  const correctPercentage = (correct / 5) * 100;
  const incorrectPercentage = 100 - correctPercentage;
  
  const handleClose = () => {
    setCorrect(0)
    setShowModal(false)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <h1 style={{textAlign:'center'}}>Result</h1>
           <PieChart
           animate={true}
           data={[
             {
              title: "Correct",
              value: correctPercentage,
              color: "#38bb38",
            },
            {
              title: "Incorrect",
              value: incorrectPercentage,
              color: "#e24646",
            },
          ]}
        />
        <h3 style={{color:'green'}}>Correct Answer :{correct}</h3>
        <h3 style={{color:'red'}}>InCorrect Answer : {5-correct}</h3>
        <h3 style={{color:'green'}}>Correct Answer Percentage : {correctPercentage}%</h3>
        <h3 style={{color:'red'}}>InCorrect Answer Percentage : {incorrectPercentage}%</h3>
        </Box>
      </Modal>
    </div>
  );
}

export default ResultModal;