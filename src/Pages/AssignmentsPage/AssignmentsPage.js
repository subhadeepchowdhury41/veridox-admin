import { Button, Grid, Paper } from "@mui/material";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { database } from "../../Firebase/Firebase";
import { useAuthContext } from "../../Providers/AuthProvider";

const AssignmentsPage = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const {user} = useAuthContext();
    
    useEffect(() => {
        let unsubscribe = () => {};
        if (user && user.uid !== undefined) {
            unsubscribe = onSnapshot(collection(database,
                "agency/" + user.uid, "assignments"), snapshot => {
                  let data = [];
                  snapshot.docs.forEach((doc) => {
                      data.push({...doc.data(), id: doc.id});
                  });
                  setAssignments(data);
                });
        }
        return () => {
            unsubscribe();
        }
    }, [user]);

    return (<div>
        {assignments.map((assignment) => {
            return (<div key={assignment.id}>
                <Paper variant="outlined" sx={{
                    width: "100%",
                    padding: '0.4em',
                    margin: '0.3em 0',
                    fontSize: '14px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={4} md={4} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{color: 'gray', fontWeight: 'bold'}}>
                                ID
                            </div>
                            <div style={{marginLeft: '1.7em', fontFamily: 'Source Serif Pro, serif'}}>
                                {assignment.id}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={2} md={2} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{color: 'gray', fontWeight: 'bold'}}>
                                Type
                            </div>
                            <div style={{marginLeft: '1.7em', fontFamily: 'Source Serif Pro, serif'}}>
                                {assignment.document_type}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} lg={4} md={4} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{color: 'gray', fontWeight: 'bold'}}>
                                Name
                            </div>
                            <div style={{marginLeft: '1.7em', fontFamily: 'Source Serif Pro, serif'}}>
                                <FvName uid={assignment.assigned_to}/>
                            </div>
                            
                        </Grid>
                        
                        <Grid item xs={12} sm={12} lg={2} md={2} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Button size='small' variant="contained" onClick={() => {
                                navigate('/dashboard/assignment/' + assignment.id);
                            }}>
                                View
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </div>)
        })}
    </div>)
}

const FvName = (props) => {

    const [name, setName] = useState();

    const getFvName = async () => {
        const snapshot = await getDoc(doc(database, "field_verifier", props.uid));
        setName(snapshot.data().name);
    }

    useEffect(() => {
        getFvName();
    })

    return (<div>
        {name}
    </div>)
}

export default AssignmentsPage;