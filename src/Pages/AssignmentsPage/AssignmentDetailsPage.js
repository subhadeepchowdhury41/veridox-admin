import { Box, Button, Grid, Paper } from "@mui/material";
import {  } from "@mui/system";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { database } from "../../Firebase/Firebase";
import './AssignmentDetailsPage.css';

const AssignmentDetailsPage = () => {

    const [assignment, setAssignment] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [form, setForm] = useState({});
    const [fv, setFv] = useState("");

    const getForm = async () => {
      const snapshot1 = await getDoc(doc(database, "assignments/" + id, "form_data/data"));
      const snapshot2 = await getDoc(doc(database, "assignments/" + id, "form_data/result"));
      setForm({data: snapshot1.data(), response: snapshot2.data() ?? {}});
    }

    const getFv = async (fvId) => {
      const snapshot = await getDoc(doc(database, "field_verifier", fvId));
      setFv(snapshot.data().name);
    }

    const {id} = useParams();
    const navigate = useNavigate();

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
      <div style={{
        fontSize: '19px',
        fontWeight: 'bold',
        fontFamily: 'Playfair Display, serif'
      }}>Applicant Details</div>
      <hr style={{margin: '0.4em 0 2em 0', border: '0.2px solid #ededed'}}/>

      <Grid container sx={{
        borderRadius: '3px',
        border: '1px solid grey',
        fontSize: '16px',
        marginBottom: '1em',
        fontWeight: 'bold',
        color: '#606060',
        borderBottomColor: 'transparent',
        width: '100%',
      }}>
        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Name
          </div>
          <div className="data" style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            {assignment.applicant_name}
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
          <div className="data" style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            {assignment.applicant_phone}
          </div>
        </Grid>

        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
              Pincode
          </div>
          <div className="data"  style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            {assignment.applicant_pincode}
          </div>
          
        </Grid>
        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
              Post Office
          </div>
          <div className="data"  style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            {assignment.applicant_post_office}
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
            District/City
          </div>
          <div className="data" style={{display: 'flex', justifyContent: 'center', margin: '0.5em', width: '100%'}}>
            {assignment.applicant_city}
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
            State
          </div>
          <div className="data" style={{display: 'flex', justifyContent: 'center', margin: '0.5em', width: '100%'}}>
            {assignment.applicant_state}
          </div>
        </Grid>
      </Grid>

      <div style={{
        fontSize: '19px',
        fontWeight: 'bold',
        fontFamily: 'Playfair Display, serif'
      }}>Co-applicant Details</div>
      <hr style={{margin: '0.4em 0 2em 0', border: '0.2px solid #ededed'}}/>

      <Grid container sx={{
        borderRadius: '3px',
        border: '1px solid grey',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#606060',
        borderBottomColor: 'transparent',
        width: '100%',
      }}>
        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Name
          </div>
          <div className="data" style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            {assignment.coapplicant_name}
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
          <div className="data" style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            {assignment.coapplicant_phone}
          </div>
        </Grid>

        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
              Pincode
          </div>
          <div className="data"  style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            {assignment.coapplicant_pincode}
          </div>
          
        </Grid>
        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
              Post Office
          </div>
          <div className="data"  style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            {assignment.coapplicant_post_office}
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
            District/City
          </div>
          <div className="data" style={{display: 'flex', justifyContent: 'center', margin: '0.5em', width: '100%'}}>
            {assignment.coapplicant_city}
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
            State
          </div>
          <div className="data" style={{display: 'flex', justifyContent: 'center', margin: '0.5em', width: '100%'}}>
            {assignment.coapplicant_state}
          </div>
        </Grid>
      </Grid>
      <Box>
        <Paper variant="outlined" sx={{margin: '1.3em 0', display: 'flex', justifyContent: 'space-between'}}>
          <div style={{height: '100%', backgroundColor: 'whitesmoke',
            padding: '0.7em 0',
            alignItems: 'center',
            display: 'flex',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#707070',
            justifyContent: 'center',
            minWidth: '12.5%'
          }}>
            Field Verifier
          </div>

          <div style={{
            fontFamily: 'Source Serif Pro, serif',
            justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '100%'}}>
            {fv ?? "No Field Verifier Assigned"}
          </div>
          <div style={{justifyContent: 'space-evenly', display: 'flex',
            margin: '0.5em 0', width: '15%' }}>
            {assignment.assigned_to === null || assignment.assigned_to === undefined ? null
              : <Button variant="contained" size="small" onClick={() => {
                navigate('/dashboard/fieldVerifier/' + assignment.assigned_to);
              }}>Details</Button>}
          </div>
        </Paper>
        <Paper variant="outlined" sx={{margin: '1.3em 0', display: 'flex'}}>
          <div style={{
            height: '100%', backgroundColor: 'whitesmoke',
            padding: '0.7em 0',
            alignItems: 'center',
            display: 'flex',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#707070',
            justifyContent: 'center',
            minWidth: '12.5%'
          }}>
            Form
          </div>
          <div style={{
            fontFamily: 'Source Serif pro, serif',
            justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '100%'}}>
            {form.data?.name === undefined || form.data?.name === null ? "No form Chosen" : form.data?.name}
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '15%'}}>
            {form.data?.name !== null && form.data?.name !== undefined ? <Button size="small" variant="contained">Details</Button> : null}
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