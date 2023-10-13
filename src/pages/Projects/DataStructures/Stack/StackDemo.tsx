import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

export function StackDemo({}) {
  const [stack, setStack] = useState([]);
  const getRandomInt = () => Math.floor(Math.random() * 100);
  const [nextData, setNextData] = useState(getRandomInt());
  const maxStackHeight = 10;

  const push = () => {
    if (stack.length < maxStackHeight) {
      const stackCopy = stack;
      stackCopy.push(nextData);
      setStack(stackCopy);
      setNextData(getRandomInt());
    }
  };

  const pop = () => {
    if (stack.length > 0) setStack(stack.slice(0, -1));
  };

  return (
    <Grid margin="1rem auto 1rem" textAlign="center">
      <Typography fontWeight="bold"> STACK DEMO</Typography>

      <Button onClick={push}>
        <Typography
          fontWeight="bold"
          sx={{
            textDecoration:
              stack.length >= maxStackHeight ? "line-through" : "",
          }}
        >
          push({nextData})
        </Typography>
      </Button>
      <Grid
        height="18rem"
        width="3rem"
        margin="0 auto"
        display="flex"
        direction="column"
        justifyContent="flex-end"
        borderRadius="5px"
        overflow="scroll"
        sx={{ backgroundColor: "black", opacity: 0.9 }}
      >
        {[]
          .concat(stack)
          .reverse()
          .map((el) => {
            return (
              <Grid
                width="2rem"
                margin="0 auto .1rem"
                textAlign="center"
                border="1px solid red"
                borderRadius="3px"
                sx={{ backgroundColor: "white" }}
              >
                {el}
              </Grid>
            );
          })}
      </Grid>
      <Button onClick={pop}>
        <Typography fontWeight="bold">pop()</Typography>
      </Button>
    </Grid>
  );
}
