import { Box, Button, Paper } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../Firebase/Firebase";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";
import "./FieldVerifierCard.css";

const FieldVerifierCard = (props) => {
  
  const [fv, setFv] = useState({});
  const navigate = useNavigate();
  const {getFv} = useDraftAssignmentContext();

  const getFvData = async () => {
    await getDoc(doc(database, "field_verifier", props.uid)).then((snapshot) => {
      setFv(snapshot.data() ?? {});
    });
  }

  useEffect(() => {
    getFvData();
  });

    return (
        <div key={props.key} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6em"
        }}>
            <Paper elevation={0} variant="outlined" sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "96%",
                padding: "0.7em",
                '&:hover': {
                    backgroundColor: "whitesmoke"
                }
            }}>
              <Box className="OverflowTextContainer" sx={{width: "20%"}}>
                {props.uid}
              </Box>

              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                {fv.name ?? ''}
              </Box>
              
              <Box className="OverflowTextContainer" sx={{width: "20%"}}>
                {fv.phone ?? 8768715527}
              </Box>
              <Button size="small" variant="outlined" onClick={() => {
                navigate('/dashboard/fieldVerifier/' + props.uid);
              }}>View</Button>
              {props.select === 1 ? <Button size="small" onClick={() => {
                getFv(props.uid);
                navigate("/dashboard/assignment/create");
              }} variant="contained">Choose</Button> : null}
            </Paper>
        </div>
    );
}

export default FieldVerifierCard;