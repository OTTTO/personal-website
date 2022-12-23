import {
  Button,
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

export function Home() {
  const { width } = useWindowDimensions();
  const introWidth = 950;

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
  if (error) return <p>Error : {error.message}</p>;

  const backgroundColor = "black";

  const isAuthenticated = localStorage.getItem("token");

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
                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.replace("/");
                      }}
                      sx={{ height: "2rem" }}
                    >
                      LOGOUT
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          <br></br>
          {width < introWidth && (
            <Grid>
              <img src={angel} alt="Angel's Landing" className="angelImg"></img>
            </Grid>
          )}
          <Grid sx={{ padding: "2rem 0rem 0rem 1rem" }}>
            {width > introWidth && (
              <img src={angel} alt="Angel's Landing" className="angelImg"></img>
            )}
            <Grid
              container
              direction="column"
              width={width > introWidth ? "90%" : "90%"}
              padding="0rem 1rem 0rem 1rem"
            >
              {!isAuthenticated ? (
                <Typography variant="h4" color="white" textAlign="left">
                  {intro}
                </Typography>
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
              <br></br>
              {!isAuthenticated ? (
                <Typography variant="h4" color="white" textAlign="left">
                  {websiteInfo}
                </Typography>
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
