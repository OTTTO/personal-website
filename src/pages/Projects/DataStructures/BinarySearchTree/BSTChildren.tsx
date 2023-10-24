import { Grid } from "@mui/material";
import { BSTNode } from "./BSTNode";

export function BSTChildren({
  left = undefined,
  right = undefined,
  height,
  group,
  removeData,
  justAdded,
  phaseNode,
}) {
  const justify = (left, right) => {
    if (left && right) return "center";
    else if (left) return "flex-start";
    else if (right) return "flex-end";
    else return "";
  };
  let gap = ".5rem";
  if (height === 1) gap = "6.5rem";
  if (height === 2) gap = "2.5rem";

  const leftNode = Math.pow(2, height) + 2 * group - 1;
  const rightNode = leftNode + 1;

  return (
    <Grid
      display="flex"
      gap={gap}
      minWidth="3rem"
      flexDirection="row"
      justifyContent={justify(left, right)}
    >
      <BSTNode
        data={left}
        node={leftNode}
        removeData={removeData}
        justAdded={justAdded}
        phaseNode={phaseNode}
      />
      <BSTNode
        data={right}
        node={rightNode}
        removeData={removeData}
        justAdded={justAdded}
        phaseNode={phaseNode}
      />
    </Grid>
  );
}
