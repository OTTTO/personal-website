import { Typography } from "@mui/material";

export function PageButtonText({ text }) {
  return (
    <Typography>
      {text.split(" ").map((word) => (
        <p style={{ margin: 0 }}>{word}</p>
      ))}
    </Typography>
  );
}
