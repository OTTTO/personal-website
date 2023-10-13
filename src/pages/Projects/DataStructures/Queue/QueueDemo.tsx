import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

export function QueueDemo({}) {
  const [queue, setQueue] = useState([]);
  const getRandomInt = () => Math.floor(Math.random() * 100);
  const [nextData, setNextData] = useState(getRandomInt());
  const maxQueueLength = 11;

  const enqueue = () => {
    if (queue.length < maxQueueLength) {
      const queueCopy = queue;
      queueCopy.unshift(nextData);
      setQueue(queueCopy);
      setNextData(getRandomInt());
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
        width="18rem"
        margin="0 auto"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        borderRadius="5px"
        sx={{ backgroundColor: "black", opacity: 0.9 }}
      >
        {[].concat(queue).map((el) => {
          return (
            <Grid
              width="1.5rem"
              marginLeft=".1rem"
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
