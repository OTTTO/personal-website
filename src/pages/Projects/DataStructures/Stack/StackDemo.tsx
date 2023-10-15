import { Grid, Typography } from "@mui/material";
import { OperationButton } from "components/OperationButton";
import { useState } from "react";
import {
  getRandomInt,
  isListEmpty,
  isListMaxLength,
  textDecorationEmpty,
  textDecorationMaxLength,
} from "utils/utils";

export function StackDemo() {
  const [stack, setStack] = useState([]);
  const [nextData, setNextData] = useState(getRandomInt(100));
  const maxStackHeight = 10;

  const push = () => {
    if (stack.length < maxStackHeight) {
      const stackCopy = [...stack];
      stackCopy.push(nextData);
      setStack(stackCopy);
      setNextData(getRandomInt(100));
    }
  };

  const pop = () => {
    if (stack.length > 0) setStack(stack.slice(0, -1));
  };

  return (
    <Grid margin="1rem auto 1rem" textAlign="center">
      <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
        STACK DEMO
      </Typography>
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
          .map((el, idx) => {
            return (
              <Grid
                width="2rem"
                margin="0 auto .1rem"
                textAlign="center"
                border="1px solid red"
                borderRadius="3px"
                sx={{
                  backgroundColor: idx === 0 ? "yellowgreen" : "white",
                }}
              >
                {el}
              </Grid>
            );
          })}
      </Grid>
      <OperationButton
        onClick={push}
        disabled={isListMaxLength(stack, maxStackHeight)}
        textDecoration={textDecorationMaxLength(stack, maxStackHeight)}
        text={`push(${nextData})`}
      />
      <OperationButton
        disabled={isListEmpty(stack)}
        onClick={pop}
        textDecoration={textDecorationEmpty(stack)}
        text="pop()"
      />
    </Grid>
  );
}
