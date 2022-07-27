import { Paper } from '@mui/material';
import React from 'react';

const FieldItem = ({children}) => {

    return (
        <Paper elevation={0} variant="outlined" sx={{
            margin: '1em',
            height: '60px',
            width: '100%'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: "inline-flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}>
            {children}
          </div>
          
        </Paper>
    );
}

export default FieldItem;