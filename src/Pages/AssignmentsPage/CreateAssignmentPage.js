import { Close, Delete, Info, KeyboardTab } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  AppBar,
  Avatar,
  Chip,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";
import DnDFileCard from "./DnDFilecCard";
import { useFieldVerifiersContext } from "../../Providers/FieldVerifiersProvider";
import PersonDetailsForm from "./PersonDetailsForm";
import FieldVerifierCard from "../../Elements/FieldVerifierCard/FieldVerifierCard";
import { useFormsContext } from "../../Providers/FormsProvider";
import FormItem from "../Forms/FormItem";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [dialogType, setDialogType] = useState(0);
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const { forms } = useFormsContext();
  useEffect(() => {
    setMounted(true);
  });
  return !isLoading ? (
    <div style={{}}>
      <Dialog
        open={open}
        fullScreen
        TransitionComponent={Transition}
        onClose={() => setOpen(false)}
      >
        {dialogType === 0 ? (
          <div>
            <AppBar
              elevation={0}
              sx={{ position: "relative", bgcolor: "#4dc3c8" }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setOpen(false)}
                >
                  <Close />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Choose Form
                </Typography>
              </Toolbar>
            </AppBar>
            <div
              style={{
                marginTop: "2em",
                height: "30px",
                fontWeight: "bold",
                fontSize: "12px",
                width: "100%",
                display: "inline-flex",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#404040",
                  }}
                >
                  Form ID
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    color: "#404040",
                  }}
                >
                  Form Name
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#404040",
                  }}
                >
                  Action
                </Grid>
              </Grid>
            </div>
            <hr
              style={{
                width: "93%",
                margin: "0 auto",
                border: "0.6px solid #dedede",
              }}
            />
            {forms.map((form, index) => (
              <FormItem
                setOpen={setOpen}
                key={index}
                id={form.id}
                name={form.name}
                form={form}
                mode="select"
              />
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </Dialog>
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
                setOpen(true);
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
            <FieldVerifierCard key={index} showBB={ Boolean(fvs.length - 1 !== index)} uid={fv} select={1} />
          ))}
        </div>
      </Paper>
      <div>
        {fvList.map((fv, index) => (
          <Chip
            key={index}
            sx={{ m: "0.3em" }}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                {fv.pfp === null || fv.pfp === undefined || fv.pfp === "" ? (
                  <Avatar sx={{ transform: "scale(0.5)" }}>
                    {String(fv.name).substring(0, 1).toUpperCase()}
                  </Avatar>
                ) : (
                  <Avatar
                    sx={{ transform: "scale(0.65) translateX(-55%)" }}
                    src={fv.pfp}
                  />
                )}
                {fv.name}
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
