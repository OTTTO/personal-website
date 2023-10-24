import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRandomInt } from "utils/utils";
import { BSTRow } from "./BSTRow";
import numToWords from "num-to-words";
import { OperationDescription } from "components/OperationDescription";
import { OperationButton } from "components/OperationButton";

// height: 0
// nodes per row: 2^h
// left child: 2n + 1
// right child: 2n + 2

export function BSTDemo() {
  const [bst, setBst] = useState([{ key: 50, data: "FIFTY" }]);
  const [keys, setKeys] = useState([50]);

  const getRandomNode = () => {
    const key = getRandomInt(100);
    const data = numToWords(key).toUpperCase();
    return { key, data };
  };
  const [nextNode, setNextNode] = useState(getRandomNode());
  const [nextRemove, setNextRemove] = useState(0);
  const [nextGet, setNextGet] = useState(0);
  const [nodeReturned, setNodeReturned] = useState(bst[0]);
  const [viewGet, setViewGet] = useState(false);
  const [justAdded, setJustAdded] = useState(0);
  const [isFull, setFull] = useState(false);
  const [phaseNode, setPhaseNode] = useState(undefined);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const timeout = 400;

  const isNode = (node) => node?.key || node?.key === 0;

  const setPhaseNodes = (nodeSteps) => {
    for (let i = 0; i < nodeSteps.length - 1; i++) {
      setTimeout(() => {
        setPhaseNode(nodeSteps[i]);
      }, timeout * i);
    }
  };

  const setNexts = () => {
    const filled = bst
      .map((el, idx) => (isNode(el) ? idx : null))
      .filter((idx) => !!idx || idx === 0);
    const removeRandom = Math.floor(Math.random() * filled.length);
    const getRandom = Math.floor(Math.random() * filled.length);
    setNextRemove(filled[removeRandom]);
    setNextGet(filled[getRandom]);
  };

  useEffect(() => {
    setNexts();
    setKeys(bst.map((node) => node?.key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bst]);

  const isEmpty = (bst) => {
    return !bst || bst.every((el) => !el);
  };

  const exists = (tree, key) => {
    if (isEmpty(tree)) return false;
    for (let node of tree) {
      if (node?.key === key) return true;
    }
    return false;
  };

  // check to see if we will overflow our visualization
  const isValidInsert = (tree, key) => {
    if (isEmpty(tree)) return true;
    if (exists(tree, key)) return false;
    let isValid = false;

    let i = 0;
    // we currently support 4 rows
    for (let j = 0; j < 3; j++) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      if (key < tree[i].key) {
        if (!isNode(tree[leftChild])) {
          isValid = true;
          break;
        } else {
          i = leftChild;
        }
      } else if (key > tree[i].key) {
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

  const getNextNode = (tree) => {
    let node = getRandomNode();
    let iter = 0;
    while (!isValidInsert(tree, node.key)) {
      if (iter === 1000) {
        setFull(true);
        break;
      }
      node = getRandomNode();
      iter += 1;
    }
    return node;
  };

  const insert = () => {
    setButtonsDisabled(true);
    const tree = [...bst];
    const nodeSteps = [];
    if (isEmpty(tree)) tree[0] = nextNode;
    else {
      for (let i = 0; i <= tree.length; ) {
        nodeSteps.push(i);
        let leftChild = 2 * i + 1;
        let rightChild = 2 * i + 2;
        if (nextNode.key < tree[i].key) {
          if (!isNode(tree[leftChild])) {
            tree[leftChild] = nextNode;
            setJustAdded(nextNode.key);
            nodeSteps.push(leftChild);
            break;
          } else {
            i = leftChild;
          }
        } else if (nextNode.key > tree[i].key) {
          if (!isNode(tree[rightChild])) {
            tree[rightChild] = nextNode;
            setJustAdded(nextNode.key);
            nodeSteps.push(rightChild);
            break;
          } else {
            i = rightChild;
          }
        }
      }
    }

    const lastNode = nodeSteps.length - 1;
    const timeoutMul = lastNode;

    setPhaseNodes(nodeSteps);

    setTimeout(() => {
      setBst(tree);
      setPhaseNode(nodeSteps[lastNode]);
      setNextNode(getNextNode(tree));
      setViewGet(false);
    }, timeout * timeoutMul);

    setTimeout(() => {
      setPhaseNode(undefined);
      setButtonsDisabled(false);
    }, timeout * (timeoutMul + 1));
  };

  const minIdx = (tree, idx) => {
    for (let i = idx; i <= tree.length; ) {
      let leftChild = 2 * i + 1;
      if (!isNode(tree[leftChild])) return i;
      else i = leftChild;
    }
  };

  const deleteNode = () => {
    setButtonsDisabled(true);
    const tree = [...bst];
    const rmKey = nextRemove;
    const nodeSteps = [0];
    if (!exists(tree, tree[rmKey].key)) return false;
    for (let i = 0; i <= tree.length; ) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      if (tree[i].key === tree[rmKey].key) {
        nodeSteps.push(i);
        if (!isNode(tree[leftChild]) && !isNode(tree[rightChild])) {
          delete tree[i];
          break;
        } else if (!isNode(tree[leftChild])) {
          tree[i] = tree[rightChild];
          tree[rightChild] = null;
          moveUp(tree, rightChild);
          break;
        } else if (!isNode(tree[rightChild])) {
          tree[i] = tree[leftChild];
          tree[leftChild] = null;
          moveUp(tree, leftChild);
          break;
        } else {
          const succesor = minIdx(tree, rightChild);
          tree[i] = tree[succesor];
          tree[succesor] = null;
          moveUp(tree, succesor);
          break;
        }
      }

      if (tree[rmKey].key < tree[i].key) {
        if (!isNode(tree[leftChild])) {
          break;
        } else {
          nodeSteps.push(leftChild);
          i = leftChild;
        }
      } else if (tree[rmKey].key > tree[i].key) {
        if (!isNode(tree[rightChild])) {
          break;
        } else {
          nodeSteps.push(rightChild);
          i = rightChild;
        }
      }
    }

    const lastNode = nodeSteps.length - 1;
    const timeoutMul = lastNode;

    setPhaseNodes(nodeSteps);

    setTimeout(() => {
      setPhaseNode(nodeSteps[lastNode]);
      setFull(false);
      setBst(tree);
      setNextNode(getNextNode(tree));
      setViewGet(false);
    }, timeout * timeoutMul);

    setTimeout(() => {
      setPhaseNode(undefined);
      setButtonsDisabled(false);
    }, timeout * (timeoutMul + 1));
  };

  const moveUp = (tree, idx) => {
    if (idx > 14) return;

    let leftChild = 2 * idx + 1;
    let rightChild = 2 * idx + 2;

    if (isNode(tree[leftChild])) {
      tree[idx] = tree[leftChild];
      tree[leftChild] = null;
    }
    if (isNode(tree[rightChild])) {
      tree[idx] = tree[rightChild];
      tree[rightChild] = null;
    }

    moveUp(tree, leftChild);
    moveUp(tree, rightChild);
  };

  const getNode = () => {
    const tree = [...bst];
    for (let i = 0; i <= tree.length; ) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      if (tree[i]?.key === tree[nextGet]?.key) setNodeReturned(tree[i]);
      if (tree[nextGet]?.key < tree[i]?.key) i = leftChild;
      else i = rightChild;
    }

    setViewGet(true);
    setNexts();
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
        <Grid display="flex" flexDirection="row" margin=".2rem 0 .5rem">
          <OperationDescription backgroundColor="greenyellow" text="ADDED" />
          <OperationDescription backgroundColor="#ff4d00" text="TO REMOVE" />
        </Grid>
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
            <BSTRow
              nodes={keys}
              height={height}
              phaseNode={phaseNode}
              removeData={bst[nextRemove]?.key}
              justAdded={justAdded}
            />
          ))}
        </Grid>
        <OperationButton
          onClick={insert}
          disabled={isFull || buttonsDisabled}
          text={`INSERT(${nextNode?.key})`}
          textDecoration={isFull ? "line-through" : ""}
        />
        <OperationButton
          onClick={deleteNode}
          disabled={isEmpty(bst) || buttonsDisabled}
          text={`DELETE(${bst[nextRemove]?.key || ""})`}
          textDecoration={isEmpty(bst) ? "line-through" : ""}
        />
        <OperationButton
          onClick={getNode}
          disabled={isEmpty(bst) || buttonsDisabled}
          text={`GET(${bst[nextGet]?.key || ""})`}
          textDecoration={isEmpty(bst) ? "line-through" : ""}
        />
        {viewGet && (
          <Typography
            border="1px solid black"
            borderRadius="3px"
            padding="0 .3rem"
            margin=".4rem 0"
            sx={{ backgroundColor: "yellowgreen" }}
          >
            {nodeReturned?.data}
          </Typography>
        )}
      </Grid>
    </>
  );
}
