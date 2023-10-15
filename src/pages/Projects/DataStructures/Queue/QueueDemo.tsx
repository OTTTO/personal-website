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

export function QueueDemo() {
  const [queue, setQueue] = useState([]);
  const [nextData, setNextData] = useState(getRandomInt(100));
  const maxQueueLength = 11;

  const enqueue = () => {
    if (queue.length < maxQueueLength) {
      const queueCopy = [...queue];
      queueCopy.unshift(nextData);
      setQueue(queueCopy);
      setNextData(getRandomInt(100));
    }
  };

  const deque = () => {
    if (queue.length > 0) setQueue(queue.slice(0, -1));
  };

  return (
    <Grid margin="1rem auto 1rem" textAlign="center">
      <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
        QUEUE DEMO
      </Typography>
      <Grid
        height="3rem"
        width="16rem"
        margin="0 auto"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        borderRadius="5px"
        sx={{ backgroundColor: "black", opacity: 0.9 }}
      >
        {[].concat(queue).map((el, idx) => {
          return (
            <Grid
              width="1.5rem"
              marginLeft=".1rem"
              marginRight={idx === queue.length - 1 ? ".1rem" : "0"}
              textAlign="center"
              border="1px solid red"
              borderRadius="3px"
              sx={{ backgroundColor: idx === 0 ? "yellowgreen" : "white" }}
            >
              {el}
            </Grid>
          );
        })}
      </Grid>
      <OperationButton
        onClick={enqueue}
        disabled={isListMaxLength(queue, maxQueueLength)}
        textDecoration={textDecorationMaxLength(queue, maxQueueLength)}
        text={`append(${nextData})`}
      />
      <OperationButton
        disabled={isListEmpty(queue)}
        onClick={deque}
        textDecoration={textDecorationEmpty(queue)}
        text="deque()"
      />
    </Grid>
  );
}
