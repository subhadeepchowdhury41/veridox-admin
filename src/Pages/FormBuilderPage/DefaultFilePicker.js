import { Button } from "@mui/material";
import { useFormBuilderContext } from "../../Providers/FormBuilderProvider";

const DefaultFilePicker = ({ id, index }) => {
  const { dispatch, state } = useFormBuilderContext();
  return (
    <div>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          margin: "1em 1em 0 0",
          padding: "0.6em",
          borderRadius: "23px",
          borderColor: "#4dc3c8",
          "&:hover": {
            borderColor: "#349ca0",
          },
        }}
        component="label"
      >
        {state.pages[id].fields[index].value === undefined ? (
          "Browse Files"
        ) : (
          <div
            style={{
              maxWidth: "200px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {state.pages[id].fields[index].value}
          </div>
        )}
        <input
          accept={state.pages[id].fields[index].extensions?.map((ext) => ext)}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({
              type: "changeValue",
              payload: {
                page_id: id,
                field_id: index,
                value: e.target.files[0].name,
              },
            });
            console.log(e.target.files[0].name);
          }}
          hidden
          type="file"
        />
      </Button>
    </div>
  );
};

export default DefaultFilePicker;
