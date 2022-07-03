import { PersonAdd } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import React from 'react';
import AddRequestItem from '../../Elements/AddRequestItem/AddRequestItem';
import { useAddRequestContext } from '../../Providers/AddRequestProvider';

const AddFieldVerifierPage = () => {
    const {addReq} = useAddRequestContext();
    return (
        <div>
        <div style={{display: 'inline-flex', padding: "0 0.5em 0.5em 0"}}>
        
            <Typography sx={{padding: '0 0.4em'}}>
            Add Requests</Typography><PersonAdd style={{transform: 'scale(0.9)'}} /></div>
            
            <Divider style={{marginBottom: '1em'}}/>
            {addReq.map((element, index) => (<AddRequestItem {...element} key={index}/>))}
        </div>
    );
}

export default AddFieldVerifierPage;