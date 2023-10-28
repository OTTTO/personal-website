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
import { PageButtons } from "components/PageButtons";
import { QueueDemo } from "./QueueDemo";
import { DSDivider } from "components/DSDivider";

export function QueuePage() {
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
            <Title title="QUEUE" />
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
                  You are probably familiar with the term queue, as in the queue
                  (or line) at the movie theater. The first person that goes
                  into the queue, is the first to come out of the queue (no
                  skipping in line) - that's why this data structure is
                  considered First In First Out or FIFO.{" "}
                </p>
                <p>
                  Queue comes from the French word "cue" which means tail. So
                  you can remember that whenever you enqueue an element, you
                  tack on an element to the tail. We always deque from the head.{" "}
                </p>
                Queues can be used to solve certain problems
                <ul>
                  <li>Breadth First Search</li>
                  <li>Job processing</li>
                  <li>Iteratively invert a binary tree</li>
                </ul>
                <p>
                  Below is an implementation of a queue with some explanation.
                </p>
                <DSDivider />
                <p>
                  Just like the Stack class, the Queue operates on Nodes. The
                  first two properties are the same - <b>data</b> and{" "}
                  <b>next</b>. But for the Queue implementation of a Node, we
                  have one additional property. We include <b>prev</b> to have a
                  reference to the previous node in the list. We will see that
                  we need this when dequing in order to set the new head.{" "}
                </p>
                <CodeBlock
                  text={codeSnippets.queue.node}
                  title="node"
                  width="20rem"
                />
                <DSDivider />
                <p>
                  The minimum Queue class contains just 2 properties -{" "}
                  <b>tail</b> which is a reference to the rear of the queue and{" "}
                  <b>head</b> which is a reference to the front.
                </p>
                <CodeBlock
                  text={codeSnippets.queue.class}
                  title="queue"
                  width="20rem"
                />
                <DSDivider />
                <p>
                  To add a node to the back of the queue, we enqueue it by
                  pointing the new node to the current tail, pointing the
                  current tail back to the new node, and resetting the tail to
                  be the new node. Logic is a bit simpler if we have an empty
                  queue - we just set both the tail and head as the new node.
                </p>
                <CodeBlock
                  text={codeSnippets.queue.enqueue}
                  title="enqueue"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  When we return and remove, or deque, a node from the queue we
                  simply reset the head to point to the previous node in the
                  queue. Logic differs if we are removing the last node in the
                  queue, in which case we essentially reset the queue.
                </p>
                <CodeBlock
                  text={codeSnippets.queue.deque}
                  title="deque"
                  width="25rem"
                />
                <DSDivider />
                <p>
                  Just like stacks, in both JavaScript and Python, a list can
                  serve as a queue. Although as we will see, the way by which
                  this is done is not as clear as using a Stack interface.
                </p>
                <CodeBlock
                  text={codeSnippets.queue.builtIn}
                  title="built in queue"
                  width="20rem"
                />
                <DSDivider />
                <QueueDemo />
                <DSDivider />
                <PageButtons
                  backTitle="STACK"
                  backTo="/projects/xplained/ds/stack"
                  forwardTitle="SINGLY LINKED LIST"
                  forwardTo="/projects/xplained/ds/sll"
                />
              </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
