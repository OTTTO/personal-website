import { Grid } from "@mui/material";
import { BSTNode } from "./BSTNode";

export function BSTChildren({ left = undefined, right = undefined, height }) {
  const justify = (left, right) => {
    if (left && right) return "center";
    else if (left) return "flex-start";
    else if (right) return "flex-end";
    else return "";
  };
  let gap = ".5rem";
  if (height === 1) gap = "6.5rem";
  if (height === 2) gap = "2.5rem";
  return (
    <Grid
      display="flex"
      gap={gap}
      minWidth="3rem"
      flexDirection="row"
      justifyContent={justify(left, right)}
    >
      <BSTNode data={left} />
      <BSTNode data={right} />
    </Grid>
  );
}
