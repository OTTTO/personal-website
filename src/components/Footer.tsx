import { Grid, Typography } from "@mui/material";

export function Footer({ backgroundColor }) {
  return (
    <Grid
      sx={{
        backgroundColor: { backgroundColor },
        padding: "0rem 0rem 1rem 1rem",
      }}
    >
      <Grid item>
        <Typography
          color={backgroundColor === "white" ? "black" : "white"}
          padding="1rem 1rem 0rem 0rem"
          textAlign="right"
        >
          © Dylan Beckwith 2022
        </Typography>
      </Grid>
    </Grid>
  );
}
