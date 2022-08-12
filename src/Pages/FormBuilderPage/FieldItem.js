import { Paper } from '@mui/material';
import React from 'react';

const FieldItem = (props) => {

    return (
        <Paper elevation={0} variant="outlined" sx={{
            margin: '1em',
            padding: '0.5em',
            width: '100%'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: "inline-flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}>
            {props.children}
          </div>
          
        </Paper>
    );
}

export default FieldItem;