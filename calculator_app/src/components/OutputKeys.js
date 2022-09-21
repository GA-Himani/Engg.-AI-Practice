import { Container, Grid } from '@material-ui/core';
import React, {useState, useEffect, useRef} from 'react';
import '../App.css';
import Backspace from '@material-ui/icons/Backspace';
//import Clear from '@material-ui/icons/Clear';
//import Add from '@material-ui/icons/Add';
//import Remove from '@material-ui/icons/Remove';
import DragHandle from '@material-ui/icons/DragHandle';

const InputKeys = () => {
    const [preState, setPreState] = useState("");
    const [curState, setCurState] = useState("");
    const [result, setResult] = useState("");
    const inputRef = useRef(null);

    useEffect(()=> inputRef.current.focus());

    const handleClick = (e) => {
        setResult(result.concat(e.target.name));
    }

    const backspace = () => {
        setResult(result.slice(0, result.length -1));
    };

    const reset =() =>{
        setResult("");
    }

    const calculate = (e) => {
        try{
            if(result.includes("%")){
                percent();
            }
            else if(result.includes("^")){
                power();
            }
            else{
            setResult(eval(result).toString());
            }
        }
        catch(error){
            setResult("Error");
        }
    }

    const percent = () => {
        setResult(String(parseFloat(result)/100));
    };
    const power = () => {
        
        setResult(String(Math.pow(parseFloat(preState), parseFloat(curState))));
        
    }

    return (
        <Container maxWidth="sm">
            <Grid className="output-container display" >
                
                <input type='text' className="display" value={result} ref={inputRef} />
                
            </Grid><br/>
            <Grid  className="input-container display">
                <button className='btn btncolor' id="clear" onClick={reset}>AC</button>
                <button className='btn btnborder' id="backspace" onClick={backspace}><Backspace /></button>
                <button className='btn btncolor' name="%" onClick={handleClick}>%</button>
                <button className='btn btncolor' name="^" onClick={handleClick}>^</button>
                <button className='btn' name="7" onClick={handleClick}>7</button>
                <button className='btn' name="8" onClick={handleClick}>8</button>
                <button className='btn' name="9" onClick={handleClick}>9</button>
                <button className='btn btncolor' name="/" onClick={handleClick}>/</button>
                <button className='btn' name="4" onClick={handleClick}>4</button>
                <button className='btn' name="5" onClick={handleClick}>5</button>
                <button className='btn' name="6" onClick={handleClick}>6</button>
                <button className='btn btncolor' name="*" onClick={handleClick}>X</button>
                <button className='btn' name="1" onClick={handleClick}>1</button>
                <button className='btn' name="2" onClick={handleClick}>2</button>
                <button className='btn' name="3" onClick={handleClick}>3</button>
                <button className='btn btncolor btnborder' name="-" onClick={handleClick}>-</button>
                <button className='btn' name="0" onClick={handleClick}>0</button>
                <button className='btn' name="." onClick={handleClick}>.</button>
                <button className='btn btncolorequal' id="result" onClick={calculate}><DragHandle /></button>
                <button className='btn btncolor' name="+" onClick={handleClick}>+</button>
                
            </Grid>
        </Container>
    )
}

export default InputKeys;
