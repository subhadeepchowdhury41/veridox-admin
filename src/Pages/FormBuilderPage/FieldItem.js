import { Add, Clear, Delete } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useFormBuilderContext } from '../../Providers/FormBuilderProvider';
import { useWidgetTypeContext } from '../../Providers/WidgetTypeProvider';
import { EndDatePickerWidget, StartDatePickerWidget } from './DatePickerWidget';
import MultiLined from './MultiLined';
import RequiredCheckBox from './RequiredCheckBox';
import TableMaker from './TableMaker';
import WordCounter from './WordCounter';

const FieldItem = (props) => {
  const {index, id} = props;
  const {widgets} = useWidgetTypeContext();
  const {state, dispatch} = useFormBuilderContext();

    return (
        <Paper key={index}
          elevation={0} variant="outlined" sx={{
            margin: '1em',
            padding: '0.5em',
            width: '100%',
          }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: "inline-flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}>
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
                                  event.preventDefault();
                                  dispatch({type: "changeLabel", payload: {page_id: id, field_id: index, label: event.target.value}});
                                }}/>
                            </Box>
                            
                            <Box sx={{width: '40%'}}>
                              <TextField select size='small' label="Widget" sx={{
                                minWidth: '140px'
                              }} value={state.pages[id].fields[index].widget ?? ""}
                                onChange={(event) => {
                                  event.preventDefault();
                                  dispatch({type: 'changeWidget', payload: {page_id: id, field_id: index, widget: event.target.value}})
                                }}>
                                {widgets.map((widget, index) => (
                                  <MenuItem key={index} value={widget.name}>
                                      {widget.name}
                                  </MenuItem>
                               ))}
                              </TextField>
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
                                    <TextField label='Extension' size='small' defaultValue={state.pages[id].fields[index].extensions[ind].value} sx={{
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

                          {state.pages[id].fields[index].widget === 'date-time' ?
                            <div style={{width: '100%', margin: '0.6em 0'}}>
                              <Grid container sx={{width: '100%'}}>
                              <Grid item md={6}>
                                <StartDatePickerWidget label='Start Date' page_id={id} field_id={index}/>
                              </Grid>
                              <Grid item md={6}>
                                <EndDatePickerWidget label='End Date' page_id={id} field_id={index}/>
                              </Grid>
                            </Grid>
                            </div> : null}

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
                                    <TextField label='Option' size='small' defaultValue={state.pages[id].fields[index].options[ind].value} sx={{
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
          </div>
        </Paper>
    );
};

export default FieldItem;