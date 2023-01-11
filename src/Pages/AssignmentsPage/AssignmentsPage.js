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
        <Paper elevation={0} sx={{
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
                        <Grid item md={2} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{color: 'gray', fontWeight: 'bold'}}>
                                ID
                            </div>
                        </Grid>
                        <Grid item md={2} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{color: 'gray', fontWeight: 'bold'}}>
                                Type
                            </div>
                        </Grid>

                        <Grid item md={4} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{color: 'gray', fontWeight: 'bold'}}>
                                Name
                            </div>
                        </Grid>

                        <Grid item md={1} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{color: 'gray', fontWeight: 'bold'}}>
                                Status
                            </div>
                        </Grid>
                        
                        <Grid item md={3} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{color: 'gray', fontWeight: 'bold'}}>
                                Action
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                <hr style={{width: '93%', margin: '0 auto 0.15em auto', border: '0.6px solid #dedede'}}/>
        {assignments.map((assignment) => {
            return (<div key={assignment.id}>
                <Paper elevation={0} sx={{
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
                        <Grid item md={2} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{marginLeft: '1.7em', fontFamily: 'Source Serif Pro, serif'}}>
                                {assignment.id}
                            </div>
                        </Grid>
                        <Grid item md={2} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{marginLeft: '1.7em', fontFamily: 'Source Serif Pro, serif'}}>
                                {assignment.document_type}
                            </div>
                        </Grid>

                        <Grid item md={4} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{marginLeft: '1.7em', fontFamily: 'Source Serif Pro, serif'}}>
                                <FvName uid={assignment.assigned_to}/>
                            </div>
                        </Grid>

                        <Grid item md={1} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{marginLeft: '1.7em', fontFamily: 'Source Serif Pro, serif'}}>
                                {assignment.status}
                            </div>
                        </Grid>
                        
                        <Grid item md={3} sx={{
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
                <hr style={{width: '93%', margin: '0 auto 0.15em auto', border: '0.6px solid #dedede'}}/>
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
    });
    return (<div>
        {name}
    </div>)
}

export default AssignmentsPage;