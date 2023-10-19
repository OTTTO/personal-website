import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { getRandomInt } from "utils/utils";

function BSTNode({ data }) {
  return (
    <Grid>
      <Typography
        borderRadius="30px"
        width="1.3rem"
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
  let gap = ".5rem";
  if (height === 1) gap = "6.5rem";
  if (height === 2) gap = "2.5rem";
  return (
    <Grid
      display="flex"
      gap={gap}
      minWidth="3rem"
      flexDirection="row"
      justifyContent={justify(left, right)}
    >
      <BSTNode data={left} />
      <BSTNode data={right} />
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
    const row = [];
    for (let i = 0; i < numNodes; i += 2) {
      const node = { left: undefined, right: undefined };
      if (i < rowSlice.length) node.left = rowSlice[i];
      if (i + 1 < rowSlice.length) node.right = rowSlice[i + 1];
      row.push(node);
    }
    return row;
  };
  let gap = "1rem";
  if (height === 1) gap = "6rem";
  if (height === 2) gap = "3rem";
  return (
    <Grid
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={gap}
      marginTop=".5rem"
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

export function BSTDemo() {
  const [bst, setBst] = useState([50]);
  //   const [bst, setBst] = useState([
  //     50,
  //     49,
  //     66,
  //     26,
  //     null,
  //     56,
  //     91,
  //     4,
  //     45,
  //     null,
  //     null,
  //     55,
  //     57,
  //     70,
  //   ]);
  //   const [bst, setBst] = useState([
  //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  //   ]);
  const [nextData, setNextData] = useState(getRandomInt(100));
  //   const [nextData, setNextData] = useState(99);
  const [isFull, setFull] = useState(false);

  const isEmpty = (bst) => {
    return !bst || bst.every((el) => !el);
  };

  // height: 0
  // nodes per row: 2^h
  // left child: 2n + 1
  // right child: 2n + 2

  const insert = (check) => {
    const bstCopy = [...bst];
    if (isEmpty(bstCopy)) bstCopy[0] = nextData;
    else {
      for (let i = 0, j = 0; i <= bstCopy.length; j++) {
        let leftChild = 2 * i + 1;
        let rightChild = 2 * i + 2;
        if (nextData < bstCopy[i]) {
          if (!bstCopy[leftChild]) {
            bstCopy[leftChild] = nextData;
            break;
          } else {
            i = leftChild;
          }
        } else if (nextData > bstCopy[i]) {
          if (!bstCopy[rightChild]) {
            bstCopy[rightChild] = nextData;
            break;
          } else {
            i = rightChild;
          }
        }
      }
    }

    let randomInt = getRandomInt(100);
    let iter = 0;
    while (!isValidInsert(bstCopy, randomInt) || exists(randomInt, bstCopy)) {
      if (iter === 500) {
        setFull(true);
        break;
      }
      randomInt = getRandomInt(100);
      iter += 1;
    }
    setBst(bstCopy);
    setNextData(randomInt);
  };

  // check to see if we will overflow our visualization
  // we currently support 4 rows
  const isValidInsert = (tree, node) => {
    if (isEmpty(tree)) return true;
    let isValid = false;

    let i = 0;
    for (let j = 0; j < 3; j++) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      if (node < tree[i]) {
        if (!tree[leftChild]) {
          isValid = true;
          break;
        } else {
          i = leftChild;
        }
      } else if (node > tree[i]) {
        if (!tree[rightChild]) {
          isValid = true;
          break;
        } else {
          i = rightChild;
        }
      }
    }
    return isValid;
  };

  const exists = (data, tree) => {
    if (isEmpty(tree)) return false;
    for (let node of tree) {
      if (node === data) {
        console.log("EXISTS");
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Grid
        display="flex"
        flexDirection="column"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
          Binary Search Tree Demo
        </Typography>
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding=".5rem"
          height="9.5rem"
          width="16rem"
          borderRadius="3px"
          sx={{ backgroundColor: "black" }}
        >
          {new Array(4).fill(true).map((_, height) => (
            <BSTRow nodes={bst} height={height} />
          ))}
        </Grid>
        <Button onClick={() => insert(false)} disabled={isFull}>
          INSERT
        </Button>
      </Grid>
    </>
  );
}
