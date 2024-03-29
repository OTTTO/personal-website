import { Grid, ThemeProvider, Typography } from "@mui/material";
import { Menu } from "components/Menu";
import { Title } from "components/TItle";
import { TitleDivider } from "components/TitleDivider";
import { useContext, useEffect } from "react";
import { ThemeContext } from "context/theme";
import projectsTheme from "themes/projectsTheme";
import { getMainTheme } from "utils/utils";
import { codeSnippets } from "../codeSnippets";
import { CodeBlock } from "../../../../components/CodeBlock";
import { StackDemo } from "./StackDemo";
import { PageButtons } from "components/PageButtons";
import { DSDivider } from "components/DSDivider";

export function StackPage() {
  const { theme } = useContext(ThemeContext);
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
            <Title title="STACK" />
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
                  A stack is a Last In First Out or LIFO data structure. That
                  means that the first data to come in is the last data to come
                  out. You can imagine this as a stack of plates where one is
                  placed on top of another and you can only remove the one at
                  the top.
                </p>{" "}
                <p> Stacks can be used for a number of problems.</p>
                <ul>
                  <li>Depth First Search </li>
                  <li>Reversing a string or array </li>
                  <li>Parenthesis matching</li>{" "}
                </ul>
                <p>
                  Below is an implementation of a stack with some explanation.
                </p>
                <DSDivider />
                <p>
                  First we need a way to represent the elements that are going
                  to be added to the stack. We do this with a Node class which
                  has a property to store the <b>data</b> and another to store a
                  reference to the <b>next</b> element in the stack - in other
                  words the element beneath it.
                </p>
                <CodeBlock
                  text={codeSnippets.stack.node}
                  title="node"
                  width="20rem"
                />
                <DSDivider />
                <p>
                  The minimum implementation of Stack class itself contains only
                  1 property, <b>top</b>, which as the name implies, always
                  points to the top of the stack which is our access point.
                </p>
                <CodeBlock
                  text={codeSnippets.stack.class}
                  title="stack"
                  width="20rem"
                />
                <DSDivider />
                <p>
                  We add nodes to the stack by "pushing" them on the top. This
                  sets the newly added node to be the top and points it to the
                  old top in order to extend the stack.
                </p>
                <CodeBlock
                  text={codeSnippets.stack.push}
                  title="push"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  We remove nodes in a LIFO fashion by popping the top of the
                  stack, which returns the top data and resets the top to be the
                  next node down (even if that node is null or None).
                </p>
                <CodeBlock
                  text={codeSnippets.stack.pop}
                  title="pop"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  If we just want to see what the top of the stack is or get the
                  top data, we use peek instead of pop.
                </p>
                <CodeBlock
                  text={codeSnippets.stack.peek}
                  title="peek"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  In many languages you don't need to implement a stack yourself
                  or even import it. For example, in both JavaScript and Python,
                  a list can serve as a queue.
                </p>
                <CodeBlock
                  text={codeSnippets.stack.builtIn}
                  title="built in stack"
                  width="20rem"
                />
                <DSDivider />
                <StackDemo />
                <DSDivider />
                <PageButtons
                  forwardTitle="QUEUE"
                  forwardTo="/projects/xplained/ds/queue"
                />
              </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
