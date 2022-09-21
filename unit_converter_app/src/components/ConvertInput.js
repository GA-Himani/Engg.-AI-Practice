import React from 'react';
import { Container, Grid } from '@material-ui/core';


function ConvertInput({records,setRecords}) {
    
    return (
        <Container>
            <Grid>
                {records.map(record => {
                    return (
                        <p>{record.amount}  {record.base} is equevalent to {record.result} {record.convertTo} </p>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default ConvertInput;
