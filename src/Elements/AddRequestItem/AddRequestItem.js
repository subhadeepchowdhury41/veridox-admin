import { Box, IconButton, Paper } from '@mui/material';
import React from 'react';
import { ClearTwoTone, Add} from '@mui/icons-material';
import './AddRequestItem.css';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { database } from '../../Firebase/Firebase';
import { useAuthContext } from '../../Providers/AuthProvider';
import { useFieldVerifiersContext } from '../../Providers/FieldVerifiersProvider';


const AddRequestItem = (props) => {

    const {user} = useAuthContext();
    const {fvs} = useFieldVerifiersContext();

    const addFv = async (uid, data) => {
        await deleteDoc(doc(database, `agency/${user.uid}/add_requests`, uid));
        await updateDoc(doc(database, "agency", user.uid), {
          field_verifiers: [...fvs, uid]
        });
        await updateDoc(doc(database, "add_requests", uid), {
          status: 'accepted'
        })
        await setDoc(doc(database, "field_verifier", uid), data);
    }

    return (
        <div key={props.index} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6em"
        }}>
           <Paper elevation={0} variant="outlined" sx={{
                cursor: 'pointer',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "96%",
                padding: "0.7em",
                '&:hover': {
                    backgroundColor: "whitesmoke"
                }
            }}>
              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                {props.id}
              </Box>

              <Box className="OverflowTextContainer" sx={{width: "10%"}}>
                {props.name}
              </Box>
              
              <Box className="OverflowTextContainer" sx={{width: "20%"}}>
                {props.phone}
              </Box>

              <Box sx={{width: '15%'}}>
               <IconButton sx={{color: 'red',
               border: '0.5px solid red', marginRight: '0.5em'
               }}>
                <ClearTwoTone/>
              </IconButton>
              <IconButton onClick={() => {
                addFv(props.id, props);
              }} sx={{
                color: 'lightGreen',
                border: '0.5px solid lightGreen'
                }}>
                <Add/>
              </IconButton>
              </Box>
              
           </Paper>
           
        </div>
    );
}

export default AddRequestItem;