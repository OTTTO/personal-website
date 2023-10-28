import { Divider, Grid, IconButton, ThemeProvider } from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import useWindowDimensions from "hooks/useWindowDimensions";
import projectsTheme from "themes/projectsTheme";
import {
  authenticationCheck,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import { useContext, useEffect } from "react";
import React from "react";
import { Loading } from "components/Loading";
import { ErrorPage } from "pages/Error/Error";
import { AddCircle } from "@mui/icons-material";
import { Project } from "types/project";
import { AuthButtons } from "components/AuthButtons";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import axios from "axios";
import { ThemeContext } from "context/theme";
import { getMainTheme } from "utils/utils";
import { Title } from "components/TItle";
import { ProjectItem } from "./ProjectItem";
import { TitleDivider } from "components/TitleDivider";

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
          <Menu backgroundColor="black" />
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
            <TitleDivider />
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

                                <ProjectItem
                                  projects={projects}
                                  setProjects={setProjects}
                                  project={project}
                                  idx={idx}
                                  isSmaller={isSmaller}
                                  isAuthenticated={isAuthenticated}
                                  isTestAuthenticated={isTestAuthenticated}
                                  edit={edit}
                                  handleTextChange={handleTextChange}
                                  handleContentChange={handleContentChange}
                                  removeProject={removeProject}
                                />
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
