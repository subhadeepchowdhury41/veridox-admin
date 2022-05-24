import React from "react";
import { Button } from "@mui/material";

const SolidButton = (props) => {
    return (
        <div style={{
            display: props.display ?? 'block',
            margin: '20px'
        }}>
            <Button variant={props.variant ?? "contained"} size={props.size}
              onClick={props.onPress}
              sx={{
                  borderWidth: '2px',
                  '&:hover': {
                      backgroundColor: props.onHover ?? 'white',
                      borderWidth: '2px'
                  },
                  backgroundColor: props.background ?? 'green',
                  color: props.color ?? 'white'
                  }}
              id={props.id ?? ''}
            >{props.label}</Button>
        </div>
    );
}

export default SolidButton;