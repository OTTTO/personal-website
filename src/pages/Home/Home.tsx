import { Divider, Grid, ThemeProvider } from "@mui/material";
import { Menu } from "components/Menu";
import { Footer } from "components/Footer";
import { useContext, useEffect } from "react";
import { ErrorPage } from "pages/Error/Error";
import { Loading } from "components/Loading";
import { AuthButtons } from "components/AuthButtons";
import { CloudImages } from "components/CloudImages";
import {
  authenticationCheck,
  getMainTheme,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import React from "react";
import mainTheme from "themes/mainTheme";

import axios from "axios";
import { HomeClass } from "types/home";
import { ThemeContext } from "themes/context";
import { Title } from "components/TItle";
import { HomeWysiwygEditor } from "pages/Home/HomeWysiwygEditor";
import { HomeText } from "pages/Home/HomeText";
import useWindowDimensions from "hooks/useWindowDimensions";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();

export function Home() {
  if (window.location.href.split("/")[3] !== "") {
    window.location.href = "/";
  }

  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [edit, setEdit] = React.useState(true);
  const [home, setHome] = React.useState(new HomeClass());
  const [imgLoaded, setImgLoaded] = React.useState(false);

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

  const { width } = useWindowDimensions();
  const isMobile = width < 500;

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <Grid border="thick double black">
      <ThemeProvider theme={mainTheme}>
        <Grid border=".25rem white solid">
          <Menu backgroundColor="black"></Menu>
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            sx={{ background: getMainTheme(theme) }}
          >
            <Title title="WELCOME!!" />
            <Divider sx={{ backgroundColor: "white", borderBottomWidth: 4 }} />
            <Grid
              container
              direction="column"
              justifyContent="center"
              sx={{
                paddingTop: "2rem",

                marginTop: "1rem",
              }}
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
                padding="0 1rem 0rem 1rem"
                margin="2rem auto 0 auto"
                width={isMobile ? "90%" : "70%"}
                sx={{
                  wordWrap: "break-word",
                  backgroundColor: "white",
                  border: "double thick black",
                }}
              >
                {(isAuthenticated || isTestAuthenticated) && edit ? (
                  <HomeWysiwygEditor
                    home={home}
                    setHome={setHome}
                    property="intro"
                    updateErrorCount={updateErrorCount}
                  />
                ) : (
                  <HomeText content={home.intro} />
                )}

                <Grid margin="1rem 0">
                  <Divider
                    sx={{ backgroundColor: "white", borderBottomWidth: 1 }}
                  />
                  <Divider
                    sx={{ backgroundColor: "black", borderBottomWidth: 2 }}
                  />
                  <Divider
                    sx={{ backgroundColor: "white", borderBottomWidth: 1 }}
                  />
                </Grid>

                {(isAuthenticated || isTestAuthenticated) && edit ? (
                  <HomeWysiwygEditor
                    home={home}
                    setHome={setHome}
                    property="websiteInfo"
                    updateErrorCount={updateErrorCount}
                  />
                ) : (
                  <HomeText content={home.websiteInfo} />
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
