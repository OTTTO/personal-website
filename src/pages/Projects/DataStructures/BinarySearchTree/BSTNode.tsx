import { Grid, Typography } from "@mui/material";

export function BSTNode({ data }) {
  return (
    <Grid>
      <Typography
        border={(data || data === 0) && "1px solid red"}
        borderRadius="30px"
        width="1.3rem"
        sx={{ backgroundColor: "white" }}
      >
        {data}
      </Typography>
    </Grid>
  );
}
