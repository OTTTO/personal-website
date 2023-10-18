import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { getRandomInt } from "utils/utils";

function BSTNode({ data }) {
  return (
    <Grid>
      <Typography
        borderRadius="30px"
        width="1.5rem"
        sx={{ backgroundColor: "white" }}
      >
        {data}
      </Typography>
    </Grid>
  );
}

function BSTChildren({ left = undefined, right = undefined, height }) {
  const justify = (left, right) => {
    if (left && right) return "center";
    else if (left) return "flex-start";
    else if (right) return "flex-end";
    else return "";
  };
  return (
    <Grid
      display="flex"
      gap=".5rem"
      minWidth="3rem"
      flexDirection="row"
      justifyContent={justify(left, right)}
    >
      {left && <BSTNode data={left} />}
      {right && <BSTNode data={right} />}
    </Grid>
  );
}
// height: 0
// nodes per row: 2^h

function BSTRow({ nodes, height }) {
  const getRow = () => {
    let start = 0;
    for (let i = 0; i < height; i++) {
      start += Math.pow(2, i);
    }
    const numNodes = Math.pow(2, height);
    const end = start + numNodes;
    const rowSlice = nodes.slice(start, end);
    console.log("rowSlice", rowSlice);
    const row = [];
    for (let i = 0; i < numNodes; i += 2) {
      const node = { left: undefined, right: undefined };
      if (i < rowSlice.length) node.left = rowSlice[i];
      if (i + 1 < rowSlice.length) node.right = rowSlice[i + 1];
      row.push(node);
    }
    console.log("row", row);
    return row;
  };
  return (
    <Grid
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={height === 2 ? "7rem" : "1rem"}
    >
      <>
        {height === 0 ? (
          <BSTNode data={nodes[0]} />
        ) : (
          getRow().map((el) => (
            <BSTChildren left={el.left} right={el.right} height={height} />
          ))
        )}
      </>
    </Grid>
  );
}

// function BST({ bst, isEmpty }) {
//   return <Grid>{!isEmpty && BSTNode}</Grid>;
// }

export function BSTDemo() {
  const [bst, setBst] = useState([]);
  const [nextData, setNextData] = useState(getRandomInt(100));

  const test = [];
  test[0] = 11;
  test[1] = 9;
  test[2] = 12;
  test[4] = 4;

  const isEmpty = (bst) => {
    return !bst || bst.every((el) => !el);
  };

  // height: 0
  // nodes per row: 2^h
  // left child: 2n + 1
  // right child: 2n + 2

  const insert = () => {
    const bstCopy = [...bst];
    if (isEmpty(bstCopy)) {
      console.log("empty");
      bstCopy[0] = nextData;
    } else {
      for (let i = 0; i <= bstCopy.length; i++) {
        console.log("i", i);
        console.log("next", nextData);
        let leftChild = 2 * i + 1;
        let rightChild = 2 * i + 2;
        if (nextData < bstCopy[i]) {
          console.log("left", leftChild);
          console.log("currLeft", bstCopy[leftChild]);
          if (!bstCopy[leftChild]) {
            bstCopy[leftChild] = nextData;
            break;
          } else {
            i = leftChild - 1;
          }
        }
        if (nextData > bstCopy[i]) {
          console.log("right", rightChild);
          console.log("currRight", bstCopy[rightChild]);
          if (!bstCopy[rightChild]) {
            bstCopy[rightChild] = nextData;
            break;
          } else {
            i = rightChild - 1;
          }
        }
      }
    }
    setBst(bstCopy);
    let randomInt = getRandomInt(100);
    while (exists(randomInt)) {
      console.log("exists", randomInt);
      randomInt = getRandomInt(100);
    }
    setNextData(randomInt);
  };

  const exists = (data) => {
    if (isEmpty(bst)) return false;
    for (let i = 0; i <= bst.length; i++) {
      if (data === bst[i]) return true;
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;
      if (nextData < bst[i]) {
        if (!bst[leftChild]) {
          return false;
        } else {
          i = leftChild;
        }
      }
      if (nextData > bst[i]) {
        if (!bst[rightChild]) {
          return false;
        } else {
          i = rightChild;
        }
      }
    }
  };

  return (
    <>
      <Grid
        display="flex"
        flexDirection="column"
        textAlign="center"
        justifyContent="center"
      >
        <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
          Binary Search Tree Demo
        </Typography>
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding=".5rem"
          sx={{ backgroundColor: "black" }}
        >
          <BSTRow nodes={bst} height={0} />
          <BSTRow nodes={bst} height={1} />
          <BSTRow nodes={bst} height={2} />
          <BSTRow nodes={bst} height={3} />
          {/* <BSTRow height={1}>
            <BSTChildren left={1} right={2} />
          </BSTRow>
          <BSTRow height={2}>
            <BSTChildren left={3} right={4} />
            <BSTChildren left={5} right={6} />
          </BSTRow>
          <BSTRow height={3}>
            <BSTChildren left={7} right={8} />
            <BSTChildren left={9} right={10} />
            <BSTChildren left={11} right={12} />
            <BSTChildren left={13} right={14} />
          </BSTRow> */}
        </Grid>
        <Button onClick={insert}>INSERT</Button>
      </Grid>
    </>
  );
}
