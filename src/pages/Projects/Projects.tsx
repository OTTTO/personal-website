import {
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import useWindowDimensions from "hooks/useWindowDimensions";
import projectsTheme from "themes/projectsTheme";
import {
  authenticationCheck,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import { WysiwygEditor } from "components/WysiwygEditor";
import * as DOMPurify from "dompurify";
import { useMutation, useQuery } from "@apollo/client";
import { PROJECTS, UPDATE_PROJECT } from "queries/project";
import { useEffect } from "react";
import React from "react";
import { Loading } from "components/Loading";
import { ErrorPage } from "pages/Error/Error";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { ProjectImage } from "./ProjectImage";
import { Project } from "types/project";
import { AuthButtons } from "components/AuthButtons";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();

export function Projects() {
  const { width } = useWindowDimensions();
  const smallerDeviceWidth = 1000;
  const isSmaller = width < smallerDeviceWidth;

  const testProjects = getStorage("projects");

  const [edit, setEdit] = React.useState(true);
  const [projects, setProjects] = React.useState([]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    idx: number
  ) => {
    const newProjects = structuredClone(projects);
    const newProject = structuredClone(newProjects[idx]);
    newProject[key] = e.target.value;
    newProjects[idx] = newProject;
    setProjects(newProjects);
  };

  const handleContentChange = (content: string, idx: number) => {
    const newProjects = structuredClone(projects);
    const newProject = structuredClone(newProjects[idx]);
    newProject.content = content;
    newProjects[idx] = newProject;
    setProjects(newProjects);
  };

  const addProject = () => {
    const newProjects = structuredClone(projects);
    newProjects.push(new Project());
    setProjects(newProjects);
  };

  const removeProject = (idx: number) => {
    let newProjects = structuredClone(projects);
    newProjects.splice(idx, 1);
    setProjects(newProjects);
  };

  const handleSaveOnClick = async () => {
    if (isTestAuthenticated) {
      localStorage.setItem("projects", JSON.stringify(projects));
    } else {
      await updateProjects({ variables: { projects } });
    }
    window.location.replace("/projects");
  };

  const [updateProjects] = useMutation(UPDATE_PROJECT);
  const { data, loading, error } = useQuery(PROJECTS);

  useEffect(() => {
    if (!loading && data) {
      setProjects(isTestAuthenticated ? testProjects : data.projects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <Grid border="thick double black">
      <Grid sx={{ height: "vh100" }} border="white solid .25rem">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black"></Menu>
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            borderBottom={
              !isAuthenticated && !isTestAuthenticated
                ? ".25rem white solid"
                : null
            }
            sx={{ backgroundColor: "black" }}
          >
            <Typography variant="h1" textAlign="center" color="white">
              PERSONAL PROJECTS
            </Typography>
            {(isAuthenticated || isTestAuthenticated) && edit ? (
              <IconButton onClick={addProject}>
                <AddCircle sx={{ mr: 1 }} style={{ color: "white" }} />
              </IconButton>
            ) : null}
            <Divider sx={{ backgroundColor: "white", borderBottomWidth: 4 }} />
            {[...projects]
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((project, idx) => (
                <Grid container key={idx}>
                  <Grid width="5%"></Grid>

                  <Grid
                    container
                    sx={{
                      backgroundColor: "white",
                      padding: "1rem",
                      margin:
                        idx !== projects.length - 1
                          ? "1rem 0"
                          : "1rem 0rem 0rem 0rem",
                      border: "thick double black",
                    }}
                    width="90%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid
                      container
                      direction="column"
                      width={isSmaller ? "80%" : "15%"}
                    >
                      {(!isAuthenticated && !isTestAuthenticated) || !edit ? (
                        <Typography
                          variant={isSmaller ? "h3" : "h4"}
                          textAlign="center"
                        >
                          <b>{project.title && project.title.toUpperCase()}</b>
                        </Typography>
                      ) : (
                        <TextField
                          fullWidth={true}
                          value={project.title || ""}
                          onChange={(e) => handleTextChange(e, "title", idx)}
                          label="Title"
                          sx={{ margin: "1rem 0rem" }}
                        ></TextField>
                      )}
                      <Grid
                        padding={isSmaller ? "1rem 0rem" : ".5rem 0rem"}
                        margin="0 auto"
                        width="100%"
                      >
                        {!isAuthenticated &&
                        !isTestAuthenticated &&
                        project.href ? (
                          <Button
                            href={project.href}
                            target={project.openNewTab ? "_blank" : null}
                            rel={project.openNewTab ? "noreffer" : null}
                            sx={{
                              padding: isSmaller ? "1rem 0rem" : ".5rem 0rem",
                            }}
                          >
                            <ProjectImage
                              projects={projects}
                              isSmaller={isSmaller}
                              edit={edit}
                              idx={idx}
                              handleTextChange={handleTextChange}
                              isAuthenticated={isAuthenticated}
                              isTestAuthenticated={isTestAuthenticated}
                              setProjects={setProjects}
                            ></ProjectImage>
                          </Button>
                        ) : (
                          <ProjectImage
                            projects={projects}
                            isSmaller={isSmaller}
                            edit={edit}
                            idx={idx}
                            handleTextChange={handleTextChange}
                            isAuthenticated={isAuthenticated}
                            isTestAuthenticated={isTestAuthenticated}
                            setProjects={setProjects}
                          ></ProjectImage>
                        )}
                        {(!isAuthenticated && !isTestAuthenticated) || !edit ? (
                          <Typography
                            variant={isSmaller ? "h3" : "h6"}
                            textAlign="center"
                          >
                            <b>{project.subtitle}</b>
                          </Typography>
                        ) : (
                          <TextField
                            fullWidth={true}
                            value={project.subtitle || ""}
                            onChange={(e) =>
                              handleTextChange(e, "subtitle", idx)
                            }
                            label="Subtitle"
                            sx={{ margin: "1rem 0rem" }}
                          ></TextField>
                        )}
                      </Grid>
                      <Typography
                        variant={isSmaller ? "h3" : "h6"}
                        textAlign="center"
                      ></Typography>
                    </Grid>
                    {(!isAuthenticated && !isTestAuthenticated) || !edit ? (
                      <Typography
                        variant={isSmaller ? null : "h5"}
                        width={isSmaller ? "100%" : "75%"}
                        paddingLeft={isSmaller ? "0rem" : "2rem"}
                        textAlign={isSmaller ? "center" : "left"}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(project.content),
                        }}
                      ></Typography>
                    ) : (
                      <Grid
                        width={isSmaller ? "100%" : "75%"}
                        paddingLeft={isSmaller ? null : "1rem"}
                      >
                        <WysiwygEditor
                          content={project.content}
                          onChange={(value) => handleContentChange(value, idx)}
                          options={["inline", "link"]}
                          expanded
                        />
                      </Grid>
                    )}

                    <Grid width="5%">
                      {(isAuthenticated || isTestAuthenticated) && edit && (
                        <IconButton onClick={() => removeProject(idx)}>
                          <RemoveCircle
                            sx={{ mr: 1 }}
                            style={{ color: "black" }}
                          />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                  {idx !== projects.length - 1 && (
                    <Grid width="95%" margin="0 auto">
                      <Divider
                        sx={{ backgroundColor: "white", borderBottomWidth: 2 }}
                      />
                      <Divider
                        sx={{ backgroundColor: "black", borderBottomWidth: 1 }}
                      />
                      <Divider
                        sx={{ backgroundColor: "white", borderBottomWidth: 2 }}
                      />
                    </Grid>
                  )}
                </Grid>
              ))}
          </Grid>
          {(isAuthenticated || isTestAuthenticated) && (
            <AuthButtons
              backgroundColor={"black"}
              topPadding={false}
              handleSaveOnClick={handleSaveOnClick}
              edit={edit}
              setEdit={setEdit}
            />
          )}
          <Footer backgroundColor="black"></Footer>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
