import { Add, Edit } from '@mui/icons-material';
import { IconButton, Paper, TextField } from '@mui/material';
import React from 'react';
import { useFormBuilderContext } from '../../Providers/FormBuilderProvider';
import PageItem from './PageItem/PageItem';

const FormBuilderPage = () => {

    const {state, dispatch} = useFormBuilderContext();
    
    return (
        <div>
            <div style={{
                margin: '1.6em',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextField id='formName' size='small' sx={{margin: '0 0.3em'}} value={state.name} onChange={(event) => {
                    dispatch({type: 'changeFormName', payload: {name: event.target.value}});
                }}/>

                <IconButton  onClick={() => {
                    let disabled = document.getElementById("formName").disabled;
                    document.getElementById("formName").disabled = !disabled;
                }}>
                    <Edit/>
                </IconButton>
            </div>
            

            <div style={{
                textAlign: "center"
            }}>
                {state.pages.map((page, index) => (<PageItem page={page} key={index}/>))}
                <div style={{
                    margin: '0.3em',
                display: 'inline-flex',
                
            }}>
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
            </div>
            </div>
        </div>
    );
}

export default FormBuilderPage;