import { Divider, Grid, ThemeProvider, Typography } from "@mui/material";
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
                <Divider
                  sx={{ backgroundColor: "black", borderBottomWidth: 4 }}
                />
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
                <ul>
                  <li>Serving as a double ended queue (deque)</li>
                  <li>Undo/Redo feature in editing applications</li>
                  <li>Use of back and forward button in a browser</li>
                </ul>
                <p>
                  Below is an implementation of a binary search tree with some
                  explanation.
                </p>
                <p></p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.node[language]}
                  title="binary search tree"
                  width="20rem"
                />
                <p></p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.insert[language]}
                  title="insert"
                  width="25rem"
                />
                <p></p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.exists[language]}
                  title="exists"
                  width="25rem"
                />
                <p></p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.min[language]}
                  title="min"
                  width="25rem"
                />
                <p></p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.replaceRoot[language]}
                  title="replace root"
                  width="25rem"
                />
                <p></p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.bst.delete[language]}
                  title="delete"
                  width="25rem"
                />
                <Divider
                  sx={{ backgroundColor: "black", borderBottomWidth: 4 }}
                />
                <BSTDemo />
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
