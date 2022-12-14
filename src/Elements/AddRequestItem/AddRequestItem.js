import { Box, Button, IconButton, Paper, Tooltip } from '@mui/material';
import React from 'react';
import { ClearTwoTone, Add} from '@mui/icons-material';
import './AddRequestItem.css';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { database } from '../../Firebase/Firebase';
import { useAuthContext } from '../../Providers/AuthProvider';
import { useFieldVerifiersContext } from '../../Providers/FieldVerifiersProvider';
import { useNavigate } from 'react-router-dom';
import { useToastProvider } from '../../Providers/ToastProvider';


const AddRequestItem = (props) => {

    const {user} = useAuthContext();
    const {fvs} = useFieldVerifiersContext();
    const navigate = useNavigate();
    const {showSuccess, showError} = useToastProvider();

    const addFv = async (uid, data) => {
        await deleteDoc(doc(database, `agency/${user.uid}/add_requests`, uid)).then(async () => {
          await updateDoc(doc(database, "agency", user.uid), {
            field_verifiers: [...fvs, uid]
          }).then(async () => {
            await getDoc(doc(database, "field_verifier", uid)).then(async (snap) => {
              if (snap.exists) {
                await updateDoc(doc(database, "field_verifier", uid), data);
              } else {
                await setDoc(doc(database, "field_verifier", uid), data);
              }
              await updateDoc(doc(database, "add_requests", uid), {
                status: 'accepted'
              }).then(() => {
                showSuccess("Successfully added Field Verifier");
              });
            })
          });
        }).catch(err => {
          showError();
        });
    }

    const deleteReq = async (uid) => {
      await deleteDoc(doc(database, `agency/${user.uid}/add_requests`, uid)).then(async () => {
        await updateDoc(doc(database, "add_requests", uid), {
          status: 'rejected'
        });
      });
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
                padding: "0.1em 0.4em",
                '&:hover': {
                    backgroundColor: "whitesmoke"
                }
            }}>
              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                <div style={{
                  fontSize: '14px', margin: '0 0.7em',
                  fontWeight: 'bold', color: 'gray', display: 'inline'}}>
                  ID
                </div>
                <div  style={{display: 'inline',
                  fontFamily: 'Source Serif, serif', fontSize: '16px'}}>{props.id}</div>
              </Box>

              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
              <div style={{
                  fontSize: '14px', margin: '0 0.7em',
                  fontWeight: 'bold', color: 'gray', display: 'inline'}}>
                  Name
                </div>
                <div  style={{display: 'inline',
                  fontFamily: 'Source Serif, serif', fontSize: '16px'}}>{props.name}</div>
              </Box>
              
              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
              <div style={{
                  fontSize: '14px', margin: '0 0.7em',
                  fontWeight: 'bold', color: 'gray', display: 'inline'}}>
                  Phone Number
                </div>
                <div style={{display: 'inline',
                  fontFamily: 'Source Serif, serif', fontSize: '16px'}}>
                    {props.phone}</div>
              </Box>

              <Box sx={{width: '15%'}}>
               <Tooltip title='Reject'><IconButton sx={{color: 'red',
               transform: 'scale(0.85)',
               margin: '0.1em',
               border: '0.5px solid red', marginRight: '0.5em'
               }} onClick={() => {
                  deleteReq(props.id);
               }}>
                <ClearTwoTone/>
              </IconButton></Tooltip>
              <Tooltip title='Accept'>
              <IconButton onClick={() => {
                addFv(props.id, props);
              }} sx={{
                transform: 'scale(0.85)',
                margin: '0.1em',
                color: 'lightGreen',
                border: '0.5px solid lightGreen'
                }}>
                <Add/>
              </IconButton>
              </Tooltip>
              </Box>
              <Box sx={{width: '15%'}}>
              <Button size='small' variant='outlined' sx={{display: 'inline'}} onClick={() => {
                navigate('/dashboard/fieldVerifier/' + props.id, {state: {mode: 'add'}});
              }}>See Info</Button>
              </Box>
              
           </Paper>
           
        </div>
    );
}

export default AddRequestItem;