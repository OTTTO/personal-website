import { Grid, ThemeProvider, Typography } from "@mui/material";
import { Menu } from "components/Menu";
import { Title } from "components/TItle";
import { TitleDivider } from "components/TitleDivider";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "themes/context";
import projectsTheme from "themes/projectsTheme";
import { getMainTheme } from "utils/utils";
import { codeSnippets } from "../codeSnippets";
import { CodeBlock } from "../../../../components/CodeBlock";
import { PageButtons } from "components/PageButtons";
import { BSTDemo } from "./BSTDemo";
import { DSDivider } from "components/DSDivider";

export function BSTPage() {
  const { theme } = useContext(ThemeContext);
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    document.getElementById("outerGrid").scrollIntoView();
  }, []);

  return (
    <Grid border="double thick black" id="outerGrid">
      <Grid border=".25rem white solid">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black" />
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            sx={{ background: getMainTheme(theme) }}
          >
            <Title title="BINARY SEARCH TREE" />
            <TitleDivider />
            <Grid width="90%" margin="0 auto">
              <Typography
                sx={{
                  backgroundColor: "white",
                  margin: "2rem auto 0",
                  padding: ".5rem 1rem",
                  border: "3px solid black",
                }}
              >
                <Typography
                  variant="h4"
                  textAlign="center"
                  fontWeight="bold"
                  sx={{ textDecoration: "underline" }}
                >
                  TREES
                </Typography>
                <p>
                  While sequential data structures are all lined up in sequence
                  either front to back or top down, trees branch out with nodes
                  in multiple directions.
                </p>

                <p>
                  A tree consists of a root node where all of the branching
                  begins, we typically place the root at the top when we
                  visualize these structures.
                </p>
                <p>
                  Every node has only one parent (except the root which has
                  none) and each node can have zero or more children. If a node
                  has zero children, we call it a leaf.
                </p>
                <p>
                  The height of a tree is the number of steps between the root
                  node and the lowest leaf.
                </p>
                <DSDivider />
                <p>
                  A binary tree is a tree where each node has at most two
                  children. Each node can have a left and/or right child. In a
                  binary search tree (BST), every left child is smaller than its
                  parent and every right child is larger than its parent.
                </p>
                <p>
                  We call it a Binary Search Tree because the structure makes it
                  easy to search for any element in the tree.
                </p>
                <p>
                  We just start at the root and depending on whether the element
                  we are looking for is less than or greater than that node, we
                  proceed respectively down the left or the right path and
                  continue until we find the element or hit the bottom of the
                  tree.
                </p>
                <p>
                  Since we are always splitting the size of the problem in half,
                  the algorithmic complexity of search is O(log(n)). But
                  depending on how we insert data into our BST it can degenerate
                  to O(n), for example if items are inserted in an already
                  sorted order. Due to this, we will use the binary search tree
                  implementation as a jump off point to eventually learn about
                  trees that balance themselves and are guaranteed to maintain
                  O(log(n)) insertion and search.
                </p>
                <p>
                  Below is an implementation of a binary search tree with some
                  explanation.
                </p>
                <DSDivider />
                <p>
                  Unlike the sequential data structures, BSTs only require a
                  single class for their operations. This class contains 4
                  properties - <b>key</b>: the identifier of our nodes,
                  <b>data</b>: the actual data which is stored at the node, and
                  then <b>left</b>/<b>right</b>: references to the left and
                  right children. We don't need to store the root of the BST
                  because we know that the first node will always be the root
                  and then we climb down from there.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.class[language]}
                  title="binary search tree"
                  width="20rem"
                />
                <DSDivider />
                <p>
                  Insertion into a BST is simple. If there is no root we simply
                  set the node with the key and the data, otherwise we recurse
                  to the left or the right depending on if the key is less than
                  or greater than the current node. Once we hit the bottom of
                  the tree that is when we do the actual insertion.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.insert[language]}
                  title="insert"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Checking if an element exists is how we search for elements in
                  a BST. It is done by recursively climbing down the children
                  looking for the key, if we eventually find it we return true
                  otherwise if we hit the bottom of the tree we return false
                  knowing that the key is not present.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.exists[language]}
                  title="exists"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Getting an element is done exactly the same as checking if it
                  exists but instead of returning a boolean we return the data
                  of that node or a null value if we don't find it.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.get[language]}
                  title="get"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Find the minimum child of any given node. This is used to find
                  the successor when we delete a node that has both a left and
                  right child. The successor is always the min of the right
                  child and it will take the place of the deleted node.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.min[language]}
                  title="min"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Some simple logic is needed to replace the root node when it
                  only has one child. We have extracted this as a helper method
                  because to clean up the delete method.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.replaceRoot[language]}
                  title="replace root"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Deleting a node also involves recursing the tree until the key
                  is found. Once the key is found, we follow various means to
                  delete it. There is certain logic if we are deleting the root,
                  deleting a node with only one child, or deleting a node with
                  both a left and right child.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.delete[language]}
                  title="delete"
                  width="25rem"
                />
                <DSDivider />
                <BSTDemo />
                <DSDivider />
                <PageButtons
                  backTitle="DOUBLY LINKED LIST"
                  backTo="/projects/xplained/ds/dll"
                />
              </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
