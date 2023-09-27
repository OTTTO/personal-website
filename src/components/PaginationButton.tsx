import { Button } from "@mui/material";

export function PaginationButton({ text, background, onClick = () => {} }) {
  return (
    <Button
      sx={{
        background: background,
        border: "2px solid black",
        borderRadius: "10px",
        marginRight: "0.5rem",
        padding: 0,
        minWidth: "1.5rem",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
