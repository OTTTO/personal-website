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
      console.log("pre", llCopy);
      setData(llCopy, 0);
    }
  };

  const insertBefore = () => {
    if (linkedList.length > 0 && linkedList.length < maxListLength) {
      const llCopy = [...linkedList];
      llCopy.splice(nextBefore, 0, nextData);
      setData(llCopy, nextBefore);
    }
  };

  const insertAfter = () => {
    if (linkedList.length > 0 && linkedList.length < maxListLength) {
      const llCopy = [...linkedList];
      llCopy.splice(nextAfter + 1, 0, nextData);
      setData(llCopy, nextAfter + 1);
    }
  };

  const append = () => {
    if (linkedList.length < maxListLength) {
      const llCopy = [...linkedList];
      llCopy.push(nextData);
      console.log("app", llCopy);
      setData(llCopy, llCopy.length - 1);
    }
  };

  const remove = (idx) => {
    if (linkedList.length > 0) {
      const llCopy = [...linkedList];
      llCopy.splice(idx, 1);
      setData(llCopy, undefined);
    }
  };

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
        DOUBLY LINKED LIST DEMO
      </Typography>
      <Grid display="flex" flexDirection="row" margin=".2rem 0 .5rem">
        <OperationDescription backgroundColor="greenyellow" text="ADDED" />
        <OperationDescription backgroundColor="#ff4d00" text="TO REMOVE" />
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
        <OperationButton
          onClick={prepend}
          disabled={isListMaxLength(linkedList, maxListLength)}
          textDecoration={textDecorationMaxLength(linkedList, maxListLength)}
          text={`prepend(${nextData})`}
        />
        <OperationButton
          onClick={append}
          disabled={isListMaxLength(linkedList, maxListLength)}
          textDecoration={textDecorationMaxLength(linkedList, maxListLength)}
          text={`append(${nextData})`}
        />
        <OperationButton
          onClick={insertBefore}
          disabled={
            isListMaxLength(linkedList, maxListLength) ||
            isListEmpty(linkedList)
          }
          textDecoration={
            textDecorationMaxLength(linkedList, maxListLength) ||
            textDecorationEmpty(linkedList)
          }
          text={`insertBefore(${nextBefore},${nextData})`}
        />
        <OperationButton
          onClick={insertAfter}
          disabled={
            isListMaxLength(linkedList, maxListLength) ||
            isListEmpty(linkedList)
          }
          textDecoration={
            textDecorationMaxLength(linkedList, maxListLength) ||
            textDecorationEmpty(linkedList)
          }
          text={`insertAfter(${nextAfter},${nextData})`}
        />
        <OperationButton
          onClick={() => remove(nextRemove)}
          disabled={isListEmpty(linkedList)}
          textDecoration={textDecorationEmpty(linkedList)}
          text={`remove(${nextRemove})`}
        />
      </Grid>
    </Grid>
  );
}
