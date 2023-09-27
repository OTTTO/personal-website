import { IconButton } from "@mui/material";

export function PaginationChevron({ onClick, disabled, children }) {
  return (
    <IconButton
      sx={{
        marginRight: "0.5rem",
        borderRadius: "10px",
        backgroundColor: "white",
        border: "2px solid black",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </IconButton>
  );
}
