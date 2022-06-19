import { Box, Button, Paper } from "@mui/material";
import "./FieldVerifierCard.css";

const FieldVerifierCard = (props) => {
    return (
        <div key={props.key} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6em"
        }}>
            <Paper elevation={0} variant="outlined" sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "96%",
                padding: "0.7em",
                '&:hover': {
                    backgroundColor: "whitesmoke"
                }
            }}>
              <Box className="OverflowTextContainer" sx={{width: "20%"}}>
                {props.uid}
              </Box>

              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                {props.name}
              </Box>
              
              <Box className="OverflowTextContainer" sx={{width: "20%"}}>
                +91-{props.number ?? 8768715527}
              </Box>
              <Button size="small" variant="outlined">View</Button>
              {props.select === 1 ? <Button size="small" variant="contained">Choose</Button> : null}
            </Paper>
        </div>
    );
}

export default FieldVerifierCard;