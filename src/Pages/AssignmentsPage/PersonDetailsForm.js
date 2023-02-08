import styled from '@emotion/styled';
import { PersonRounded } from '@mui/icons-material';
import { Grid, Paper, TextField, Typography } from '@mui/material';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { personValidation } from '../../Models/PersonDetails';
import { useDraftAssignmentContext } from '../../Providers/DraftAssignmentProvider';
import { useForm } from '../../Utils/FormValidator';

const StyledTextField = styled(({label, sIcon, value, onChange, error}) =>
  <TextField label={label} error={Boolean(error ?? false)} helperText={error}
  size='small' fullWidth value={value}
  onChange={onChange}
  InputProps={{
    sx: {
        borderRadius: '23px',
    }
  }}
  InputLabelProps={{
      sx: {
          fontFamily: 'Roboto, serif',
          fontSize: '14px'
      }
  }}
  margin='normal'/>)({
})

const PersonDetailsForm = forwardRef((props, ref) => {
    const {setPersons} = useDraftAssignmentContext();
    const [data, setData, validate, errors] = useForm(personValidation);
    useImperativeHandle(ref, () => ({
        isValid: () => {
            return validate();
        }
    }));
    useEffect(() => {
        setPersons(prev => {
            prev[data.label] = data;
            prev[data.error] = errors;
            return prev;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return (<Grid item xs={12} p='0.5em' md={6}><Paper variant='outlined'
    sx={{
        p: '1em 2em 2em 2em',
        minWidth: '300px',
        margin: '0 auto'
    }}>
        
        <Typography fontFamily='Playfair Display, serif' fontSize='23px' sx={{display: 'flex', alignItems: 'end'}}
        fontWeight={'regular'}><PersonRounded sx={{
            color: '#4dc3c8',
            mb: '0.27em', mr: '0.6em', transform: 'scale(1.3)'
        }}/> {props.person} Details</Typography>
            
        <Grid container>
            <Grid item xs={6} pr='1em'>
                <StyledTextField label='First Name' error={errors?.fName} value={data.fName}
                    onChange={(event) => {
                    setData(prev => ({...prev, fName: event.target.value}));
                }}/>
            </Grid>
            <Grid item xs={6} pl='1em'>
                <StyledTextField label="Last Name" error={errors.lName} value={data.lName}
                    onChange={(event) => {
                    setData(prev => ({...prev, lName: event.target.value}));
                }}/>
            </Grid>
            <Grid item xs={12}>
                <StyledTextField
                error={errors?.address1}
                label='Address Line 1' onChange={(event) => {
                    setData(prev => ({...prev, address1: event.target.value}));
                }}/>
            </Grid>
            <Grid item xs={12}>
                <StyledTextField label='Address Line 2' onChange={(event) => {
                    setData(prev => ({...prev, address2: event.target.value}));
                }}/>
            </Grid>
            <Grid item xs={6} pr='1em'>
                <StyledTextField error={errors?.phone}
                label='Phone Number' onChange={(event) => {
                    setData(prev => ({...prev, phone: event.target.value}));
                }}/>
            </Grid>
            <Grid item xs={6} pl='1em'>
                <StyledTextField error={errors?.pincode}
                label='Pin Code' onChange={(event) => {
                    setData(prev => ({...prev, pincode: event.target.value}));
                }}/>
            </Grid>
            <Grid item xs={6} pr='1em'>
                <StyledTextField error={errors?.city}
                label='City' onChange={(event) => {
                    setData(prev => ({...prev, city: event.target.value}));
                }}/>
            </Grid>
            <Grid item xs={6} pl='1em'>
                <StyledTextField error={errors?.state}
                label='State' onChange={(event) => {
                    setData(prev => ({...prev, state: event.target.value}));
                }}/>
            </Grid>
        </Grid>
    </Paper></Grid>);
})

export default PersonDetailsForm;