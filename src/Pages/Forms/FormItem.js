import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDraftAssignmentContext } from "../../Providers/DraftAssignmentProvider";
import { useFormBuilderContext } from "../../Providers/FormBuilderProvider";


const FormItem = (props) => {

    const navigate = useNavigate();
    const {setForm} = useDraftAssignmentContext();

    const {dispatch} = useFormBuilderContext();

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
            <Box sx={{width: '30%'}}>
                {props.id}
            </Box>
            <Box sx={{width: '40%'}}>
                {props.name}
            </Box>
            <Box sx={{width: '10%'}}>{
                props.mode === "select" ?
                <Button variant="contained" size='small' onClick={() => {
                    setForm(props.form);
                    navigate("/dashboard/assignment/create");
                }}>Choose</Button> : (<div><Button variant="contained" size='small' onClick={() => {
                    dispatch({type: 'loadForm', payload: props.form});
                    navigate('/dashboard/formBuilderPage', {state: {mode: 'edit'}})
                }}>Edit</Button>
                  <Button variant='contained' size='small'
                    sx={{backgroundColor: 'red',
                      '&:hover': {
                        backgroundColor: 'darkred'
                      }
                    }}>Delete</Button>
                </div>)}
            </Box>
        </Paper>
    </div>);
}

export default FormItem;