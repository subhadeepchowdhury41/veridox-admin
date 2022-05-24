import { TextField } from '@mui/material';
import React from 'react';

const CustomTextField = (props) => {
    return (
        <div style={{
            paddingTop: "30px",
            paddingBottom: "0px"
        }}>
            <TextField
              ref={props.ref}
              value={props.value}
              onChange={props.onChange}
              size={props.size ?? 'medium'}
              sx={{
                borderWidth: "9px",
                width: '80%',
              }}
              required={props.required}
              id={props.id}
              name={props.key}
              variant={props.variant ?? "outlined"}
              type={props.type}
              label={props.label}
              helperText={props.helperText}
            ></TextField>
        </div>
    );
}

export default CustomTextField;
