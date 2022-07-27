import { Add, ArrowBackIosNew, Delete } from '@mui/icons-material';
import { IconButton, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormBuilderContext } from '../../Providers/FormBuilderProvider';
import FieldItem from './FieldItem';
import { useWidgetTypeContext } from '../../Providers/WidgetTypeProvider';
import { Box } from '@mui/system';

const PageBuilder = (props) => {
    const {id} = useParams();
    const {state, dispatch} = useFormBuilderContext();
    const {widgets} = useWidgetTypeContext();
    const navigate = useNavigate();


    return (
        <div>
            <div style={{width: '100%', textAlign: 'center'}}>
                Page {parseInt(id) + 1}
            </div>

            <div style={{margin: '1em 0.5em'}}>
                <IconButton  onClick={() => {
                    navigate('/dashboard/formBuilderPage');
                }}>
                    <ArrowBackIosNew size='small'/>
                </IconButton>
            </div>
            
            {state.pages[id].fields.map((field, index) => {
                return (
                    <FieldItem >
                        {index + 1}
                        <Box sx={{width: '10%'}}>
                            <TextField size='small' label="Label" value={state.pages[id].fields[index].label} onChange={(event) => {
                              console.log(event.target.value);
                              dispatch({type: "changeLabel", payload: {page_id: id, field_id: index, label: event.target.value}});
                            }}/>
                        </Box>
                        
                        <Box sx={{width: '30%'}}>
                          <Select size='small' label="Widget" value={state.pages[id].fields[index].widget ?? "select widget type"}
                            onChange={(event) => {
                              dispatch({type: 'changeWidget', payload: {page_id: id, field_id: index, widget: event.target.value}})
                            }}>
                            {widgets.map((widget, index) => (
                              <MenuItem key={index} value={widget.name}>
                                  {widget.name}
                              </MenuItem>
                           ))}
                          </Select>
                        </Box>
                        
                        <IconButton onClick={() => {
                            dispatch({type: "deleteField", payload: {page_id: id, field_id: index}});
                        }}>
                            <Delete/>
                        </IconButton>
                    </FieldItem>);
                    })}
            <IconButton sx={{
                margin: '0 0.5em',
                border: '0.3px solid gray'
            }} onClick={() => {
                dispatch({type: 'addField', payload: {page_id: id}});
            }}>
                <Add/>
            </IconButton>
        </div> 
    );
}

export default PageBuilder;