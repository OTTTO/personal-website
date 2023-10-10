import { Grid, Typography } from "@mui/material";

export function DemoString({ stringArr, index = undefined }) {
  return (
    <Grid
      width="12rem"
      margin="auto auto .5rem"
      textAlign="center"
      display="flex"
      justifyContent="flex-start"
    >
      {stringArr.map((el, idx) => (
        <Typography
          display="inline-block"
          border="1px solid black"
          width="1rem"
          sx={{ backgroundColor: idx === index - 1 ? "#39E75F" : "white" }}
        >
          {el}
        </Typography>
      ))}
    </Grid>
  );
}
