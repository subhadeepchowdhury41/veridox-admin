import { Add } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useFormBuilderContext } from '../../Providers/FormBuilderProvider';
import PageItem from './PageItem/PageItem';
import SaveIcon from '@mui/icons-material/Save';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const FormBuilderPage = () => {

    const {state, dispatch} = useFormBuilderContext();
     
    return (
        <div>

            <div style={{
                margin: '1.6em',
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box sx={{width: '30%', display: 'inline'}}>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    <Button variant='contained'>
                        Import
                    </Button>
                </Box>
                <Box sx={{width: '30%'}}>
                    
                    <TextField id='formName' size='small' label="Form Name" sx={{margin: '0 0.3em'}} value={state.name} onChange={(event) => {
                        dispatch({type: 'changeFormName', payload: {name: event.target.value}});
                    }}/>
                </Box>
                

                <Box sx={{width: '16%'}}>
                    <Tooltip title="Save Form" arrow>
                    
                        <Button size='small' variant='contained'>
                            <SaveIcon/>
                            <Typography variant='overline' sx={{paddingLeft: '0.4em'}}>Save</Typography>
                        </Button>
                    </Tooltip>
                </Box>

                
                
                

            </div>

            

            <div style={{
                textAlign: "center"
            }}>
                {state.pages.map((page, index) => (<PageItem page={page} key={index}/>))}
                <div style={{
                    margin: '0.3em',
                display: 'inline-flex',
                
            }}>
                <Tooltip title="Add page">
                    <Paper onClick={() => dispatch({type: 'addPage'})} variant='outlined' sx={{
                    width: '16em',
                    height: '9em',
                    '&:hover': {
                            backgroundColor: 'whitesmoke'
                        }}}>
                        
                    <div style={{
                        
                        display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                        height: '100%'
                    }} >
                       <Add sx={{color: 'lightgrey'}}/>
                    </div>

                </Paper>
                </Tooltip>
                
            </div>
            </div>
        </div>
    );
}

export default FormBuilderPage;