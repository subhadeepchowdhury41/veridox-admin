import { Clear, Dashboard } from '@mui/icons-material';
import { IconButton, Paper } from '@mui/material';
import { Box } from '@mui/system';
import SolidButton from '../../Elements/SolidButton/SolidButton';
import PopUpBox from '../../Elements/PopUpBox/PopUpBox';
import React from 'react'
import './HomePage.css'



const HomePage = () => {
    return (
        <PopUpBox>
          
            <Box sx={{
                display: 'block',
                width: '80%',
                minWidth: '300px',
                maxWidth: '480px',
                height: '450px',
                backgroundColor: 'red',
            
            }}>
                <div style={{
                  width: '100%',
                  justifyContent: 'center',
                  display: 'inline-block'
                }}>
                  <IconButton>
                    <Clear/>
                  </IconButton>
                </div>
            </Box>
        </PopUpBox>
    );
}

export default HomePage;