import { Button, Grid, Paper } from "@mui/material";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { database } from "../../Firebase/Firebase";

const AssignmentsPage = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database,
          "assignments"), snapshot => {
            let data = [];
            snapshot.docs.forEach((doc) => {
                data.push({...doc.data(), id: doc.id});
            })
            setAssignments(data);
          })
        return () => {
            unsubscribe();
        }
    }, []);

    return (<div>
        {assignments.map((assignment) => {
            return (<div key={assignment.id}>
                <Paper variant="outlined" sx={{
                    width: "100%",
                    padding: '0.4em',
                    margin: '1em 0',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={4} md={4}>
                            {assignment.id}
                        </Grid>
                        <Grid item xs={12} sm={12} lg={2} md={2}>
                            {assignment.document_type}
                        </Grid>

                        <Grid item xs={12} sm={12} lg={4} md={4}>
                            <FvName uid={assignment.assigned_to}/>
                        </Grid>
                        
                        <Grid item xs={12} sm={12} lg={2} md={2}>
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