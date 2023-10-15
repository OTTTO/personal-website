import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { getRandomInt } from "utils/utils";

export function SLLDemo() {
  const [linkedList, setLinkedList] = useState([]);
  const [nextData, setNextData] = useState(getRandomInt(100));
  const [nextRemove, setNextRemove] = useState(getRandomInt(linkedList.length));
  const maxListLength = 6;

  const append = () => {
    if (linkedList.length < maxListLength) {
      const llCopy = [...linkedList];
      llCopy.push(nextData);
      setLinkedList(llCopy);
      setNextData(getRandomInt(100));
      setNextRemove(getRandomInt(llCopy.length));
    }
  };

  const remove = (idx) => {
    if (linkedList.length > 0) {
      const llCopy = [...linkedList];
      llCopy.splice(idx, 1);
      setLinkedList(llCopy);
      setNextRemove(getRandomInt(llCopy.length));
    }
  };

  return (
    <Grid margin="1rem auto 1rem" textAlign="center">
      <Typography fontWeight="bold"> LINKED LIST DEMO</Typography>

      <Button onClick={append}>
        <Typography
          fontWeight="bold"
          sx={{
            textDecoration:
              linkedList.length >= maxListLength ? "line-through" : "",
          }}
        >
          append({nextData})
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
        {[].concat(linkedList).map((el, idx) => {
          return (
            <Grid
              key={`node_${idx}`}
              width="3rem"
              marginLeft=".1rem"
              marginRight={idx === linkedList.length - 1 ? ".1rem" : "0"}
              textAlign="center"
              border="1px solid red"
              borderRadius="3px"
              sx={{
                backgroundColor: idx === nextRemove ? "greenyellow" : "white",
              }}
            >
              {el}
              {"->"}
            </Grid>
          );
        })}
      </Grid>
      <Button onClick={() => remove(nextRemove)}>
        <Typography
          fontWeight="bold"
          sx={{
            textDecoration: linkedList.length <= 0 ? "line-through" : "",
          }}
        >
          remove({nextRemove})
        </Typography>
      </Button>
    </Grid>
  );
}
