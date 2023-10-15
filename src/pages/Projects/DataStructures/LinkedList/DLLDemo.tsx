import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { getRandomInt } from "utils/utils";

function DLLOperation({ onClick, textDecoration, text }) {
  return (
    <Button onClick={onClick}>
      <Typography fontWeight="bold" sx={{ textDecoration }}>
        {text}
      </Typography>
    </Button>
  );
}

function DLLDescription({ backgroundColor, text }) {
  return (
    <>
      <Grid
        width="1.5rem"
        border="1px solid black"
        borderRadius="3px"
        sx={{ backgroundColor }}
      ></Grid>
      <Typography
        fontWeight="bold"
        // sx={{ textDecoration: "underline" }}
        marginLeft=".5rem"
        marginRight=".5rem"
      >
        {text}
      </Typography>
    </>
  );
}

export function DLLDemo() {
  const [linkedList, setLinkedList] = useState([]);
  const [nextData, setNextData] = useState(getRandomInt(100));
  const [nextBefore, setNextBefore] = useState(getRandomInt(linkedList.length));
  const [nextAfter, setNextAfter] = useState(getRandomInt(linkedList.length));
  const [nextRemove, setNextRemove] = useState(getRandomInt(linkedList.length));
  const [highlightIdx, setHighlightIdx] = useState(0);
  const maxListLength = 10;

  const setData = (ll, idx) => {
    setLinkedList(ll);
    setNextData(getRandomInt(100));
    setNextRemove(getRandomInt(ll.length));
    setNextBefore(getRandomInt(ll.length));
    setNextAfter(getRandomInt(ll.length));
    setHighlightIdx(idx);
  };

  const prepend = () => {
    if (linkedList.length < maxListLength) {
      const llCopy = [...linkedList];
      llCopy.unshift(nextData);
      setData(llCopy, 0);
    }
  };

  const insertBefore = () => {
    if (linkedList.length < maxListLength) {
      const llCopy = [...linkedList];
      llCopy.splice(nextBefore, 0, nextData);
      setData(llCopy, nextBefore);
    }
  };

  const insertAfter = () => {
    if (linkedList.length < maxListLength) {
      const llCopy = [...linkedList];
      llCopy.splice(nextAfter + 1, 0, nextData);
      setData(llCopy, nextAfter + 1);
    }
  };

  const append = () => {
    if (linkedList.length < maxListLength) {
      const llCopy = [...linkedList];
      llCopy.push(nextData);
      setData(llCopy, llCopy.length - 1);
    }
  };

  const remove = (idx) => {
    if (linkedList.length > 0) {
      const llCopy = [...linkedList];
      console.log("rem idx", idx);
      llCopy.splice(idx, 1);
      setData(llCopy, undefined);
    }
  };

  const textDecorationMaxLength =
    linkedList.length >= maxListLength ? "line-through" : "";
  const textDecorationEmpty = linkedList.length <= 0 ? "line-through" : "";
  const background = (idx) =>
    idx === highlightIdx && idx === nextRemove
      ? "linear-gradient(90deg, greenyellow, #ff4d00)"
      : idx === highlightIdx
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
        {" "}
        DOUBLY LINKED LIST DEMO
      </Typography>
      <Grid display="flex" flexDirection="row" margin=".2rem 0 .5rem">
        <DLLDescription backgroundColor="greenyellow" text="ADDED" />
        <DLLDescription backgroundColor="#ff4d00" text="TO REMOVE" />
      </Grid>
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
            <Grid display="flex" flexDirection="column" alignItems="flex-start">
              <Typography color="white" marginLeft=".6rem">
                {idx}
              </Typography>
              <Grid
                key={`node_${idx}`}
                width="1.5rem"
                marginBottom=".1rem"
                marginLeft=".1rem"
                marginRight={idx === linkedList.length - 1 ? ".1rem" : "0"}
                textAlign="center"
                border="1px solid red"
                borderRadius="3px"
                sx={{ background: background(idx) }}
              >
                {el}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        display="inline-flex"
        flexDirection="column"
        alignItems="center"
        marginTop=".5rem"
      >
        <DLLOperation
          onClick={prepend}
          textDecoration={textDecorationMaxLength}
          text={`prepend(${nextData})`}
        />
        <DLLOperation
          onClick={insertBefore}
          textDecoration={textDecorationMaxLength}
          text={`insertBefore(${nextBefore},${nextData})`}
        />
        <DLLOperation
          onClick={append}
          textDecoration={textDecorationMaxLength}
          text={`append(${nextData})`}
        />
        <DLLOperation
          onClick={insertAfter}
          textDecoration={textDecorationMaxLength}
          text={`insertAfter(${nextAfter},${nextData})`}
        />
        <DLLOperation
          onClick={() => remove(nextRemove)}
          textDecoration={textDecorationEmpty}
          text={`remove(${nextRemove})`}
        />
      </Grid>
    </Grid>
  );
}
