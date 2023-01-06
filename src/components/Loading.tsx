import { Grid } from "@mui/material";
import loadingGif from "images/loading.gif";

export function Loading() {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", backgroundColor: "black" }}
    >
      <img alt="Loading" src={loadingGif} width="50%"></img>
    </Grid>
  );
}
