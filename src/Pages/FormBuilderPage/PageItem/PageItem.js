import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Paper, Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormBuilderContext } from '../../../Providers/FormBuilderProvider';

const FormItem = (props) => {

    const navigate = useNavigate();

    const {dispatch} = useFormBuilderContext();

    console.log(props.page);
    return (
    <div style={{
        margin: '0.3em',
        display: 'inline-flex',
        }}>

        <Paper variant='outlined' sx={{
            'display': 'flex',
            alignItems: 'center',
            '&:hover': {
                backgroundColor: "whitesmoke"
            },
            justifyContent: 'center',
            width: '16em',
            height: '9em'
        }}>
            <div style={{display: 'block'}}>
              Page {parseInt(props.page.id) + 1}
            </div>
            <div>
                <Tooltip title="Delete Page" arrow>
                    <IconButton onClick={() => (dispatch({type: 'deletePage', payload: {page_id: props.page.id}}))}>
                        <Delete/>
                    </IconButton>
                </Tooltip>
                
                <Tooltip title='Edit Page' arrow>
                    <IconButton onClick={() => {
                      navigate('/dashboard/pageBuilder/' + props.page.id);
                    }}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
                
            </div>
        </Paper>
    </div>);
}

export default FormItem;