import { Alert } from '@mui/material';
import React from 'react';

const AlertBox = (props) => {
    return (
        <Alert sx={{
            marginTop: "3em",
            marginX: "auto",
            width: "80%"
        }} severity={props.severity}>
            {props.text}
        </Alert>
    );
}

export default AlertBox;