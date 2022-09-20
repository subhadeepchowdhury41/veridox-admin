import { Add } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormsContext } from "../../Providers/FormsProvider";
import FormItem from "./FormItem";


const Forms = () => {

    const {forms} = useFormsContext();

    const navigate = useNavigate();

    return (<div>
      {forms.map((form, index) => (
      <FormItem key={index} id={form.id} name={form.name}/>))}
      <Tooltip title="Create new Form" arrow>
        <IconButton sx={{
          border: '1px solid grey'
        }} onClick={() => {
          navigate('/dashboard/chooseTemplate');
        }}>
          <Add />
        </IconButton>
      </Tooltip>
      
    </div>);
}


export default Forms;