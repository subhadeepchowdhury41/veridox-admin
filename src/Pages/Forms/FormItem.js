import { Paper } from "@mui/material";
import { Box } from "@mui/system";


const FormItem = (props) => {
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
            <Box sx={{width: '30%'}}>
                {props.name}
            </Box>
        </Paper>
    </div>);
}

export default FormItem;