import { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { DemoString } from "./DemoString";
import { CodeBlock } from "../../../../../components/CodeBlock";
import { codeSnippets } from "../../codeSnippets";

export function ReverseString({ language, setLanguage }) {
  const string = "Mississippi";
  const [stack, setStack] = useState([]);
  const [resultArr, setResultArr] = useState([]);
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(false);

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const push = () => {
    const thisStack = stack.slice();
    sleep(500).then(() => {
      thisStack.push(string[index]);
      setStack(thisStack);
      setIndex(index + 1);
    });
  };
  const pop = () => {
    const thisStack = stack.slice();
    const thisResultArr = resultArr.slice();
    sleep(500).then(() => {
      const char = thisStack.pop();
      setStack(thisStack);
      thisResultArr.push(char);
      setResultArr(thisResultArr);
    });
  };

  const reset = () => {
    setStack([]);
    setResultArr([]);
    setIndex(0);
    setRun(false);
  };

  useEffect(() => {
    const doPush = run && index < string.length;
    const doPop =
      run && index === string.length && resultArr.length < string.length;
    if (doPush) {
      push();
    } else if (doPop) {
      pop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, stack, index]);

  return (
    <Grid textAlign="center">
      <Typography fontWeight="bold">REVERSE STRING DEMO</Typography>
      <Grid display="flex" justifyContent="center">
        {resultArr.length !== string.length ? (
          <IconButton onClick={() => setRun(true)}>
            <PlayCircleOutlineIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => reset()}>
            <RestartAltIcon />
          </IconButton>
        )}
      </Grid>
      <Grid margin="0 auto 1rem" textAlign="center">
        <Grid
          height="18rem"
          width="10rem"
          margin="0 auto"
          display="flex"
          direction="column"
          justifyContent="flex-end"
          borderRadius="5px"
          sx={{ backgroundColor: "black", opacity: 0.9 }}
        >
          {[]
            .concat(stack)
            .reverse()
            .map((el) => {
              return (
                <Grid
                  width="2rem"
                  margin="0 auto"
                  textAlign="center"
                  border="1px solid red"
                  sx={{ backgroundColor: "white" }}
                >
                  {el}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid>
        <DemoString stringArr={string.split("")} index={index} />
        <DemoString stringArr={resultArr} />
      </Grid>
      <Grid textAlign="left">
        <CodeBlock
          language={language}
          setLanguage={setLanguage}
          text={codeSnippets.stack.reverseString[language]}
          title="reverse string"
          width="20rem"
        />
      </Grid>
    </Grid>
  );
}
