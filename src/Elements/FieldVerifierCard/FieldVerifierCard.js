import { Box, Button } from "@mui/material";
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
        <div>
            <div style={{
                height: '47px',
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '14px',
                color: 'gray',
                fontFamily: 'Source Serif Pro, serif',
                justifyContent: 'center',
            }}>
              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                {props.uid}
              </Box>

              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                {fv.name ?? ''}
              </Box>
              
              <Box className="OverflowTextContainer" sx={{width: "20%"}}>
                {fv.phone ?? 8768715527}
              </Box>
              <Button size="small" variant="outlined" onClick={() => {
                navigate('/dashboard/fieldVerifier/' + props.uid, {state: {mode: ''}});
              }}>View</Button>
              {props.select === 1 ? <Button size="small" onClick={() => {
                getFv(props.uid);
                navigate("/dashboard/assignment/create");
              }} variant="contained">Choose</Button> : null}
            
        </div>
        <hr style={{margin: '0.1em 0', border: '0.2px solid #ededed'}}/></div>

    );
}

export default FieldVerifierCard;