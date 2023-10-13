import { Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import { Menu } from "components/Menu";
import { Title } from "components/TItle";
import { TitleDivider } from "components/TitleDivider";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "themes/context";
import projectsTheme from "themes/projectsTheme";
import { getMainTheme } from "utils/utils";
import { codeSnippets } from "../codeSnippets";
import { CodeBlock } from "../CodeBlock";
import { PageButtons } from "components/PageButtons";
import { LinkedListDemo } from "./LinkedListDemo";

export function LinkedListPage() {
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
            <Title title="LINKED LIST" />
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
                  A linked list is a sequential data structure. It behaves
                  similarly to an array except that it has different algorithmic
                  complexity meaning the time it takes to do certain operations
                  differs.
                </p>
                <p>
                  While an array has almost next to instant random access
                  capabilities (retrieving an element by index), a linked list's
                  retrieval speed depends on the size of the data structure. On
                  the other hand, addition and deletion from the front of an
                  array depends on its size as we have to shift the entire array
                  while it is almost instant for a linked list (for a doubly
                  linked list append/delete from both the front and the back are
                  both 'instant')
                </p>
                <p>
                  Although we almost always rely on arrays in our day to day
                  work, a linked list can be useful in certain situations - we
                  will actually see one leveraged in our implementation of
                  HashMap later on.
                </p>
                Linked Lists can be used to solve certain problems
                <ul>
                  <li>Building a HashMap implementation</li>
                  <li>
                    As an alternative to arrays in order to preserve memory
                  </li>
                  <li>Use of back and forward button in a browser</li>
                </ul>
                <p>
                  Below is a JS implementation of a singly linked list with some
                  explanation.
                </p>
                <p>
                  A singly linked list is composed of a sequence of Nodes which
                  each contain <b>data</b> and a reference to the <b>next</b>{" "}
                  Node in the list.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.sll.node[language]}
                  title="linked list node"
                  width="20rem"
                />
                <p>
                  The minimum implementation of a singly linked list only
                  consists of 2 properties - <b>tail</b> and <b>head</b>.{" "}
                  {"[tail]->[node]->[head]"}
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.sll.class[language]}
                  title="linked list class"
                  width="20rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.sll.append[language]}
                  title="append"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.sll.remove[language]}
                  title="remove (by index)"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.sll.get[language]}
                  title="get"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={codeSnippets.sll.length[language]}
                  title="length"
                  width="25rem"
                />
                <p>
                  Unlike stacks and queues, we cannot use JS and Python Lists to
                  mock Linked Lists as these lists are built as Array Lists with
                  arrays that automatically resize behind the scenes - for most
                  cases this defeats the purpose of Linked List.
                </p>
                <Divider
                  sx={{ backgroundColor: "black", borderBottomWidth: 4 }}
                />
                <LinkedListDemo />
                <PageButtons
                  backTitle="QUEUE"
                  backTo="/projects/xplained/ds/queue"
                />
              </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
