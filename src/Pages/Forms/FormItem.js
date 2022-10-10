import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database } from "../../Firebase/Firebase";
import { useAuthContext } from "../../Providers/AuthProvider";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";
import { useFormBuilderContext } from "../../Providers/FormBuilderProvider";


const FormItem = (props) => {

    const navigate = useNavigate();
    const {setForm} = useDraftAssignmentContext();
    const {user} = useAuthContext();
    const {dispatch} = useFormBuilderContext();

    const deleteForm = async () => {
        await deleteDoc(doc(database, "agency/" + user.uid, "forms/"  + props.id));
        await axios.delete('https://veridocs.pythonanywhere.com/api/form/delete/' + props.id)
        .then(res => {
            console.log(res);
        });
    }

    return (<div>
        <Paper variant="outlined" sx={{
            height: '50px',
            margin: '0.5em',
            width: '100%',
            display: 'inline-flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
                backgroundColor: 'whitesmoke'
            }
        }}>
            <Box sx={{dispaly: 'flex', justifyContent: 'center', alignItems: 'center', width: '30%'}}>
                {props.id}
            </Box>
            <Box sx={{width: '40%'}}>
                {props.name}
            </Box>
            <Box sx={{display: 'inline', width: '30%'}}>{
                props.mode === "select" ?
                <Button variant="contained" sx={{
                    display: 'inline'
                }} size='small' onClick={() => {
                    setForm(props.form);
                    navigate("/dashboard/assignment/create");
                }}>Choose</Button> : (<div style={{display: 'inline'}}><Button variant="contained" size='small' sx={{
                    display: 'inline',
                    margin: '0 0.4em',
                }} onClick={() => {
                    dispatch({type: 'loadForm', payload: props.form});
                    navigate('/dashboard/formBuilderPage', {state: {mode: 'edit'}})
                }}>Edit</Button>
                    <Button variant='contained' onClick={() => {
                        deleteForm();
                    }} size='small' sx={{
                        margin: '0 0.4em',
                        backgroundColor: 'red',
                        display: 'inline',
                        '&:hover': {
                          backgroundColor: 'darkred'
                        }}}>Delete</Button>
                </div>)}
            </Box>
        </Paper>
    </div>);
}

export default FormItem;