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
import React, { useContext } from "react";
import mainTheme from "themes/mainTheme";
import randomWords from "random-words";
import { getMainTheme } from "utils/utils";
import { ThemeContext } from "context/theme";
import { Title } from "components/TItle";
import { TitleDivider } from "components/TitleDivider";

type PasswordType = "cryptic" | "human";

export function PasswordGenerator() {
  const { theme } = useContext(ThemeContext);
  const [password, setPassword] = React.useState("");
  const [radio, setRadio] = React.useState<PasswordType>("cryptic");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio((event.target as HTMLInputElement).value as PasswordType);
  };

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

  const humanSpecials = ["!", "@", "#", "$", "%", "&", "?", "+"];

  const generateHuman = () => {
    setPassword(
      randomWords({
        exactly: 3,
        join: "",
        formatter: (word, index) => {
          return word.slice(0, 1).toUpperCase().concat(word.slice(1));
        },
      }) +
        shuffle(numbers)[0] +
        shuffle(numbers)[0] +
        shuffle(humanSpecials)[0]
    );
  };

  const onGenerate = () => {
    if (radio === "cryptic") {
      generateCryptic();
    } else {
      generateHuman();
    }
  };

  return (
    <Grid container direction="column" border="double thick black">
      <ThemeProvider theme={mainTheme}>
        <Menu backgroundColor="black" borderSides />
      </ThemeProvider>
      <Grid
        padding="1rem 0rem"
        width="99%"
        margin="0 auto .25rem auto"
        bgcolor="black"
        textAlign="center"
        sx={{ background: getMainTheme(theme) }}
      >
        <Title title="PASSWORD GENERATOR" />
        <TitleDivider />
        <Grid
          container
          bgcolor="white"
          border="2px solid black"
          width="20rem"
          margin="1rem auto"
          sx={{ borderRadius: "3px" }}
        >
          <RadioGroup
            defaultValue="cryptic"
            sx={{
              margin: "0 auto",
            }}
            onChange={handleRadioChange}
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
              label="Human"
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
        <Typography
          color="black"
          variant="h6"
          border="2px solid black"
          display={password ? "inline" : "none"}
          padding=".25rem"
          sx={{ backgroundColor: "white", borderRadius: "3px" }}
        >
          {password}
        </Typography>
      </Grid>
      <Footer />
    </Grid>
  );
}
