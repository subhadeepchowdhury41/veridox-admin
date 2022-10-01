import { Add } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormsContext } from "../../Providers/FormsProvider";
import FormItem from "./FormItem";

const Forms = () => {
    const {forms} = useFormsContext();

    const navigate = useNavigate();
    const {state } = useLocation();
    
    const {mode} = state;

    return (<div>
      {forms.map((form, index) => (
      <FormItem key={index} id={form.id} name={form.name} form={form} mode={mode}/>))}
      <Tooltip title="Create new Form" arrow>
        <IconButton sx={{
          border: '1px solid grey',
          margin: '0.3em'
        }} onClick={() => {
          navigate('/dashboard/chooseTemplate', {state: {mode: mode}});
        }}>
          <Add />
        </IconButton>
      </Tooltip>
      
    </div>);
}


export default Forms;