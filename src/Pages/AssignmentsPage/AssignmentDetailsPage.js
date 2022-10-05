import { Box, Button, Grid, Paper } from "@mui/material";
import {  } from "@mui/system";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { database } from "../../Firebase/Firebase";

const AssignmentDetailsPage = () => {

    const [assignment, setAssignment] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [form, setForm] = useState({});
    const [fv, setFv] = useState("");

    const getForm = async () => {
      const snapshot1 = await getDoc(doc(database, "assignments/" + id, "form_data/data"));
      const snapshot2 = await getDoc(doc(database, "assignments/" + id, "form_data/result"));
      setForm({data: snapshot1.data(), response: snapshot2.data()});
    }

    const getFv = async (fvId) => {
      const snapshot = await getDoc(doc(database, "field_verifier", fvId));
      setFv(snapshot.data().name);
    }

    const {id} = useParams();

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onSnapshot(doc(database, "assignments", id),
          { includeMetadataChanges: true },
          snapshot => {
            setAssignment({...snapshot.data(), id: snapshot.id});
            getFv(snapshot.data().assigned_to);
            getForm();
            setIsLoading(false);
          }
        )
        
        return () => {
            unsubscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return !isLoading ? (<div>
      <Grid container sx={{
        borderRadius: '3px',
        border: '1px solid grey',
        borderBottomColor: 'transparent',
        width: '100%',
      }}>
        <Grid item lg={6} style={{display: 'inline-flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Name
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            {assignment.name}
          </div>
          
        </Grid>
        <Grid item lg={6} md={12} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{color: 'grey', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Address 
          </div>
          <div style={{display: 'flex', justifyContent: 'center', margin: '0.5em', width: '100%'}}>
            {assignment.address}
          </div>
        </Grid>
        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'}}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Assigning Date
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            {assignment.assigned_at}
          </div>
        </Grid>
        <Grid item lg={6} md={12} style={{display: 'flex', borderBottom: '1px solid grey', width: '100%'}}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'
          }}>
            Status
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            {assignment.status}
          </div>
        </Grid>
        <Grid item lg={6} style={{display: 'flex', width: '100%', borderBottom: '1px solid grey', }}>
        <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Phone
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            {assignment.phone}
          </div>
        </Grid>
        <Grid item lg={6} style={{display: 'flex', width: '100%', borderBottom: '1px solid grey'}}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Agency
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            {assignment.agency}
          </div>
        </Grid>
      </Grid>
      <Box>
        <Paper variant="outlined" sx={{margin: '1.3em 0', display: 'flex'}}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            padding: '0.7em 0',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '12.5%'
          }}>
            Field Verifier
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '100%'}}>
            {fv}
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '100%'}}>
            <Button variant="contained" size="small">Details</Button>
          </div>
        </Paper>
        <Paper variant="outlined" sx={{margin: '1.3em 0', display: 'flex'}}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            padding: '0.5em 0',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '12.5%'
          }}>
            Form
          </div><div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '100%'}}>
            {JSON.stringify(form)}
          </div>

        </Paper>
      </Box>
    </div>) : <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
    }}><ClipLoader loading={true} size={30}/></div>
}

export default AssignmentDetailsPage;