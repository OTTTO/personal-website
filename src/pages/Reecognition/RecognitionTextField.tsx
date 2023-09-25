import { TextField } from "@mui/material";

export function RecognitionTextField({
  item,
  property,
  idx,
  label,
  handleTextChange,
  multiline = false,
}) {
  return (
    <TextField
      multiline={multiline}
      fullWidth
      value={item[property] || ""}
      onChange={(e) => handleTextChange(e, property, idx)}
      label={label}
      sx={{ margin: "1rem 0rem" }}
    ></TextField>
  );
}
