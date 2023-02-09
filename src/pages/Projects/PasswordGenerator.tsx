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
import mainTheme from "themes/mainTheme";

export function PasswordGenerator() {
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
          >
            GENERATE
          </Button>
        </Grid>
      </Grid>
      <Footer backgroundColor="black"></Footer>
    </Grid>
  );
}
