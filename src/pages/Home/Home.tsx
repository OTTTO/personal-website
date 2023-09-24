import { Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import { Menu } from "components/Menu";
import { Footer } from "components/Footer";
import { useContext, useEffect } from "react";
import { ErrorPage } from "pages/Error/Error";
import { Loading } from "components/Loading";
import { AuthButtons } from "components/AuthButtons";
import { CloudImages } from "components/CloudImages";
import { WysiwygEditor } from "components/WysiwygEditor";
import {
  authenticationCheck,
  getMainTheme,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import React from "react";
import mainTheme from "themes/mainTheme";
import useWindowDimensions from "hooks/useWindowDimensions";
import * as DOMPurify from "dompurify";
import axios from "axios";
import { HomeClass } from "types/home";
import { ThemeContext } from "themes/context";
import { Title } from "components/TItle";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();

export function Home() {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { width } = useWindowDimensions();
  const introWidth = 735;

  const [edit, setEdit] = React.useState(true);
  const [home, setHome] = React.useState(new HomeClass());
  const [imgLoaded, setImgLoaded] = React.useState(false);

  const handleContentChange = (content: string, property: string) => {
    updateErrorCount(home[property], content);
    const newHome = structuredClone(home);
    newHome[property] = content;
    setHome(newHome);
  };

  const [canSubmitArr, setCanSubmitArr] = React.useState<boolean[]>([]);

  const updateErrorCount = (oldString: string, newString: string) => {
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    if (!oldString.startsWith("<p></p>") && newString.startsWith("<p></p>")) {
      newCanSubmitArr.push(true);
    } else if (
      oldString.startsWith("<p></p>") &&
      !newString.startsWith("<p></p>")
    ) {
      newCanSubmitArr.pop();
    }
    setCanSubmitArr(newCanSubmitArr);
  };

  const handleSaveOnClick = async () => {
    if (isTestAuthenticated) {
      localStorage.setItem("home", JSON.stringify(home));
    } else {
      await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/home/save`, home, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
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

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/home`)
        .catch((err) => {
          setError(true);
        });
      if (resp && resp.data) {
        setHome(resp.data);
      }
      setLoading(false);
    };
    if (!isTestAuthenticated) fetchData();
    else {
      setHome(testHome);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const backgroundColor = "black";

  return (
    <Grid border="thick double black">
      <ThemeProvider theme={mainTheme}>
        <Grid
          sx={{
            backgroundColor: "black",
            height: "100vh",
            overflowY: "auto",
            margin: "0 auto",
            border: "white solid .25rem",
          }}
        >
          <Menu backgroundColor={backgroundColor}></Menu>
          <Grid
            container
            direction="column"
            sx={{
              paddingTop: "1rem",
              background: getMainTheme(theme),
            }}
          >
            <Title title="WELCOME!!" />
            <Grid
              container
              direction="column"
              justifyContent="center"
              sx={{ paddingTop: "2rem" }}
            >
              <img
                src={`${process.env.REACT_APP_S3_CLOUDFRONT}/${home.mainImg}`}
                alt="Angel's Landing"
                className={imgLoaded ? "angelImg" : ""}
                onLoad={() => setImgLoaded(true)}
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
                  width={"auto"}
                >
                  <CloudImages
                    isTestAuthenticated={isTestAuthenticated}
                    handleSelectImage={handleSelectImage}
                  ></CloudImages>
                </Grid>
              )}
              <Grid
                container
                direction="column"
                width={width > introWidth ? "90%" : "95%"}
                padding="1rem 2rem 0rem 2rem"
                margin="0 auto"
              >
                {(isAuthenticated || isTestAuthenticated) && edit ? (
                  <WysiwygEditor
                    content={home.intro}
                    onChange={(value) => handleContentChange(value, "intro")}
                    options={["inline", "link", "textAlign"]}
                    expanded
                    first={home.intro.length > 0}
                    error={
                      home.intro.length === 0 ||
                      home.intro.startsWith("<p></p>")
                    }
                  />
                ) : (
                  <Typography
                    color="white"
                    textAlign="left"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(home.intro),
                    }}
                    sx={{ textShadow: "3px 3px 2px black" }}
                  ></Typography>
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
                  <WysiwygEditor
                    content={home.websiteInfo}
                    onChange={(value) =>
                      handleContentChange(value, "websiteInfo")
                    }
                    options={["inline", "link", "textAlign"]}
                    expanded
                    first={home.websiteInfo.length > 0}
                    error={
                      home.websiteInfo.length === 0 ||
                      home.websiteInfo.startsWith("<p></p>")
                    }
                  />
                ) : (
                  <Typography
                    color="white"
                    textAlign="left"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(home.websiteInfo),
                    }}
                    sx={{ textShadow: "3px 3px 2px black" }}
                  ></Typography>
                )}
              </Grid>
            </Grid>
            {(isAuthenticated || isTestAuthenticated) && (
              <AuthButtons
                bottomPadding
                handleSaveOnClick={handleSaveOnClick}
                edit={edit}
                setEdit={setEdit}
                disabled={canSubmitArr.length > 0}
              />
            )}
          </Grid>
          <Footer />
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}
