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
import { DLLDemo } from "./DLLDemo";
import { DSDivider } from "components/DSDivider";

export function DLLPage() {
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
            <Title title="DOUBLY LINKED LIST" />
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
                <p>
                  A doubly linked list follows the same concept as a singly
                  linked list except there can be addition/deletion/traversal
                  from either the tail or the head.
                </p>
                <p>Doubly Linked Lists can be used to solve certain problems</p>
                <ul>
                  <li>Serving as a double ended queue (deque)</li>
                  <li>Undo/Redo feature in editing applications</li>
                  <li>Use of back and forward button in a browser</li>
                </ul>
                <p>
                  Below is an implementation of a doubly linked list with some
                  explanation.
                </p>
                <DSDivider />
                <p>
                  The Nodes it uses are the same except they also include a
                  reference to the previous node, <b>prev</b>.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.node[language]}
                  title="node"
                  width="20rem"
                />
                <DSDivider />
                <p>
                  The doubly linked list contains the same properties as its
                  counterpart - <b>size</b>, <b>tail</b>, and <b>head</b>. The
                  connection of the nodes is the same, except due to the
                  <b> prev</b> property on the node nodes point forwards and
                  backwards joining the tail to the head - it looks like the
                  following:
                  <b>{" [tail]<->[node]<->[head]"}</b>
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.class[language]}
                  title="doubly linked list"
                  width="20rem"
                />
                <DSDivider />
                <p>
                  This getNode method is a helper method as it grabs the actual
                  node, our user should only be concerned about the data and not
                  node ojects. You will see that it is utilized by many of the
                  exposed methods of this data structure.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.getNode[language]}
                  title="get node"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  The ability to insert a node before another in the list makes
                  this data structure comparable to an array in terms of
                  functionality. The difficult part of this method is making
                  sure to wire up all of the nodes appropriately. We need to be
                  concerned about 3 nodes - the new node that we are inserting
                  and the nodes before/after that node.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.insertBefore[language]}
                  title="insert before"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Prepending a node to the doubly linked list is insertion at
                  the tail. If the list is empty we just set the tail and head
                  to be that node. Otherwise, we can simply call our
                  insertBefore method and insert before the 0th index.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.prepend[language]}
                  title="prepend"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Inserting after is just as useful as insertBefore and the
                  logic is almost entirely the same except we must wire up our
                  nodes in the reverse order.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.insertAfter[language]}
                  title="insert after"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Appending a node is the opposite of prepending, we are
                  inserting at the head of the list. The logic here is the same
                  except we call insertAfter with the last index instead of
                  insertBefore with the 0th.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.append[language]}
                  title="append"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Getting the data from a node is very simple when leveraging
                  the helper method of the same name. We get the node and then
                  return the data.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.get[language]}
                  title="get"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Removing a node from a doubly linked list is almost exactly
                  the same as removing form a singly linked list. Except in the
                  case of removing the head, we must also reset the head to be
                  the previous node.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.remove[language]}
                  title="remove"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Once again, we have the length method here as an easy wasy for
                  the user to iterate over the list.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.length[language]}
                  title="length"
                  width="20rem"
                />
                <DSDivider />
                <p>
                  We can easily mock a doubly linked list with a list in JS or
                  Python but in praticality this would not make sense since the
                  algorithmic complexity of the operations being performed on
                  the list would be that of an array as opposed to a linked list
                  defeating the purpose of using this data structure in the
                  first place.
                </p>
                <DSDivider />
                <DLLDemo />
                <DSDivider />
                <PageButtons
                  backTitle="SINGLY LINKED LIST"
                  backTo="/projects/xplained/ds/sll"
                  forwardTitle="BINARY SEARCH TREE"
                  forwardTo="/projects/xplained/ds/bst"
                />
              </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
