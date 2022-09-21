import React, { useState } from 'react';
import { Container, Grid, Select } from '@material-ui/core';
import ConvertInput from './ConvertInput';


function CreateInput() {
    const [entryForm, setEntryForm] = useState({
        units:[ "mm (MiliMeter)", "cm (CentiMeter)", "m (Meter)", "km (KiloMeter)"],
        base:"mm (MiliMeter)",
        amount:"",
        convertTo:"mm (MiliMeter)",
        result:""
    
    });
    const [records, setRecords] = useState([]);

    const handleSelect = (e) => {
        setEntryForm({
           ...entryForm, [e.target.name] : e.target.value
        });
    }

    const handleInput = (e) => {
        setEntryForm({
            ...entryForm, amount: e.target.value
        });
    }

    const calculate = () => {
        const newEntry = {...entryForm}
        //console.log(newEntry);
        if(newEntry.amount === isNaN){
            return
        }
        
        if (newEntry.base === "mm (MiliMeter)"){
            switch (newEntry.convertTo) {
                case "mm (MiliMeter)":
                    newEntry.result= String(newEntry.amount);
                    break;
                case "cm (CentiMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) / 10);
                    break;
                case "m (Meter)":
                    newEntry.result= String(parseFloat(newEntry.amount) / 1000);
                    break;
                case "km (KiloMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) / 1000000);
                    break;
                default:
                    return;
            }
        }
        if (newEntry.base === "cm (CentiMeter)"){
            switch (newEntry.convertTo) {
                case "mm (MiliMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) * 10);
                    break;
                case "cm (CentiMeter)":
                    newEntry.result= String(newEntry.amount);
                    break;
                case "m (Meter)":
                    newEntry.result= String(parseFloat(newEntry.amount) / 100);
                    break;
                case "km (KiloMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) / 100000);
                    break;
                
                default:
                    return;
            }
        }
        if (newEntry.base === "m (Meter)"){
            switch (newEntry.convertTo) {
                case "mm (MiliMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) * 1000);
                    break;
                case "cm (CentiMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) * 100);
                    break;
                case "m (Meter)":
                    newEntry.result= String(newEntry.amount);
                    break;
                case "km (KiloMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) / 1000);
                    break;
                default:
                    return;
            }
        }
        if (newEntry.base === "km (KiloMeter)"){
            switch (newEntry.convertTo) {
                case "mm (MiliMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) * 1000000);
                    break;
                case "cm (CentiMeter)":
                    newEntry.result= String(parseFloat(newEntry.amount) * 100000);
                    break;
                case "m (Meter)":
                    newEntry.result= String(parseFloat(newEntry.amount) * 1000);
                    break;
                case "km (KiloMeter)":
                    newEntry.result= String(newEntry.amount);
                    break;
                default:
                    return;
            }
        }
        console.log(newEntry);
        console.log(newEntry.result);
        setRecords([...records, newEntry]);
    }

    return (
        
        <Container maxWidth="sm" className="displaybox">
            <Grid>
                <input type='text' value={entryForm.amount}
                    className="displaybox" 
                    placeholder='Enter the Amount'
                    onChange={handleInput}
                />    
            </Grid>
            <Grid className="">
                <Select native 
                    name="base"
                    value={entryForm.base}
                    className="displaybox select"
                    onChange={handleSelect}>
                    {entryForm.units.map(unit => {
                        return(
                        <option key={unit} value={unit}>
                            {unit}
                        </option>) }
                    )}
                </Select>
                <Select native
                    name="convertTo"
                    value={entryForm.convertTo}
                    className="displaybox select"
                    onChange={handleSelect}>
                    {entryForm.units.map(unit => {
                        return(
                        <option key={unit} value={unit}>
                            {unit}
                        </option>) }
                    )}
                </Select>
                <button onClick={calculate}> Convert </button>
            </Grid>
            <Grid>
                
            </Grid>
            <ConvertInput 
                records={records} 
                setRecords={setRecords}
            />
        </Container>
    )
}

export default CreateInput;
