import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, TextField, Tooltip } from '@mui/material';
import React from 'react';
import { useFormBuilderContext } from '../../Providers/FormBuilderProvider';
import PageItem from './PageItem/PageItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDraftAssignmentContext } from '../../Providers/DraftAssignmentProvider';
import { useNavigate } from 'react-router-dom';

const FormBuilderPage = () => {

    const {setForm} = useDraftAssignmentContext();
    const navigate = useNavigate();

    const {state, dispatch, preview, setPreview,
        setMode, formId, mode} = useFormBuilderContext();
    
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
                    <Button variant='contained' size='small'>
                        Import
                    </Button>
                </Box>
                <Box sx={{width: '30%'}}>
                    
                    <TextField id='formName' size='small' label="Form Name" sx={{margin: '0 0.3em'}} value={state.name} onChange={(event) => {
                        dispatch({type: 'changeFormName', payload: {name: event.target.value}});
                    }}/>
                    <div>{formId ?? 'Empty'}</div>
                </Box>
                

                <Box sx={{width: '26%', display: 'inline-flex', }}>
                    <Tooltip title={preview ? 'Hide Preview' : 'Show Preview'}>
                        <IconButton onClick={() => {
                           setPreview(data => !data);
                        }}>
                           {preview ? <VisibilityOff/> : <Visibility/> }
                        </IconButton>
                    </Tooltip>

                    {mode === 'select' ? (
                        <Tooltip title='Choose Form'>
                        <Button size='small' variant='contained' sx={{
                            margin: '0.4em'
                        }} onClick={() => {
                            setForm({name: state.name, data: state.pages});
                            navigate('/dashboard/assignment/create');
                            setMode('view');
                        }}>
                            Assign
                        </Button>
                    </Tooltip>
                    ) : null}
                    {mode === 'create' ? (
                        <Tooltip title="Create Form" arrow>
                        <Button size='small' variant='contained' sx={{margin: '0.4em'}} onClick={async () => {
                            dispatch({type: 'saveForm'});
                        }}>
                            Save
                        </Button>
                    </Tooltip>
                    ) : null}
                    {mode === 'edit' ? (
                        <Tooltip title="Update Form" arrow>
                        <Button size='small' variant='contained' sx={{margin: '0.4em'}} onClick={async () => {
                            dispatch({type: 'saveForm'});
                        }}>
                            Update
                        </Button>
                    </Tooltip>
                    ) : null}
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