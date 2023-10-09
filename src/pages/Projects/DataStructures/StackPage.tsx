import {
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Menu } from "components/Menu";
import { Title } from "components/TItle";
import { TitleDivider } from "components/TitleDivider";
import { useContext, useState } from "react";
import { ThemeContext } from "themes/context";
import projectsTheme from "themes/projectsTheme";
import { getMainTheme } from "utils/utils";
import { CopyBlock, monokaiSublime } from "react-code-blocks";
import { stack } from "./codeSnippets";
import { CodeBlock } from "./CodeBlock";

export function StackPage() {
  const { theme } = useContext(ThemeContext);
  const [language, setLanguage] = useState("python");

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
            <Title title="STACK" />
            <TitleDivider />
            <Grid>
              <Typography
                sx={{
                  backgroundColor: "white",
                  margin: "2rem auto 0",
                  padding: ".5rem 1rem",
                  width: "80%",
                  border: "3px solid black",
                }}
              >
                <p>
                  A stack is a First In Last Out or FILO data structure. That
                  means that the first data to come in is the last data to come
                  out. You can imagine this as a stack of plates where one is
                  placed on top of another and you can only remove the one at
                  the top.
                </p>{" "}
                <p> Stacks can be used for a number of problems.</p>
                <ul>
                  <li> Undo/redo feature on many text editing applications </li>
                  <li>Reversing a string or array </li>
                  <li>Parenthesis matching</li>{" "}
                </ul>
                <p>
                  Below is a JS implementation of a stack with some explanation.
                </p>
                <p>
                  First we need a way to represent the elements that are going
                  to be added to the stack. We do this with a Node class which
                  has a property to store the <b>data</b> and another to store a
                  reference to the <b>next</b> element in the stack - in other
                  words the element beneath it.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={stack.node[language]}
                  title="stack node"
                  width="20rem"
                />
                <p>
                  The minimum implementation of Stack class itself contains only
                  1 property, <b>top</b>, which as the name implies, always
                  points to the top of the stack which is our access point.
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={stack.stack[language]}
                  title="stack class"
                  width="20rem"
                />
                <p>
                  A stack is one of the simpler data structures with typically
                  only 3 methods on it.{" "}
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={stack.push[language]}
                  title="push"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={stack.pop[language]}
                  title="pop"
                  width="25rem"
                />
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={stack.peek[language]}
                  title="peek"
                  width="25rem"
                />
                <p>
                  In many languages you don't need to implement a stack yourself
                  or even import it. For example, in both JavaScript and Python,
                  a list can serve as a queue{" "}
                </p>
                <CodeBlock
                  language={language}
                  setLanguage={setLanguage}
                  text={stack.builtIn[language]}
                  title="built in stack"
                  width="20rem"
                />
              </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
