import { Grid, Typography } from "@mui/material";

export function BSTNode({ data, justAdded, removeData }) {
  const background = () =>
    data === justAdded && data === removeData
      ? "linear-gradient(90deg, greenyellow, #ff4d00)"
      : data === justAdded
      ? "greenyellow"
      : data === removeData
      ? "#ff4d00"
      : "white";
  return (
    <Grid>
      <Typography
        border={(data || data === 0) && "1px solid red"}
        borderRadius="30px"
        width="1.3rem"
        sx={{ background: background() }}
      >
        {data}
      </Typography>
    </Grid>
  );
}
