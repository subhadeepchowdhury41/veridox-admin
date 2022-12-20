import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import {  } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";

const CreateAssignmentPage = () => {

    let inputStyle = {style: {fontFamily: 'Source Serif Pro, serif'}};

    let types = ["Educational Loan", "Death Certificate", "Home Loan"];
    const {isLoading, assignment, setAssignment, setMounted, errors, isSavingDraft, gettingFv, isSaved,
       form, fvName, saveAssignment, clearForm, saveDraftAssignment} = useDraftAssignmentContext();
    const navigate = useNavigate();

    useEffect(() => {
      setMounted(true);
    });

    return !isLoading ? (<div style={{
    }}>
      <div style={{
        fontSize: '19px',
        fontWeight: 'bold',
        fontFamily: 'Playfair Display, serif'
      }}>Applicant Details</div>
      <hr style={{margin: '0.4em 0 2em 0', border: '0.2px solid #ededed'}}/>
      
      <Grid container sx={{
        marginBottom: '1em',
        borderRadius: '3px',
        border: '1px solid grey',
        borderBottomColor: 'transparent',
        width: '100%',
      }}>
        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%',
        }}>
          <div style={{height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#606060',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Name
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField error={Boolean(errors.applicant_name ?? false)} helperText={
              errors?.applicant_name
            } InputLabelProps={inputStyle} InputProps={inputStyle} sx={{
            }} value={assignment.applicant_name ?? ""} label="Applicant Name" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_name: val.target.value});
            }}/>
          </div>
        </Grid>

        <Grid item lg={6} style={{display: 'flex', width: '100%', borderBottom: '1px solid grey', }}>
        <div style={{
            height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#606060',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Phone
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            <TextField error={Boolean(errors.applicant_name ?? false)} helperText={
              errors?.applicant_phone
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.applicant_phone ?? ""} label="Applicant Phone" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_phone: val.target.value});
            }}/>
          </div>
        </Grid>

        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#606060',
            height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Pincode
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField error={Boolean(errors.applicant_pincode ?? false)} helperText={
              errors?.applicant_pincode
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.applicant_pincode ?? ""} label="Applicant Pincode" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_pincode: val.target.value});
            }}/>
          </div>
        </Grid>

        <Grid item lg={6} md={12} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{fontSize: '16px',
            fontWeight: 'bold',
            color: '#606060',
            backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            Post Office
          </div>
          <div style={{display: 'flex', justifyContent: 'center', margin: '0.5em', width: '100%'}}>
            <TextField  error={Boolean(errors.applicant_post_office ?? false)} helperText={
              errors?.applicant_post_office
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.applicant_post_office ?? ""} label="Applicant Post Office" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_post_office: val.target.value});
            }}/>
          </div>
        </Grid>
        
        <Grid item lg={6} style={{display: 'flex', borderBottom: '1px solid grey',
          width: '100%'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#606060',
            height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            District/City
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField  error={Boolean(errors.applicant_city ?? false)} helperText={
              errors?.applicant_city
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.applicant_city ?? ""} label="Applicant District/City" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_city: val.target.value});
            }}/>
          </div>
          
        </Grid>

        <Grid item lg={6} style={{display: 'flex', width: '100%', borderBottom: '1px solid grey', }}>
        <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#606060',
            height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            State
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            <TextField  error={Boolean(errors.applicant_state ?? false)} helperText={
              errors?.applicant_state
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.applicant_state ?? ""} label="Applicant State" size="small" onChange={(val) => {
              setAssignment({...assignment, applicant_state: val.target.value});
            }}/>
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
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#606060',
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
            <TextField  error={Boolean(errors.coapplicant_name ?? false)} helperText={
              errors?.coapplicant_name
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.coapplicant_name ?? ""} label="Co-Applicant Name" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_name: val.target.value});
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
            <TextField  error={Boolean(errors.coapplicant_phone ?? false)} helperText={
              errors?.coapplicant_phone
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.coapplicant_phone ?? ""} label="Co-Applicant Phone" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_phone: val.target.value});
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
            Pincode
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField  error={Boolean(errors.coapplicant_pincode ?? false)} helperText={
              errors?.coapplicant_pincode
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.coapplicant_pincode ?? ""} label="Co-Applicant Pincode" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_pincode: val.target.value});
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
            Post Office
          </div>
          <div style={{display: 'flex', justifyContent: 'center', margin: '0.5em', width: '100%'}}>
            <TextField  error={Boolean(errors.coapplicant_post_office ?? false)} helperText={
              errors?.coapplicant_post_office
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.coapplicant_post_office ?? ""} label="Co-Applicant Post Office" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_post_office: val.target.value});
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
            District/City
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            <TextField  error={Boolean(errors.coapplicant_city ?? false)} helperText={
              errors?.coapplicant_city
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.coapplicant_city ?? ""} label="Co-Applicant District/City" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_city: val.target.value});
            }}/>
          </div>
          
        </Grid>

        <Grid item lg={6} style={{display: 'flex', width: '100%', borderBottom: '1px solid grey', }}>
        <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            State
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em', width: '100%'}}>
            <TextField  error={Boolean(errors.coapplicant_state ?? false)} helperText={
              errors?.coapplicant_state
            } InputLabelProps={inputStyle} InputProps={inputStyle} value={assignment.coapplicant_state ?? ""} label="Co-Applicant State" size="small" onChange={(val) => {
              setAssignment({...assignment, coapplicant_state: val.target.value});
            }}/>
          </div>
        </Grid>
      </Grid>
      <Box>
        <Paper variant="outlined" sx={{margin: '1.3em 0', display: 'flex', justifyContent: 'space-between'}}>
          <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            padding: '0.7em 0',
            alignItems: 'center',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '12.5%'
          }}>
            Field Verifier
          </div>

          <div style={{justifyContent: 'center', fontFamily: 'Source Serif Pro, serif', display: 'flex', margin: '0.5em 0', width: '100%'}}>
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
            fontWeight: 'bold',
            justifyContent: 'center',
            minWidth: '12.5%'
          }}>
            Form
          </div>
          <div style={{justifyContent: 'center', fontFamily: 'Source Serif Pro, serif', display: 'flex', margin: '0.5em 0', width: '100%'}}>
            {form.name === undefined || form.name === null ? "No form Chosen" : form.name}
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '15%'}}>
            <Button size="small" variant="contained" onClick={() => {
              navigate("/dashboard/forms", {state: {mode: "select"}});
            }}>Choose</Button>
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '15%'}}>
            {form.name !== null && form.name !== undefined ? <Button size="small" variant="outlined">Details</Button> : null}
          </div>
          <div style={{justifyContent: 'center', display: 'flex', margin: '0.5em 0', width: '15%'}}>
            <Button size="small" variant="contained" sx={{backgroundColor: 'red',
              '&:hover': {
                backgroundColor: 'red'
              }
            }} onClick={() => {
              clearForm();
            }}>Clear</Button>
          </div>

        </Paper>
        <TextField InputLabelProps={{style: {fontFamily: 'Source Serif Pro, serif'}}} InputProps={{style: {fontFamily: 'Source Serif Pro, serif'}}} select label="Verification Type" size='small' sx={{minWidth: '200px', fontFamily: 'Source Serif Pro, serif'}}
            value={assignment.document_type} onChange={(event) => {
              setAssignment({...assignment, document_type: event.target.value});
            }}>
            {types.map(((type, index) => (<MenuItem key={index} sx={{fontFamily: 'Source Serif Pro, serif'}} value={type}>{type}</MenuItem>)))}
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