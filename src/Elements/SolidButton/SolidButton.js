import React from "react";
import { Button } from "@mui/material";

const SolidButton = (props) => {
    return (
        <div style={{
            margin: '40px'
        }}>
            <Button variant="contained" size={props.size}
              onClick={props.onPress}
              id={props.id ?? ''}
            >{props.label}</Button>
        </div>
    );
}

export default SolidButton;