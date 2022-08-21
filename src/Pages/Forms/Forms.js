import { Add } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useFormsContext } from "../../Providers/FormsProvider";
import FormItem from "./FormItem";


const Forms = () => {

    const {forms} = useFormsContext();

    return (<div>
      {forms.map((form, index) => (
      <FormItem key={index} id={form.id}/>))}
      <Tooltip title="Create new Form" arrow>
        <IconButton sx={{
          border: '1px solid grey'
        }} onClick={() => {
  
        }}>
          <Add />
        </IconButton>
      </Tooltip>
      
    </div>);
}


export default Forms;