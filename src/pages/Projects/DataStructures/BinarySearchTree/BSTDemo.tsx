import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRandomInt } from "utils/utils";
import { BSTRow } from "./BSTRow";

// height: 0
// nodes per row: 2^h
// left child: 2n + 1
// right child: 2n + 2

export function BSTDemo() {
  const [bst, setBst] = useState([50]);
  const [nextData, setNextData] = useState(getRandomInt(100));
  const [nextRemove, setNextRemove] = useState(0);
  const [isFull, setFull] = useState(false);

  const isNode = (node) => node || node === 0;

  useEffect(() => {
    const filled = bst
      .map((el, idx) => (isNode(el) ? idx : null))
      .filter((el) => isNode(el));
    const random = Math.floor(Math.random() * filled.length);
    setNextRemove(filled[random]);
  }, [bst]);

  const isEmpty = (bst) => {
    return !bst || bst.every((el) => !el);
  };

  const insert = () => {
    const tree = [...bst];
    if (isEmpty(tree)) tree[0] = nextData;
    else {
      for (let i = 0; i <= tree.length; ) {
        let leftChild = 2 * i + 1;
        let rightChild = 2 * i + 2;
        if (nextData < tree[i]) {
          if (!isNode(tree[leftChild])) {
            tree[leftChild] = nextData;
            break;
          } else {
            i = leftChild;
          }
        } else if (nextData > tree[i]) {
          if (!isNode(tree[rightChild])) {
            tree[rightChild] = nextData;
            break;
          } else {
            i = rightChild;
          }
        }
      }
    }

    let randomInt = getRandomInt(100);
    let iter = 0;
    while (!isValidInsert(tree, randomInt)) {
      if (iter === 1000) {
        setFull(true);
        break;
      }
      randomInt = getRandomInt(100);
      iter += 1;
    }
    setBst(tree);
    setNextData(randomInt);
  };

  // check to see if we will overflow our visualization
  // we currently support 4 rows
  const isValidInsert = (tree, data) => {
    if (isEmpty(tree)) return true;
    if (exists(tree, data)) return false;
    let isValid = false;

    let i = 0;
    for (let j = 0; j < 3; j++) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      if (data < tree[i]) {
        if (!isNode(tree[leftChild])) {
          isValid = true;
          break;
        } else {
          i = leftChild;
        }
      } else if (data > tree[i]) {
        if (!isNode(tree[rightChild])) {
          isValid = true;
          break;
        } else {
          i = rightChild;
        }
      }
    }
    return isValid;
  };

  const exists = (tree, data) => {
    if (isEmpty(tree)) return false;
    for (let node of tree) {
      if (node === data) {
        return true;
      }
    }
    return false;
  };

  const minIdx = (tree, idx) => {
    for (let i = idx; i <= tree.length; ) {
      console.log("minidx", i);
      let leftChild = 2 * i + 1;
      if (!isNode(tree[leftChild])) {
        console.log("MIN RETURN");
        return i;
      } else {
        console.log("MIN ITER");
        i = leftChild;
      }
    }
  };

  const deleteNode = () => {
    console.log("in delete node");
    const tree = [...bst];

    const data = nextRemove;
    if (!exists(tree, tree[data])) return false;
    console.log("remove", data);
    for (let i = 0; i <= tree.length; ) {
      console.log("i", i);
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      if (tree[i] === tree[data]) {
        console.log("EQUAL");
        if (!isNode(tree[leftChild]) && !isNode(tree[rightChild])) {
          console.log("LEAF");
          delete tree[i];
          break;
        } else if (!isNode(tree[leftChild])) {
          console.log("RIGHT");
          tree[i] = tree[rightChild];
          tree[rightChild] = null;
          moveUp(tree, rightChild);
          break;
        } else if (!isNode(tree[rightChild])) {
          console.log("LEFT");
          tree[i] = tree[leftChild];
          tree[leftChild] = null;
          moveUp(tree, leftChild);
          break;
        } else {
          console.log("BOTH");
          const succesor = minIdx(tree, rightChild);
          console.log("succ", succesor);
          tree[i] = tree[succesor];
          tree[succesor] = null;
          moveUp(tree, succesor);
          break;
        }
      }

      if (tree[data] < tree[i]) {
        console.log("IN OTHER, tree[data], tree[i]", tree[data], tree[i]);
        console.log("GOING LEFT");
        if (!isNode(tree[leftChild])) {
          console.log("BREAKING LEFT");
          break;
        } else {
          console.log("ITER LEFT");
          i = leftChild;
        }
      } else if (tree[data] > tree[i]) {
        console.log("GOING RIGHT");
        if (!isNode(tree[rightChild])) {
          console.log("BREAKING RIGHT");
          break;
        } else {
          console.log("ITER RIGHT");
          i = rightChild;
        }
      }
    }
    setFull(false);
    setBst(tree);
  };

  const moveUp = (tree, idx) => {
    console.log("move up");
    const pathIndices = [idx];
    while (pathIndices.every((path) => path > tree.length)) {
      for (let path = 0; path < pathIndices.length; path++) {
        let i = pathIndices[path];
        let leftChild = 2 * i + 1;
        let rightChild = 2 * i + 2;
        let leftParent = Math.floor(i / 2);
        let rightParent = i / 2;
        if (tree[leftChild]) tree[leftParent] = leftChild;
        if (tree[rightChild]) tree[rightParent] = rightChild;
        pathIndices.push(leftChild);
        pathIndices.push(rightChild);
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
          width="16.5rem"
          borderRadius="3px"
          sx={{ backgroundColor: "black", opacity: 0.85 }}
        >
          {new Array(4).fill(true).map((_, height) => (
            <BSTRow nodes={bst} height={height} />
          ))}
        </Grid>
        <Button onClick={insert} disabled={isFull}>
          INSERT({nextData})
        </Button>
        <Button onClick={deleteNode} disabled={bst.length === 0}>
          DELETE({nextRemove})
        </Button>
      </Grid>
    </>
  );
}
