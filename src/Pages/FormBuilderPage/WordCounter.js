import { MenuItem, Select } from "@mui/material";
import { useFormBuilderContext } from "../../Providers/FormBuilderProvider";


const WordCounter = (props) => {

    const {state, dispatch} = useFormBuilderContext();

    const wordCount = [
      20, 50, 100, 300, 500 
    ];

    return (<div style={{
      padding: '0.7em 0'
    }}>
      <Select size="small" label="Number of Words" value={state.pages[props.page_id].fields[props.field_id].length ?? 10}
      onChange={(val) => {
        dispatch({type: 'changeNoOfWords', payload: {page_id: props.page_id, field_id: props.field_id, length: val.target.value}})
      }}>
        {wordCount.map((count, index) => (
          <MenuItem key={index} value={count}>
            {count}
        </MenuItem>))}
      </Select>
    </div>);
}

export default WordCounter;