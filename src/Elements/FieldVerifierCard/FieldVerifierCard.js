import { Info, InfoOutlined } from "@mui/icons-material";
import { Avatar, Button, Grid } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../Firebase/Firebase";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";
import { getUrl } from "../../Utils/StorageMethods";
import "./FieldVerifierCard.css";

const FieldVerifierCard = (props) => {
  const [fv, setFv] = useState({});
  const navigate = useNavigate();
  const {getFv} = useDraftAssignmentContext();
  const [pfp, setPfp] = useState();
  const getFvData = async () => {
    await getDoc(doc(database, "field_verifier", props.uid)).then(async (snapshot) => {
      setFv(snapshot.data() ?? {});
      let pfpUrl = snapshot.data().profile_picture;
      if (pfpUrl !== undefined && pfpUrl !== null && pfpUrl !== '') {
        await getUrl(pfpUrl).then(url => {
          setPfp(url);
        });
      }
    });
  }
  useEffect(() => {
    getFvData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
        <div style={{
          width: '100%',
          minWidth: '650px'
        }}>
            <Grid container style={{
              margin: '0.6em 0em',
              fontSize: '14px',
              color: 'gray',
              fontFamily: 'Source Serif Pro, serif'
            }}>
              <Grid item sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}} xs={1}>
                {pfp === null || pfp === undefined || pfp === '' ? <Avatar>
                  {String(fv.name).substring(0, 1).toUpperCase()}
                </Avatar> : <Avatar src={pfp}/>}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={2}>
                {fv.id}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={3} >
                {fv.name ?? ''}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={3} >
                {fv.phone ?? 8768715527}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={3}>
              <Button size="small" variant="outlined" sx={{
                color: 'black',
                borderRadius: '17px',
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '0.5em 1.3em 0.5em 0.8em',
                border: '1.3px solid #e0e0e0',
                '&:hover': {
                  border: '1.3px solid black',
                  color: 'white',
                  bgcolor: 'black'
                }
              }} onClick={() => {
                navigate('/dashboard/fieldVerifier/' + props.uid, {state: {mode: 'view'}});
              }}>
                <InfoOutlined sx={{
                  transform: 'scale(0.8)',
                  marginRight: '0.2em'
                }} fontSize="small"/>
                View</Button>
              <div style={{margin: '0.3em'}}></div>
              {props.select === 1 ? <Button size="xsall" onClick={() => {
                getFv(props.uid);
                navigate("/dashboard/assignment/create");
              }} variant="contained">Choose</Button> : null}
              </Grid>
        </Grid>
        <hr style={{margin: '0.3em 0.5em', border: '0.2px solid #ededed'}}/></div>

    );
}

export default FieldVerifierCard;