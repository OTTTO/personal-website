import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { getRandomInt } from "utils/utils";

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
      <Typography fontWeight="bold"> QUEUE DEMO</Typography>

      <Button onClick={enqueue}>
        <Typography
          fontWeight="bold"
          sx={{
            textDecoration:
              queue.length >= maxQueueLength ? "line-through" : "",
          }}
        >
          enqueue({nextData})
        </Typography>
      </Button>
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
              sx={{ backgroundColor: "white" }}
            >
              {el}
            </Grid>
          );
        })}
      </Grid>
      <Button onClick={deque}>
        <Typography fontWeight="bold">deque()</Typography>
      </Button>
    </Grid>
  );
}
