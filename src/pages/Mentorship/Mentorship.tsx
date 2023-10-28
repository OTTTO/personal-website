import { Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import { Title } from "components/TItle";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "context/theme";
import * as DOMPurify from "dompurify";
import projectsTheme from "themes/projectsTheme";
import {
  authenticationCheck,
  getMainTheme,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import { Training } from "types/training";
import axios from "axios";
import { AuthButtons } from "components/AuthButtons";
import { WysiwygEditor } from "components/WysiwygEditor";
import { ErrorPage } from "pages/Error/Error";
import { Loading } from "components/Loading";
import useWindowDimensions from "hooks/useWindowDimensions";
import { TitleDivider } from "components/TitleDivider";

export function Mentorship() {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const isMobile = width <= 500;
  const isAuthenticated = authenticationCheck();
  const isTestAuthenticated = testAuthenticationCheck();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(true);
  const [training, setTraining] = useState(new Training());

  const handleContentChange = (content: string) => {
    const newTraining = { ...training, content };
    setTraining(newTraining);
  };

  const handleSaveOnClick = async () => {
    if (isTestAuthenticated) {
      localStorage.setItem("home", JSON.stringify(training));
    } else {
      await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/training/save`,
        training,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    }
    window.location.replace("/mentorship");
  };

  const testTraining = getStorage("training");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/training`)
        .catch((err) => {
          setError(true);
        });
      if (resp) {
        setTraining(resp.data || training);
      }
      setLoading(false);
    };
    if (!isTestAuthenticated) fetchData();
    else {
      setTraining(testTraining);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <Grid border="double thick black">
      <Grid border=".25rem white solid">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black" />
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom={
              isAuthenticated || isTestAuthenticated ? "0" : "2rem"
            }
            sx={{
              background: getMainTheme(theme),
            }}
          >
            <Title title="MENTORSHIP" />
            <TitleDivider />
            <Grid>
              {((!isAuthenticated && !isTestAuthenticated) || !edit) && (
                <Typography
                  margin={isMobile ? "1rem 5% 0" : "2rem 10% 1rem"}
                  padding="0rem .5rem"
                  fontSize="1rem"
                  sx={{
                    backgroundColor: "white",
                    border: "double thick black",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(training.content),
                  }}
                ></Typography>
              )}
            </Grid>
            <Grid
              sx={{
                paddingTop: "1rem",
                display:
                  (!isAuthenticated && !isTestAuthenticated) || !edit
                    ? "none"
                    : "visible",
              }}
            >
              <Container>
                <WysiwygEditor
                  content={training.content}
                  onChange={(content: string) => handleContentChange(content)}
                  options={["inline", "textAlign", "list", "link", "fontSize"]}
                />
              </Container>
            </Grid>
            {(isAuthenticated || isTestAuthenticated) && (
              <AuthButtons
                bottomPadding
                handleSaveOnClick={handleSaveOnClick}
                edit={edit}
                setEdit={setEdit}
              />
            )}
          </Grid>
          <Footer />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
