import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import {  } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";

const CreateAssignmentPage = () => {

    let types = ["Educational Loan", "Death Certificate", "Home Loan"];
    const {isLoading, assignment, setAssignment, isSavingDraft, gettingFv, isSaved,
       form, fvName, saveAssignment, saveDraftAssignment} = useDraftAssignmentContext();
    const navigate = useNavigate();

    return !isLoading ? (<div>
      Applicant Details
      <hr style={{margin: '0.4em 0 2em 0'}}/>
      <Grid container sx={{
        marginBottom: '1em',
        borderRadius: '3px',
        border: '1px solid grey',
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
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField value={assignment.applicant_name ?? ""} label="Applicant Name" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_name: val.target.value});
            }}/>
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
            Address
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField value={assignment.applicant_address ?? ""} label="Applicant Address" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_address: val.target.value});
            }}/>
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
            <TextField value={assignment.address ?? ""} label="Address" size="small" onChange={(val) => {
              setAssignment({...assignment, address: val.target.value});
            }}/>
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
            <TextField value={assignment.applicant_phone ?? ""} label="Applicant Phone" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_phone: val.target.value});
            }}/>
          </div>
        </Grid>
      </Grid>
      Co-applicant Details
      <hr style={{margin: '0.4em 0 2em 0'}}/>
      <Grid container sx={{
        borderRadius: '3px',
        border: '1px solid grey',
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
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField value={assignment.coapplicant_name ?? ""} label="Co-applicant Name" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_name: val.target.value});
            }}/>
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
              Address
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField value={assignment.coapplicant_address ?? ""} label="Co-applicant Address" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_address: val.target.value});
            }}/>
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
            <TextField value={assignment.address ?? ""} label="Address" size="small" onChange={(val) => {
              setAssignment({...assignment, address: val.target.value});
            }}/>
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
            <TextField value={assignment.coapplicant_phone ?? ""} label="Co-applicant Phone" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_phone: val.target.value});
            }}/>
          </div>
        </Grid>
      </Grid>
      <Box>
        <Paper variant="outlined" sx={{margin: '1.3em 0', display: 'flex', justifyContent: 'space-between'}}>
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
            {assignment.assigned_to ? fvName : "No Field Verifier Assigned"}
          </div>
          <div style={{justifyContent: 'space-evenly', display: 'flex',
            margin: '0.5em 0', width: '15%',}}>
            {!gettingFv ? <Button onClick={() => {
              navigate("/dashboard/fieldVerifierPage", {state: {mode: "select"}});
            }} variant="contained" size="small">Choose</Button> : <Button size='small' disabled>Choosing.</Button>}
          </div>
          <div style={{justifyContent: 'space-evenly', display: 'flex',
            margin: '0.5em 0', width: '15%' }}>
            {assignment.assigned_to === null || assignment.assigned_to === undefined ? null
              : <Button variant="contained" size="small">Details</Button>}
          </div>
        </Paper>
        <Paper variant="outlined" sx={{margin: '1.3em 0', display: 'flex'}}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            padding: '0.7em 0',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '12.5%'
          }}>
            Form
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '100%'}}>
            {form.name === undefined || form.name === null ? "No form Chosen" : form.name}
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '15%'}}>
            <Button size="small" variant="contained" onClick={() => {
              navigate("/dashboard/forms", {state: {mode: "select"}});
            }}>Choose</Button>
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '15%'}}>
            {form.name !== null && form.name !== undefined ? <Button size="small" variant="contained">Details</Button> : null}
          </div>

        </Paper>
        <TextField select label="Verification Type" size='small' sx={{minWidth: '200px'}}
            value={assignment.document_type} onChange={(event) => {
              setAssignment({...assignment, document_type: event.target.value});
            }}>
            {types.map(((type, index) => (<MenuItem key={index} value={type}>{type}</MenuItem>)))}
          </TextField>
        <div style={{width: '100%', display: "flex", justifyContent: "end"}}>
          {!isSavingDraft ? <Button variant="contained" sx={{display: 'flex', margin: '0 0.8em'}} onClick={() => {
            saveDraftAssignment();
          }}>Save Draft</Button> : <Button disabled>Saving..</Button>}
          {!isSaved ? <Button variant="contained" onClick={() => {
            saveAssignment();
          }}>Save</Button> : <Button disabled >Saving.</Button>}
        </div>
      </Box>
    </div>) : <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
    }}><ClipLoader loading={true} size={30}/></div>
  }

export default CreateAssignmentPage;