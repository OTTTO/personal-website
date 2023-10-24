import { Grid, Typography } from "@mui/material";

export function BSTNode({ data, node, justAdded, removeData, phaseNode }) {
  let background = "white";
  if (data === justAdded && data === removeData)
    background = "linear-gradient(90deg, greenyellow, #ff4d00)";
  else if (data === justAdded) background = "greenyellow";
  else if (data === removeData) background = "#ff4d00";

  let border = "none";
  if (data || data === 0) border = "1px solid red";
  return (
    <Grid>
      <Typography
        border={border}
        borderRadius="30px"
        width="1.3rem"
        sx={{
          background: background,
          boxShadow: phaseNode === node && "0 0 10px white",
        }}
      >
        {data}
      </Typography>
    </Grid>
  );
}
