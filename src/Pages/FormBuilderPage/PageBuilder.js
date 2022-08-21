import { Add, ArrowBackIosNew, Clear, Delete } from '@mui/icons-material';
import { Button, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormBuilderContext } from '../../Providers/FormBuilderProvider';
import FieldItem from './FieldItem';
import { useWidgetTypeContext } from '../../Providers/WidgetTypeProvider';
import { Box } from '@mui/system';
import RequiredCheckBox from './RequiredCheckBox';
import WordCounter from './WordCounter';
import MultiLined from './MultiLined';
import TableMaker from './TableMaker';


const PageBuilder = (props) => {
    const {id} = useParams();
    const {state, dispatch} = useFormBuilderContext();
    const {widgets} = useWidgetTypeContext();
    const navigate = useNavigate();

    const chooseHeight = (widget) => {
        switch (widget) {
            case 'dropdown':
                return '150px';
            default:
                return '60px';
        }
    }


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
                    <FieldItem key={index} height={() => chooseHeight(field.widget)}>
                        <Box sx={{
                            width: '5%',
                            justifyContent: 'center',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {index + 1}
                        </Box>

                        <Box sx={{width: '90%'}}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '90%',
                        }}>
                            <Box sx={{width: '40%'}}>
                                <TextField size='small' label="Label" value={state.pages[id].fields[index].label} onChange={(event) => {
                                  dispatch({type: "changeLabel", payload: {page_id: id, field_id: index, label: event.target.value}});
                                }}/>
                            </Box>
                            
                            <Box sx={{width: '40%'}}>
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
                            <RequiredCheckBox page_id={id} field_id={index}/>
                          
                          
                        </Box>

                        {state.pages[id].fields[index].widget === 'table' ? <TableMaker 
                          page_id={id} field_id={index} /> : null}
                        <Box>

                          {state.pages[id].fields[index].widget === 'dropdown' ? <Button sx={{margin: '0.7em 0 0 0'}}
                           onClick={() => {
                            dispatch({type: 'changeDropDownOptions', payload: {page_id: id, field_id: index, option: ''}});
                           }} size='small' variant='outlined'>
                          <Add size='small'/>Add Option</Button> : null}

                          {state.pages[id].fields[index].widget === 'file' ? <Button sx={{margin: '0.7em 0 0 0'}}
                           onClick={() => {
                            dispatch({type: 'changeFileExtensions', payload: {page_id: id, field_id: index, extension: '.pdf'}});
                           }} size='small' variant='outlined'>
                          <Add size='small'/>Add Extension</Button> : null}

                          {state.pages[id].fields[index].extensions !== undefined ? state.pages[id].fields[index].extensions.map((extension, ind) => {
                            return (<div key={ind} style={{
                                width: '90%',
                                margin: '0.4em',
                                padding: '0 0.6em',
                                borderRadius: '2px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}>

                                    <Typography sx={{
                                        display: 'inline', transform: 'scale(0.7)'
                                    }}>{parseInt(extension.id) + 1}</Typography>
                                    <TextField label='Extension' size='small' value={state.pages[id].fields[index].extensions[ind].value} sx={{
                                        transform: 'scale(0.7)',
                                        width: '170px'
                                    }} variant='outlined' onChange={(value) => {
                                        dispatch({type: 'changeExtensionName', payload: {page_id: id, field_id: index, extension_id: ind, extension: value.target.value}});
                                    }}/>
                                  </div>
                                  
                                  <IconButton size='small' onClick={() => {
                                    dispatch({type: 'deleteFileExtension', payload: {page_id: id, field_id: index, extension_id: ind}});
                                  }}
                                  sx={{transform: 'scale(0.7)'}}>
                                    <Clear/>
                                  </IconButton>
                                </div>);
                          }) : null}

                          {state.pages[id].fields[index].options !== undefined ? state.pages[id].fields[index].options.map((option, ind) => {
                            return (<div key={ind} style={{
                                width: '90%',
                                margin: '0.4em',
                                padding: '0 0.6em',
                                borderRadius: '2px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}>

                                    <Typography sx={{
                                        display: 'inline', transform: 'scale(0.7)'
                                    }}>{parseInt(option.id) + 1}</Typography>
                                    <TextField label='Option' size='small' value={state.pages[id].fields[index].options[ind].value} sx={{
                                        transform: 'scale(0.7)'
                                    }} variant='outlined' onChange={(value) => {
                                        dispatch({type: 'changeOptionName', payload: {page_id: id, field_id: index, option_id: ind, option: value.target.value}});
                                    }}/>
                                  </div>
                                  
                                  <IconButton size='small' onClick={() => {
                                    dispatch({type: 'deleteDropDownOption', payload: {page_id: id, field_id: index, option_id: ind}});
                                  }}
                                  sx={{transform: 'scale(0.7)'}}>
                                    <Clear/>
                                  </IconButton>
                                </div>);
                          }) : null}

                          <div style={{display: 'inline', width: '20%'}}>
                            {state.pages[id].fields[index].widget === 'text-input' ? <Box sx={{width: '20%'}}>
                            <WordCounter page_id={id} field_id={index}/>
                            </Box> : null}

                          </div>
                          
                          <div style={{display: 'inline'}}>
                            {state.pages[id].fields[index].widget === 'text-input' ? <Box sx={{width: '20%'}}>
                            <MultiLined page_id={id} field_id={index}/>
                            </Box> : null}
                          </div>
                        

                        </Box>
                        </Box>

                        <Box sx={{
                            width: '5%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                          <IconButton onClick={() => {
                              dispatch({type: "deleteField", payload: {page_id: id, field_id: index}});
                          }}>
                              <Delete/>
                          </IconButton>
                        </Box>
                        
                        
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