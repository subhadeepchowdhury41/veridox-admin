import { Box, IconButton, Paper } from '@mui/material';
import React from 'react';
import {PersonAdd, ClearTwoTone} from '@mui/icons-material';
import './AddRequestItem.css';


const AddRequestItem = (props) => {
    return (
        <div key={props.index} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6em"
        }}>
           <Paper elevation={0} variant="outlined" sx={{
                cursor: 'pointer',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "96%",
                padding: "0.7em",
                '&:hover': {
                    backgroundColor: "whitesmoke"
                }
            }}>
              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                {props.id}
              </Box>

              <Box className="OverflowTextContainer" sx={{width: "10%"}}>
                {props.name}
              </Box>
              
              <Box className="OverflowTextContainer" sx={{width: "20%"}}>
                +91-{props.number ?? 8768715527}
              </Box>

              <Box sx={{width: '15%'}}>
               <IconButton sx={{color: 'red',
               border: '0.5px solid red', marginRight: '0.5em'
               }}>
                <ClearTwoTone/>
              </IconButton>
              <IconButton sx={{
                color: 'lightGreen',
                border: '0.5px solid lightGreen'
                }}>
                <PersonAdd/>
              </IconButton>
              </Box>
              
           </Paper>
           
        </div>
    );
}

export default AddRequestItem;