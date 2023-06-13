import { Delete, Info, KeyboardTab } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Chip, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";
import DnDFileCard from "./DnDFilecCard";
import { useFieldVerifiersContext } from "../../Providers/FieldVerifiersProvider";
import PersonDetailsForm from "./PersonDetailsForm";
import FieldVerifierCard from "../../Elements/FieldVerifierCard/FieldVerifierCard";

const CreateAssignmentPage = () => {
  const { fvs } = useFieldVerifiersContext();
  const {
    isLoading,
    assignment,
    fvList,
    setFvList,
    setMounted,
    personsRef,
    isSavingDraft,
    filesRef,
    isSaved,
    form,
    saveAssignment,
    clearForm,
    saveDraftAssignment,
    clearFv,
    template,
  } = useDraftAssignmentContext();
  const navigate = useNavigate();
  useEffect(() => {
    setMounted(true);
  });
  return !isLoading ? (
    <div style={{}}>
      <Grid container>
        {template.persons.map((person, index) => (
          <PersonDetailsForm
            key={index}
            ref={(fe) => (personsRef.current[index] = fe)}
            person={person}
          />
        ))}
      </Grid>
      {template.files.map((file, index) => (
        <DnDFileCard
          key={index}
          name={file.name}
          ref={(fe) => (filesRef.current[index] = fe)}
        />
      ))}
      <Paper
        variant="outlined"
        sx={{
          margin: "2em 0.5em 1em 0.5em",
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginLeft: "1em",
          }}
        >
          {form === null ? "No Form Chosen" : form.name}
        </div>
        <div>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              sx={{
                ml: "1em",
              }}
              onClick={() => {
                clearForm();
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Details">
            <IconButton
              sx={{
                m: "0.5em",
              }}
            >
              <Info fontSize="small" sx={{}} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Choose Form">
            <IconButton
              sx={{
                color: "#4dc3c8",
                mr: "1em",
              }}
              onClick={() => {
                navigate("/dashboard/forms", {
                  state: { mode: "select" },
                });
              }}
            >
              <KeyboardTab fontSize="small" sx={{}} />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          margin: "2em 0.5em 1em 0.5em",
          maxHeight: "300px",
          minHeight: "60px",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "1000",
            width: "100%",
            left: "0",
            height: "60px",
            display: "flex",
            borderTopLeftRadius: "3px",
            color: "white",
            fontWeight: "bolder",
            borderTopRightRadius: "3px",
            backgroundColor: "#4dc3c8",
            top: "0px",
            alignItems: "center",
            paddingLeft: "1em",
          }}
        >
          Choose Field Verifiers
        </div>
        <div style={{ marginTop: "60px", width: "100%", overflow: "auto" }}>
          {fvs.map((fv, index) => (
            <FieldVerifierCard key={index} uid={fv} select={1} />
          ))}
        </div>
      </Paper>
      <div>
        {fvList.map((fv, index) => (
          <Chip
            key={index}
            sx={{ m: "0.3em" }}
            label={
              <div style={{display: 'flex', alignItems: 'center',justifyContent: 'start'}}>
                {fv.pfp === null || fv.pfp === undefined || fv.pfp === "" ? (
                  <Avatar sx={{transform: 'scale(0.5)'}}>
                    {String(fv.name).substring(0, 1).toUpperCase()}
                  </Avatar>
                ) : (
                  <Avatar sx={{transform: 'scale(0.65) translateX(-55%)'}} src={fv.pfp} />
                )}
                { fv.name}
              </div>
            }
            onDelete={() => {
              setFvList((prev) => prev.filter((fve) => fve.uid !== fv.uid));
            }}
          />
        ))}
      </div>
      <Paper
        variant="outlined"
        sx={{
          margin: "2em 0.5em 1em 0.5em",
          height: "70px",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <LoadingButton
          loading={isSavingDraft}
          variant="outlined"
          sx={{
            borderRadius: "23px",
          }}
          disableElevation
          onClick={() => saveDraftAssignment()}
        >
          Save Draft
        </LoadingButton>
        <LoadingButton
          loading={isSaved}
          variant="contained"
          sx={{
            m: "1em",
            borderRadius: "23px",
            bgcolor: "#4dc3c8",
            "&:hover": {
              bgcolor: "#349ca0",
            },
          }}
          disableElevation
          onClick={() => saveAssignment()}
        >
          Assign
        </LoadingButton>
      </Paper>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <ClipLoader loading={true} size={30} />
    </div>
  );
};

export default CreateAssignmentPage;
