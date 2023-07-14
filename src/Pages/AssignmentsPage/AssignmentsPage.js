import { Button, Grid, Paper } from "@mui/material";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { database } from "../../Firebase/Firebase";
import { useAuthContext } from "../../Providers/AuthProvider";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const AssignmentsPage = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const { user } = useAuthContext();
    let unsubscribe = () => { };

    let status1 = '';

    const handleChange = async (e) => {
        status1 = e.target.value;
        unsubscribe();
        getAssignments()
    }

    const getAssignments = () => {
        let q;
        if (status1) {
            q = query(collection(database,
                "agency/" + user.uid, "assignments"), where("status", "==", status1))
        } else {
            q = query(collection(database,
                "agency/" + user.uid, "assignments"))
        }
        if (user && user.uid !== undefined) {
            unsubscribe = onSnapshot(q, snapshot => {
                let data = [];
                snapshot.docs.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id });
                });
                setAssignments(data);
            });
        }
    }


    useEffect(() => {
        getAssignments()
    }, [user]);

    return (<div>

        <Paper elevation={0}>
            <div style={{ display: 'flex', justifyContent: "end", padding: "0 10px 20px 10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    Filter By :
                </div>

                <div>
                    <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
                        <InputLabel id="demo-simple-select-label">Select status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="select tatus"
                            onChange={handleChange}
                        >
                            <MenuItem value={''}>All</MenuItem>
                            <MenuItem value={'assigned'}>Assigned</MenuItem>
                            <MenuItem value={'in_progress'}>In Progress</MenuItem>
                            <MenuItem value={'submitted'}>Submitted</MenuItem>
                            <MenuItem value={'approved'}>Approved</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </Paper>


        <TableContainer component={Paper} elevation={3}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: "800" }}>ID</TableCell>
                        <TableCell align="center" style={{ fontWeight: "800" }}>Type</TableCell>
                        <TableCell align="center" style={{ fontWeight: "800" }}>Name</TableCell>
                        <TableCell align="center" style={{ fontWeight: "800" }}>Status</TableCell>
                        <TableCell align="center" style={{ fontWeight: "800" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignments.map((assignment) => {
                        return (
                            <TableRow
                                key={assignment.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {assignment.id}
                                </TableCell>
                                <TableCell align="center"> {assignment.document_type}</TableCell>
                                <TableCell align="center">  {assignment.assigned_to}</TableCell>
                                <TableCell align="center"> {assignment.status}</TableCell>
                                <TableCell align="center">
                                    <Button size='small' variant="contained" onClick={() => {
                                        navigate('/dashboard/assignment/' + assignment.id);
                                    }}>View</Button>
                                </TableCell>
                            </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>

    </div >)

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