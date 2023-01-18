import {
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
import {
  authenticationCheck,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import { ErrorPage } from "pages/Error/Error";
import { Loading } from "components/Loading";
import { AuthButtons } from "components/AuthButtons";
import { CloudImages } from "components/CloudImages";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();

class HomeClass {
  id: string = uuid();
  intro: string = "";
  websiteInfo: string = "";
  mainImg: string;
}

export function Home() {
  const { width } = useWindowDimensions();
  const introWidth = 735;

  const [edit, setEdit] = React.useState(true);
  const [home, setHome] = React.useState(new HomeClass());

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    currentState: string,
    property: string
  ) => {
    updateErrorCount(currentState, e.target.value);
    const newHome = structuredClone(home);
    newHome[property] = e.target.value;
    setHome(newHome);
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

  const handleSaveOnClick = async () => {
    if (isTestAuthenticated) {
      localStorage.setItem("home", JSON.stringify(home));
    } else {
      await updateHome({ variables: { home } });
    }
    window.location.replace("/");
  };

  const handleSelectImage = (e, idx: number) => {
    const newHome = structuredClone(home);
    const img = e.target.currentSrc.split("/").pop();
    newHome.mainImg = img;
    setHome(newHome);
  };

  const testHome = getStorage("home");

  const [updateHome] = useMutation(UPDATE_HOME);
  const { data, loading, error } = useQuery(HOME);

  useEffect(() => {
    if (!loading && data) {
      if (isTestAuthenticated) setHome(testHome);
      else if (data.home.id.length > 0) setHome(data.home);

      console.log("data: ", data);
    }
  }, [loading, data]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const backgroundColor = "black";

  console.log(home);

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

            <Grid
              container
              direction="column"
              justifyContent="center"
              sx={{ paddingTop: "2rem" }}
            >
              <img
                src={`${process.env.REACT_APP_S3_IMAGES_URI}/${home.mainImg}`}
                alt="Angel's Landing"
                className="angelImg"
              ></img>
              {(isAuthenticated || isTestAuthenticated) && edit && (
                <Grid
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "2px",
                    opacity: ".9",
                  }}
                  margin="1rem auto 0rem auto"
                  padding=".2rem .2rem 0rem .2rem"
                >
                  <CloudImages
                    isTestAuthenticated={isTestAuthenticated}
                    handleSelectImage={handleSelectImage}
                    isSmaller={width < introWidth}
                  ></CloudImages>
                </Grid>
              )}
              <Grid
                container
                direction="column"
                width={width > introWidth ? "90%" : "95%"}
                padding="1rem 2rem 0rem 2rem"
              >
                {(isAuthenticated || isTestAuthenticated) && edit ? (
                  <TextField
                    error={home.intro.length === 0}
                    fullWidth={true}
                    multiline
                    value={home.intro}
                    sx={{
                      backgroundColor: "white",
                      opacity: ".7 ",
                      borderRadius: ".5rem",
                    }}
                    onChange={(e) => handleTextChange(e, home.intro, "intro")}
                  ></TextField>
                ) : (
                  home.intro.split("\n").map((line, idx) => (
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
                    error={home.websiteInfo.length === 0}
                    fullWidth={true}
                    multiline
                    value={home.websiteInfo}
                    sx={{
                      backgroundColor: "white",
                      opacity: ".7 ",
                      borderRadius: ".5rem",
                    }}
                    onChange={(e) =>
                      handleTextChange(e, home.websiteInfo, "websiteInfo")
                    }
                  ></TextField>
                ) : (
                  home.websiteInfo.split("\n").map((line, idx) => (
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
          {(isAuthenticated || isTestAuthenticated) && (
            <AuthButtons
              backgroundColor={"black"}
              topPadding={true}
              handleSaveOnClick={handleSaveOnClick}
              edit={edit}
              setEdit={setEdit}
              disabled={canSubmitArr.length > 0}
            />
          )}
          <Footer backgroundColor={backgroundColor}></Footer>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}
