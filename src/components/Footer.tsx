import { Grid, Typography } from "@mui/material";

export function Footer({ backgroundColor, background = undefined }) {
  return (
    <Grid
      sx={{
        backgroundColor,
        background,
        padding: "0rem 0rem 1rem 1rem",
      }}
      borderTop="3px solid white"
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
