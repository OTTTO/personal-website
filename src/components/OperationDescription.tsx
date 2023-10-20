import { Grid, Typography } from "@mui/material";

export function OperationDescription({ backgroundColor, text }) {
  return (
    <>
      <Grid
        width="1.5rem"
        maxHeight="1.5rem"
        border="1px solid black"
        borderRadius="3px"
        sx={{ backgroundColor }}
      ></Grid>
      <Typography
        textAlign="left"
        fontWeight="bold"
        marginLeft=".5rem"
        marginRight=".5rem"
      >
        {text}
      </Typography>
    </>
  );
}
