import { Grid, Typography } from "@mui/material";
import { OperationButton } from "components/OperationButton";
import { OperationDescription } from "components/OperationDescription";
import { useState } from "react";
import {
  getRandomInt,
  isListEmpty,
  isListMaxLength,
  textDecorationEmpty,
  textDecorationMaxLength,
} from "utils/utils";

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

  const background = (idx) =>
    idx === linkedList.length - 1 && idx === nextRemove
      ? "linear-gradient(90deg, greenyellow, #ff4d00)"
      : idx === linkedList.length - 1
      ? "greenyellow"
      : idx === nextRemove
      ? "#ff4d00"
      : "white";

  return (
    <Grid
      margin="1rem auto 1rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
        LINKED LIST DEMO
      </Typography>
      <Grid display="flex" flexDirection="row" margin=".2rem 0 .5rem">
        <OperationDescription backgroundColor="greenyellow" text="ADDED" />
        <OperationDescription backgroundColor="#ff4d00" text="TO REMOVE" />
      </Grid>
      <Grid
        height="3rem"
        width="16rem"
        margin=".5rem auto 0"
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
              marginRight={idx === linkedList.length - 1 ? ".1rem" : "0"}
              marginLeft=".1rem"
              textAlign="center"
              border="1px solid red"
              borderRadius="3px"
              sx={{
                background: background(idx),
              }}
            >
              {el}
              {"->"}
            </Grid>
          );
        })}
      </Grid>
      <OperationButton
        onClick={append}
        disabled={isListMaxLength(linkedList, maxListLength)}
        textDecoration={textDecorationMaxLength(linkedList, maxListLength)}
        text={`append(${nextData})`}
      />
      <OperationButton
        onClick={() => remove(nextRemove)}
        disabled={isListEmpty(linkedList)}
        textDecoration={textDecorationEmpty(linkedList)}
        text={`remove(${nextRemove})`}
      />
    </Grid>
  );
}
