import { Grid } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners";
import { database } from "../../Firebase/Firebase";

const FieldVerifierDetailsPage = () => {
    const {id} = useParams();

    const [fv, setFv] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getFVDetails = async () => {
        setIsLoading(true);
        await getDoc(doc(database, "field_verifier", id)).then((snapshot) => {
            setFv({...snapshot.data()});
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getFVDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (!isLoading ? <div>
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
          <div style={{width: '100%', justifyContent: 'center',
          overflow: 'hidden',
           textOverflow: 'ellipsis',
           display: 'flex', margin: '0.5em'}}>
            {fv.name}
          </div>
        </Grid>

        <Grid item lg={6} style={{display: 'flex', width: '100%', borderBottom: '1px solid grey', }}>
        <div style={{color: 'grey', height: '100%', backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '25%'}}>
            ID
          </div>
          <div style={{justifyContent: 'center', display: 'flex',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: '0.5em', width: '100%'}}>
            {id}
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
            Email Address
          </div>
          <div style={{width: '100%', justifyContent: 'center', display: 'flex', margin: '0.5em'}}>
            {fv.email}
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
            Phone
          </div>
          <div style={{display: 'flex', justifyContent: 'center', margin: '0.5em', width: '100%'}}>
            {fv.phone}
          </div>
        </Grid>
        
      </Grid>
    </div> : <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
    }}><ClipLoader loading={true} size={30}/></div> );
}

export default FieldVerifierDetailsPage;