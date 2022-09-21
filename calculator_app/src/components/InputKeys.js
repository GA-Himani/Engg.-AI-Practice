import { Container, Grid } from '@material-ui/core';
import React, {useState, useEffect, useRef} from 'react';
import '../App.css';
import NumberFormat from 'react-number-format';
import Backspace from '@material-ui/icons/Backspace';
//import Clear from '@material-ui/icons/Clear';
//import Add from '@material-ui/icons/Add';
//import Remove from '@material-ui/icons/Remove';
//import DragHandle from '@material-ui/icons/DragHandle';

const InputKeys = () => {
    const [preState, setPreState] = useState("");
    const [curState, setCurState] = useState("");
    const [input, setInput] = useState("0");
    const [operator, setOperator] = useState(null);
    const [total, setTotal] = useState(false);
    const [result, setResult] = useState("");
    const inputRef = useRef(null);

    useEffect(()=> inputRef.current.focus());

    const inputNum = (e) => {
        if(curState.includes(".") && e.target.innerText === ".")return;
        if(total){
            setPreState("");
        }
        setResult(result.concat(e.target.name));
        curState ? setCurState((pre) => pre + e.target.innerText) : setCurState(e.target.innerText)
        setTotal(false);
        
    };

    useEffect(()=> {
        setInput(curState)
    },[curState]);

    useEffect(()=> {
        setInput("0")
    }, []);

    const operatorType = (e) => {
        setTotal(false);
        setResult(result.concat(e.target.name));
        setOperator(e.target.innerText)
        if(curState === "")return;
        if(preState !== ""){
            equals();
        }
        else{
            setPreState(curState)
            setCurState("")
        }
    };

    const equals = (e) => {
        if(e?.target.innerText === "="){
            setTotal(true);
        }

        let cal;
        switch (operator) {
            case "/":
                cal = String(parseFloat(preState) / parseFloat(curState));
                
                break;
            case "X":
                cal = String(parseFloat(preState) * parseFloat(curState));
                
                break;
            case "+":
                cal = String(parseFloat(preState) + parseFloat(curState));
                
                break;
            case "-":
                cal = String(parseFloat(preState) - parseFloat(curState));
                
                break;
            case "^":
                cal = String(Math.pow(parseFloat(preState), parseFloat(curState)));
                
                break;
            
            default:
                return;
            
        }
        setInput("");
        setPreState(cal);
        setCurState("");
        console.log(cal);
    };
    
    const percent = (e) => {
        setResult(result.concat(e.target.name));
        preState 
            ? setCurState(String((parseFloat(curState) / 100) * preState))
            : setCurState(String(parseFloat(curState) / 100));
    };

    const reset = () => {
        setPreState("");
        setCurState("");
        setInput("0");
        setResult("");
    };

    const backspace = () => {
        setCurState(curState.slice(0, curState.length -1));
        setResult(result.slice(0, result.length -1));
    };

    return (
        <Container maxWidth="sm">
        
                <Grid className="output-container display">
                    <input type="text"  value={result} ref={inputRef}/>
                    {input !== "" || input === "0" ? (
                        <NumberFormat
                            value={input}
                            displayType={"text"}
                            thousandSeparator={true}
                        />
                    ) : (
                        <NumberFormat
                            value={preState}
                            displayType={"text"}
                            thousandSeparator={true}
                        />
                    )}
                </Grid>
            
                <Grid className="input-container display">
                    <button className='btn btncolor' id="clear" onClick={(e)=>{reset(e)}}>AC</button>
                    <button className='btn btnborder' id="backspace" onClick={(e)=>{backspace(e)}}><Backspace /></button>
                    <button className='btn btncolor' name="%" onClick={(e)=>{percent(e)} }>%</button>
                    <button className='btn btncolor' name="^" onClick={(e)=>{operatorType(e)}}>^</button>
                    <button className='btn' name="7" onClick={(e)=>{inputNum(e)}}>7</button>
                    <button className='btn' name="8" onClick={(e)=>{inputNum(e)}}>8</button>
                    <button className='btn' name="9" onClick={(e)=>{inputNum(e)}}>9</button>
                    <button className='btn btncolor' name="/" onClick={(e)=>{operatorType(e)}}>/</button>
                    <button className='btn' name="4" onClick={(e)=>{inputNum(e)}}>4</button>
                    <button className='btn' name="5" onClick={(e)=>{inputNum(e)}}>5</button>
                    <button className='btn' name="6" onClick={(e)=>{inputNum(e)}}>6</button>
                    <button className='btn btncolor' name="X" onClick={(e)=>{operatorType(e)}}>X</button>
                    <button className='btn' name="1" onClick={(e)=>{inputNum(e)}}>1</button>
                    <button className='btn' name="2" onClick={(e)=>{inputNum(e)}}>2</button>
                    <button className='btn' name="3" onClick={(e)=>{inputNum(e)}}>3</button>
                    <button className='btn btncolor btnborder' name="-" onClick={(e)=>{operatorType(e)}}>-</button>
                    <button className='btn' name="0" onClick={(e)=>{inputNum(e)}}>0</button>
                    <button className='btn' name="." onClick={(e)=>{inputNum(e)}}>.</button>
                    <button className='btn btncolorequal' id="result" onClick={(e)=>{equals(e)}}>=</button>
                    <button className='btn btncolor' name="+" onClick={(e)=>{operatorType(e)}}>+</button>
                </Grid>
        </Container>
    )
}

export default InputKeys;
