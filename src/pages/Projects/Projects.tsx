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
import { useContext, useEffect } from "react";
import React from "react";
import { Loading } from "components/Loading";
import { ErrorPage } from "pages/Error/Error";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { ProjectImage } from "./ProjectImage";
import { Project } from "types/project";
import { AuthButtons } from "components/AuthButtons";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import axios from "axios";
import { ThemeContext } from "themes/context";
import { getMainTheme } from "utils/utils";
import { Link } from "react-router-dom";
import { Title } from "components/TItle";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();

export function Projects() {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

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
    const newProject = new Project();
    newProject.position = newProjects.length;
    newProjects.push(newProject);
    setProjects(newProjects);
  };

  const removeProject = (idx: number) => {
    let newProjects = structuredClone(projects);
    newProjects.splice(idx, 1);

    const sortedNewProjects = newProjects.sort(
      (a, b) => a.position - b.position
    );

    for (let i = 0; i < sortedNewProjects.length; i++) {
      sortedNewProjects[i].position = i;
    }
    setProjects(sortedNewProjects);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const sortedProjects = structuredClone(projects).sort(
      (a, b) => a.position - b.position
    );
    const [removed] = sortedProjects.splice(source.index, 1);
    sortedProjects.splice(destination.index, 0, removed);

    //reset positions
    for (let i = 0; i < sortedProjects.length; i++) {
      sortedProjects[i].position = i;
    }

    setProjects(sortedProjects);
  };

  const handleSaveOnClick = async () => {
    if (isTestAuthenticated) {
      localStorage.setItem("projects", JSON.stringify(projects));
    } else {
      await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/portfolio/projects/save`,
        { items: projects },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    }
    window.location.replace("/projects");
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/portfolio/projects`)
        .catch((err) => {
          setError(true);
        });
      if (resp && resp?.data?.items) {
        setProjects(resp.data.items);
      }
      setLoading(false);
    };
    if (!isTestAuthenticated) fetchData();
    else {
      setProjects(testProjects);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <Grid border="thick double black">
      <Grid border="white solid .25rem">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black"></Menu>
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            sx={{ background: getMainTheme(theme) }}
          >
            <Title title="PERSONAL PROJECTS" />
            {(isAuthenticated || isTestAuthenticated) && edit ? (
              <IconButton onClick={addProject}>
                <AddCircle sx={{ mr: 1 }} style={{ color: "white" }} />
              </IconButton>
            ) : null}
            <Divider sx={{ backgroundColor: "white", borderBottomWidth: 4 }} />
            <Grid>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {[...projects]
                        .sort((a, b) => a.position - b.position)
                        .map((project, idx) => (
                          <Draggable
                            draggableId={project.id}
                            index={idx}
                            key={project.id}
                            isDragDisabled={
                              (!isAuthenticated && !isTestAuthenticated) ||
                              !edit
                            }
                          >
                            {(provided, snapshot) => (
                              <Grid
                                container
                                key={idx}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={
                                  snapshot.isDragging ? "draggingListItem" : ""
                                }
                              >
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
                                  <Grid width={isSmaller ? "80%" : "15%"}>
                                    <Grid
                                      padding={
                                        isSmaller ? "0rem 0rem" : ".5rem 0rem"
                                      }
                                      margin="0 auto"
                                      width="auto"
                                    >
                                      {(!isAuthenticated &&
                                        !isTestAuthenticated) ||
                                      !edit ? (
                                        <Typography
                                          variant={isSmaller ? "h3" : "h4"}
                                          textAlign="center"
                                        >
                                          <b>
                                            {project.title &&
                                              project.title.toUpperCase()}
                                          </b>
                                        </Typography>
                                      ) : (
                                        <TextField
                                          fullWidth={true}
                                          value={project.title || ""}
                                          onChange={(e) =>
                                            handleTextChange(e, "title", idx)
                                          }
                                          label="Title"
                                          sx={{ margin: "1rem 0rem" }}
                                        ></TextField>
                                      )}
                                      {!isAuthenticated &&
                                      !isTestAuthenticated &&
                                      project.href ? (
                                        <Button
                                          {...{
                                            component: Link,
                                            to: project.href,
                                          }}
                                          target={
                                            project.openNewTab ? "_blank" : null
                                          }
                                          rel={
                                            project.openNewTab
                                              ? "noreffer"
                                              : null
                                          }
                                          sx={{
                                            padding: isSmaller
                                              ? "1rem 0rem"
                                              : ".5rem 0rem",
                                            display: "block",
                                          }}
                                        >
                                          <ProjectImage
                                            projects={projects}
                                            isSmaller={isSmaller}
                                            edit={edit}
                                            idx={idx}
                                            handleTextChange={handleTextChange}
                                            isAuthenticated={isAuthenticated}
                                            isTestAuthenticated={
                                              isTestAuthenticated
                                            }
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
                                          isTestAuthenticated={
                                            isTestAuthenticated
                                          }
                                          setProjects={setProjects}
                                        ></ProjectImage>
                                      )}
                                      {(!isAuthenticated &&
                                        !isTestAuthenticated) ||
                                      !edit ? (
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
                                  {(!isAuthenticated && !isTestAuthenticated) ||
                                  !edit ? (
                                    <Typography
                                      variant={isSmaller ? null : "h5"}
                                      width={isSmaller ? "100%" : "75%"}
                                      paddingLeft={isSmaller ? "0rem" : "2rem"}
                                      textAlign={isSmaller ? "center" : "left"}
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                          project.content
                                        ),
                                      }}
                                    ></Typography>
                                  ) : (
                                    <Grid
                                      width={isSmaller ? "100%" : "75%"}
                                      paddingLeft={isSmaller ? null : "1rem"}
                                      marginLeft={isSmaller ? null : "1rem"}
                                    >
                                      <WysiwygEditor
                                        content={project.content}
                                        onChange={(value) =>
                                          handleContentChange(value, idx)
                                        }
                                        options={["inline", "link"]}
                                        expanded
                                      />
                                    </Grid>
                                  )}

                                  <Grid
                                    width="5%"
                                    marginLeft={isSmaller ? null : "1rem"}
                                  >
                                    {(isAuthenticated || isTestAuthenticated) &&
                                      edit && (
                                        <IconButton
                                          onClick={() => removeProject(idx)}
                                        >
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
                                      sx={{
                                        backgroundColor: "white",
                                        borderBottomWidth: 2,
                                      }}
                                    />
                                    <Divider
                                      sx={{
                                        backgroundColor: "black",
                                        borderBottomWidth: 1,
                                      }}
                                    />
                                    <Divider
                                      sx={{
                                        backgroundColor: "white",
                                        borderBottomWidth: 2,
                                      }}
                                    />
                                  </Grid>
                                )}
                              </Grid>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Grid>
            {(isAuthenticated || isTestAuthenticated) && (
              <AuthButtons
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
