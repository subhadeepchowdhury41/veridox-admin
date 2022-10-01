import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import {  } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";

const CreateAssignmentPage = () => {

    const {isLoading, assignment, setAssignment, form, fvName} = useDraftAssignmentContext();
    const navigate = useNavigate();

    return !isLoading ? (<div>
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
            Applicant Name
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField value={assignment.name ?? ""} label="Name" size="small" onChange={(val) => {
              setAssignment({...assignment, name: val.target.value});
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
            Co-applicant Name
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField value={assignment.name ?? ""} label="Name" size="small" onChange={(val) => {
              setAssignment({...assignment, name: val.target.value});
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
            <TextField value={assignment.phone ?? ""} label="Phone" size="small" onChange={(val) => {
              setAssignment({...assignment, phone: val.target.value});
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
            <Button onClick={() => {
              navigate("/dashboard/fieldVerifierPage", {state: {mode: "select"}});
            }} variant="contained" size="small">Choose</Button>
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
            {JSON.stringify(form)}
          </div>

        </Paper>
        <div style={{width: '100%', display: "flex", justifyContent: "end"}}>
          <Button variant="contained">Save</Button>
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