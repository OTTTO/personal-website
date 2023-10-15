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
import { DLLDemo } from "./DLLDemo";

export function DLLPage() {
  const { theme } = useContext(ThemeContext);
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid border="double thick black">
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
                  Below is a JS implementation of a doubly linked list with some
                  explanation.
                </p>
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
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.getNode[language]}
                  title="get node"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.insertBefore[language]}
                  title="insert before"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.prepend[language]}
                  title="prepend"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.insertAfter[language]}
                  title="insert after"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.append[language]}
                  title="append"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.get[language]}
                  title="get"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.remove[language]}
                  title="remove"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.dll.length[language]}
                  title="length"
                  width="20rem"
                />
                <p>
                  We can easily mock a doubly linked list with a list in JS or
                  Python but in praticality this would not make sense since the
                  algorithmic complexity of the operations being performed on
                  the list would be that of an array as opposed to a linked list
                  defeating the purpose of using this data structure in the
                  first place.
                </p>
                <Divider
                  sx={{ backgroundColor: "black", borderBottomWidth: 4 }}
                />
                <DLLDemo />
                <PageButtons
                  backTitle="SINGLY LINKED LIST"
                  backTo="/projects/xplained/ds/sll"
                />
              </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
