import {
  Button,
  Divider,
  Grid,
  Stack,
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
import {
  authenticationCheck,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import { ErrorPage } from "pages/Error/Error";
import { Loading } from "components/Loading";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();

export function Home() {
  const { width } = useWindowDimensions();
  const introWidth = 735;

  const [edit, setEdit] = React.useState(true);
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

  const testHome = getStorage("home");
  console.log(testHome);

  const [updateHome] = useMutation(UPDATE_HOME);
  const { data, loading, error } = useQuery(HOME);

  useEffect(() => {
    if (!loading && data) {
      setIntro(isTestAuthenticated ? testHome.intro : data.home.intro);
      setWebsiteInfo(
        isTestAuthenticated ? testHome.websiteInfo : data.home.websiteInfo
      );
    }
  }, [loading, data]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const backgroundColor = "black";

  const home = {
    intro,
    websiteInfo,
    id: data.home.id.length ? data.home.id : uuid(),
  };

  return (
    <Grid border="thick double black">
      <ThemeProvider theme={mainTheme}>
        <Grid
          sx={{
            backgroundColor: "black",
            height: "100vh",
            overflowY: "auto",
            margin: "0 auto",
            textAlign: "center",
            border: "white solid .25rem",
          }}
        >
          <Menu backgroundColor={backgroundColor}></Menu>
          <Grid
            container
            direction="column"
            sx={{ paddingTop: "1rem" }}
            alignItems="center"
          >
            <Typography variant="h1" color="white" key="1">
              <u>WELCOME!</u>
            </Typography>

            <Grid container justifyContent="center" sx={{ paddingTop: "2rem" }}>
              <img src={angel} alt="Angel's Landing" className="angelImg"></img>
              <Grid
                container
                direction="column"
                width={width > introWidth ? "90%" : "95%"}
                padding="1rem 2rem 0rem 2rem"
              >
                {(isAuthenticated || isTestAuthenticated) && edit ? (
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
                ) : (
                  intro.split("\n").map((line, idx) => (
                    <Grid key={idx}>
                      {idx !== 0 && <br></br>}
                      <Typography color="white" textAlign="left">
                        {line}
                      </Typography>
                    </Grid>
                  ))
                )}

                <Grid margin="1rem 0">
                  <Divider
                    sx={{ backgroundColor: "white", borderBottomWidth: 1 }}
                  />
                  <Divider
                    sx={{ backgroundColor: "black", borderBottomWidth: 1 }}
                  />
                  <Divider
                    sx={{ backgroundColor: "white", borderBottomWidth: 1 }}
                  />
                </Grid>

                {(isAuthenticated || isTestAuthenticated) && edit ? (
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
                ) : (
                  websiteInfo.split("\n").map((line, idx) => (
                    <Grid key={idx}>
                      {idx !== 0 && <br></br>}
                      <Typography color="white" textAlign="left">
                        {line}
                      </Typography>
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="right"
            padding="1rem 1rem 0rem 0rem"
            spacing={2}
          >
            {(isAuthenticated || isTestAuthenticated) && (
              <Button
                variant="contained"
                onClick={async () => {
                  if (isTestAuthenticated) {
                    localStorage.setItem("home", JSON.stringify(home));
                  } else {
                    await updateHome({ variables: { home } });
                  }
                  window.location.replace("/");
                }}
                disabled={canSubmitArr.length > 0}
                key="0"
              >
                <Typography variant="h6"> SAVE</Typography>
              </Button>
            )}

            {(isAuthenticated || isTestAuthenticated) && edit && (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setEdit(false);
                }}
                key="1"
              >
                <Typography variant="h6"> VIEW</Typography>
              </Button>
            )}
            {(isAuthenticated || isTestAuthenticated) && !edit && (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setEdit(true);
                }}
                key="2"
              >
                <Typography variant="h6"> EDIT</Typography>
              </Button>
            )}
          </Stack>
          <Footer backgroundColor={backgroundColor}></Footer>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}
