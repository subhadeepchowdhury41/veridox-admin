import { Delete, IndeterminateCheckBoxOutlined, Info, InfoOutlined, Key, KeyboardTab, SendRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, MenuItem, Paper, TextField, Tooltip } from "@mui/material";
import {  } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";
import DnDFileCard from "./DnDFilecCard";
import PersonDetailsForm from "./PersonDetailsForm";

const CreateAssignmentPage = () => {
    let types = ["Educational Loan", "Death Certificate", "Home Loan"];
    const {isLoading, assignment, setAssignment, setMounted, errors, isSavingDraft, gettingFv, isSaved,
        form, fvName, saveAssignment, clearForm, saveDraftAssignment, clearFv, template
      } = useDraftAssignmentContext();
    const navigate = useNavigate();
    useEffect(() => {
      setMounted(true);
    });
    const personsRef = useRef([]);
    const filesRef = useRef([]);
    return !isLoading ? (<div style={{
    }}><Grid container>
      {template.persons.map((person, index) =>
      <PersonDetailsForm key={index} 
      ref={fe => personsRef.current[index] = fe} person={person}/>)}
      </Grid>
      {/* <Button onClick={() => {
        personsRef.current[0].isValid();
      }}>Validate</Button> */}
      {template.files.map((file, index) =>
        <DnDFileCard key={index} name={file.name}/>
      )}
      <Paper variant='outlined' sx={{
        margin: '2em 0.5em 1em 0.5em',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          marginLeft: '1em'
        }}>
          {form === null ? "No Form Chosen" : form.name}
        </div>
        <div>
          <Tooltip title='Delete'>
          <IconButton color="error" sx={{
            ml: '1em'
          }} onClick={() => {
            clearForm();
          }}>
            <Delete fontSize="small"/>
          </IconButton>
          </Tooltip>
          <Tooltip title='Details'>
          <IconButton sx={{
            m: '0.5em'
          }}>
            <Info fontSize="small" sx={{
            }}/>
          </IconButton>
          </Tooltip>
          <Tooltip title='Choose Form'>
          <IconButton sx={{
            color: '#4dc3c8',
            mr: '1em'
          }} onClick={() => {
            navigate('/dashboard/forms', {
              state: {mode: 'select'}
            })
          }}>
            <KeyboardTab fontSize="small" sx={{
            }}/>
          </IconButton>
          </Tooltip>
        </div>
      </Paper>
      <Paper variant='outlined' sx={{
        margin: '2em 0.5em 1em 0.5em',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          marginLeft: '1em'
        }}>
          {assignment.assigned_to === null ? "No Form Chosen" : fvName}
        </div>
        <div>
          <Tooltip title='Delete'>
          <IconButton disabled={Boolean(
            assignment.assigned_to === null
          )} color="error" sx={{
            ml: '1em'
          }} onClick={() => {
            clearFv();
          }}>
            <Delete fontSize="small"/>
          </IconButton>
          </Tooltip>
          <Tooltip title='Details'>
          <IconButton sx={{
            m: '0.5em'
          }} disabled={Boolean(
            assignment.assigned_to === null
          )}>
            <Info fontSize="small" sx={{
            }}/>
          </IconButton>
          </Tooltip>
          <Tooltip title='Choose Field Verifier'>
          <IconButton sx={{
            color: '#4dc3c8',
            mr: '1em'
          }} onClick={() => {
            navigate('/dashboard/fieldVerifierPage', {
              state: {mode: 'select'}
            })
          }}>
            <KeyboardTab fontSize="small" sx={{
            }}/>
          </IconButton>
          </Tooltip>
        </div>
      </Paper>
    </div>) : <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
    }}><ClipLoader loading={true} size={30}/></div>
  }

export default CreateAssignmentPage;