import {
  Button,
  Divider,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Menu } from "components/Menu";
import mainTheme from "themes/mainTheme";
import angel from "images/angel.jpeg";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Footer } from "components/Footer";
import { useMutation, useQuery } from "@apollo/client";
import { HOME, UPDATE_HOME } from "queries/home";
import { useEffect } from "react";
import React from "react";
import { v4 as uuid } from "uuid";
import { authenticationCheck } from "utils/utils";
import { ErrorPage } from "pages/Error/Error";

export function Home() {
  const { width } = useWindowDimensions();
  const introWidth = 735;

  const [intro, setIntro] = React.useState("");
  const [websiteInfo, setWebsiteInfo] = React.useState("");

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    currentState: string,
    setState: (text: string) => void
  ) => {
    updateErrorCount(currentState, e.target.value);
    setState(e.target.value);
  };

  const [canSubmitArr, setCanSubmitArr] = React.useState<boolean[]>([]);

  const updateErrorCount = (oldString: string, newString: string) => {
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    if (oldString.length > 0 && newString.length === 0) {
      newCanSubmitArr.push(true);
    } else if (oldString.length === 0 && newString.length > 0) {
      newCanSubmitArr.pop();
    }
    setCanSubmitArr(newCanSubmitArr);
  };

  const [updateHome] = useMutation(UPDATE_HOME);
  const { data, loading, error } = useQuery(HOME);

  useEffect(() => {
    if (!loading && data) {
      setIntro(data.home.intro);
      setWebsiteInfo(data.home.websiteInfo);
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;

  const backgroundColor = "black";
  const isAuthenticated = authenticationCheck();

  const home = {
    intro,
    websiteInfo,
    id: data.home.id.length ? data.home.id : uuid(),
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <Menu backgroundColor={backgroundColor}></Menu>
      <Grid
        sx={{
          backgroundColor: "black",
          height: "100vh",
          overflowY: "auto",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Grid container direction="column" sx={{ paddingTop: "1rem" }}>
          <Grid container>
            <Grid width="30%"></Grid>
            <Typography variant="h1" color="white" width="40%">
              <u>WELCOME!</u>
            </Typography>
            {isAuthenticated && (
              <>
                <Grid
                  container
                  spacing={2}
                  width="30%"
                  justifyContent="right"
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={async () => {
                        await updateHome({ variables: { home } });
                        window.location.replace("/");
                      }}
                      disabled={canSubmitArr.length > 0}
                      sx={{ height: "2rem" }}
                    >
                      SAVE
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          <Grid container justifyContent="center" sx={{ paddingTop: "2rem" }}>
            <img src={angel} alt="Angel's Landing" className="angelImg"></img>
            <Grid
              container
              direction="column"
              width={width > introWidth ? "90%" : "95%"}
              padding="1rem 2rem 0rem 2rem"
            >
              {!isAuthenticated ? (
                intro.split("\n").map((line, idx) => (
                  <>
                    {idx !== 0 && <br></br>}
                    <Typography
                      variant="h4"
                      color="white"
                      textAlign="left"
                      key={idx}
                    >
                      {line}
                    </Typography>
                  </>
                ))
              ) : (
                <TextField
                  error={intro.length === 0}
                  fullWidth={true}
                  multiline
                  value={intro}
                  sx={{
                    backgroundColor: "white",
                    opacity: ".7 ",
                    borderRadius: ".5rem",
                  }}
                  onChange={(e) => handleTextChange(e, intro, setIntro)}
                ></TextField>
              )}

              <br></br>
              <Divider sx={{ backgroundColor: "grey", borderBottomWidth: 2 }} />
              <br></br>
              {!isAuthenticated ? (
                websiteInfo.split("\n").map((line, idx) => (
                  <>
                    {idx !== 0 && <br></br>}
                    <Typography
                      variant="h4"
                      color="white"
                      textAlign="left"
                      key={idx}
                    >
                      {line}
                    </Typography>
                  </>
                ))
              ) : (
                <TextField
                  error={websiteInfo.length === 0}
                  fullWidth={true}
                  multiline
                  value={websiteInfo}
                  sx={{
                    backgroundColor: "white",
                    opacity: ".7 ",
                    borderRadius: ".5rem",
                  }}
                  onChange={(e) =>
                    handleTextChange(e, websiteInfo, setWebsiteInfo)
                  }
                ></TextField>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer backgroundColor={backgroundColor}></Footer>
    </ThemeProvider>
  );
}
