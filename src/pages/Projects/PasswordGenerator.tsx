import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import React from "react";
import mainTheme from "themes/mainTheme";

export function PasswordGenerator() {
  const [password, setPassword] = React.useState("");

  let uppers = Array.from(Array(26))
    .map((e, i) => i + 65)
    .map((x) => String.fromCharCode(x));

  let lowers = Array.from(Array(26))
    .map((e, i) => i + 97)
    .map((x) => String.fromCharCode(x));

  const specials1 = Array.from(Array(15))
    .map((e, i) => i + 33)
    .map((x) => String.fromCharCode(x));

  const specials2 = Array.from(Array(7))
    .map((e, i) => i + 58)
    .map((x) => String.fromCharCode(x));

  const specials3 = Array.from(Array(6))
    .map((e, i) => i + 91)
    .map((x) => String.fromCharCode(x));

  const specials4 = Array.from(Array(4))
    .map((e, i) => i + 123)
    .map((x) => String.fromCharCode(x));

  let specials = specials1
    .concat(specials2)
    .concat(specials3)
    .concat(specials4);

  let numbers = [...Array(10).keys()];

  let chars = [uppers, lowers, specials, numbers];

  const shuffle = (arr) => {
    return arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const generateCryptic = () => {
    let passArr = [];
    for (let i = 0; i < chars.length; i++) {
      for (let j = 0; j < 3; j++) {
        const char = shuffle(chars[i])[0];
        passArr.push(char);
      }
    }
    let genPassword;
    do {
      genPassword = shuffle(passArr).join("");
    } while (!specials.includes(genPassword[0]));
    setPassword(genPassword);
  };

  const generateHuman = () => {};

  const onGenerate = () => {
    generateCryptic();
  };

  return (
    <Grid container direction="column" border="double thick black">
      <ThemeProvider theme={mainTheme}>
        <Menu backgroundColor="black" borderSides></Menu>
      </ThemeProvider>
      <Grid
        padding="1rem 0rem"
        width="99%"
        margin="0 auto .25rem auto"
        bgcolor="black"
        textAlign="center"
      >
        <Typography color="white" variant="h4">
          RANDOM PASSWORD GENERATOR
        </Typography>
        <Grid container bgcolor="white" width="20rem" margin="0 auto">
          <RadioGroup
            defaultValue="cryptic"
            sx={{
              backgroundColor: "white",
              margin: "0 auto",
              borderRadius: "3px",
            }}
          >
            <FormControlLabel
              value="cryptic"
              control={<Radio />}
              label="Cryptic"
              sx={{ paddingLeft: "1rem" }}
            />
            <FormControlLabel
              value="human"
              control={<Radio />}
              label="Readable"
              sx={{ paddingLeft: "1rem" }}
            />
          </RadioGroup>
          <Button
            sx={{
              height: "2rem",
              margin: "auto",
              backgroundColor: "black",
              color: "primary.main",
              fontWeight: "heavy",
              opacity: ".8",
              ":hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
            onClick={onGenerate}
          >
            GENERATE
          </Button>
        </Grid>
        <Typography color="white" variant="h6">
          {password}
        </Typography>
      </Grid>
      <Footer backgroundColor="black"></Footer>
    </Grid>
  );
}
