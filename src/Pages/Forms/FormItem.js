import { Button, Grid } from "@mui/material";
import axios from "axios";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database } from "../../Firebase/Firebase";
import { useAuthContext } from "../../Providers/AuthProvider";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";
import { useFormBuilderContext } from "../../Providers/FormBuilderProvider";
import { useToastProvider } from "../../Providers/ToastProvider";


const FormItem = (props) => {

    const navigate = useNavigate();
    const {setForm} = useDraftAssignmentContext();
    const {user} = useAuthContext();
    const {dispatch, setMode} = useFormBuilderContext();
    const {showSuccess, showError} = useToastProvider();

    const deleteForm = async () => {
        await deleteDoc(doc(database, "agency/" + user.uid, "forms/"  + props.id)).then(async (res) => {
            await axios.delete('https://veridocs.pythonanywhere.com/api/form/delete/' + props.id)
            .then(res => {
                showSuccess("Successfully Deleted Form " + props.id);
                console.log(res);
            }).catch(err => {
                showError();
            }).catch(err => {
                showError();
            });
        });
    }

    return (<div>
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
            <Grid container >
                <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {props.id}
                </Grid>
                <Grid item xs={4}  sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                    {props.name}
                </Grid>
                <Grid item xs={4}  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {props.mode === "select" ?
                    <Button variant="contained" sx={{
                        display: 'inline'
                    }} size='small' onClick={() => {
                        setForm(props.form);
                        navigate("/dashboard/assignment/create");
                    }}>Choose</Button> : (<div style={{display: 'inline'}}><Button variant="contained" size='small' sx={{
                        display: 'inline',
                        margin: '0 0.4em',
                    }} onClick={() => {
                        setMode('edit');
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
                </Grid>
            </Grid>
        </div>
        <hr style={{width: '95%', margin: '0 auto', border: '0.6px solid #dedede'}}/>
    </div>);
}

export default FormItem;