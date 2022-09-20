import { Box, Card } from "@mui/material";

const TemplateItem = (props) => {
    return (<Card sx={{
        '&:hover': {
            backgroundColor: 'whitesmoke'
        },
        cursor: 'pointer',
        display: 'flex',
        border: '1px solid grey',
        borderRadius: '13px',
        alignItems: 'center',
        height: '150px',}} variant="outlined">
            <Box sx={{width: '100%', display: 'block'}}>
                <Box sx={{width: '100%', display: 'block', textAlign: 'center'}}>
                    {props.temp.name}
                </Box>
                <Box sx={{width: '100%', display: 'block', textAlign: 'center'}}>
                    {props.temp.createdBy}
                </Box>    
            </Box>
            
    </Card>)
}

export default TemplateItem;