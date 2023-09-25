import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ProjectImage } from "./ProjectImage";
import { WysiwygEditor } from "components/WysiwygEditor";
import { RemoveCircle } from "@mui/icons-material";
import * as DOMPurify from "dompurify";
import { Link } from "react-router-dom";

export function ProjectItem({
  projects,
  setProjects,
  project,
  idx,
  isSmaller,
  isAuthenticated,
  isTestAuthenticated,
  edit,
  handleTextChange,
  handleContentChange,
  removeProject,
}) {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "white",
        padding: "1rem",
        margin: idx !== projects.length - 1 ? "1rem 0" : "1rem 0rem 0rem 0rem",
        border: "thick double black",
        borderRadius: "10px",
      }}
      width="90%"
      alignItems="center"
      justifyContent="center"
    >
      <Grid width={isSmaller ? "80%" : "15%"}>
        <Grid
          padding={isSmaller ? "0rem 0rem" : ".5rem 0rem"}
          margin="0 auto"
          width="auto"
        >
          {(!isAuthenticated && !isTestAuthenticated) || !edit ? (
            <Typography variant={isSmaller ? "h3" : "h4"} textAlign="center">
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
          {!isAuthenticated && !isTestAuthenticated && project.href ? (
            <Button
              {...{
                component: Link,
                to: project.href,
              }}
              target={project.openNewTab ? "_blank" : null}
              rel={project.openNewTab ? "noreffer" : null}
              sx={{
                padding: isSmaller ? "1rem 0rem" : ".5rem 0rem",
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
            <Typography variant={isSmaller ? "h3" : "h6"} textAlign="center">
              <b>{project.subtitle}</b>
            </Typography>
          ) : (
            <TextField
              fullWidth={true}
              value={project.subtitle || ""}
              onChange={(e) => handleTextChange(e, "subtitle", idx)}
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
          fontSize={isSmaller ? "1.1rem" : "1.6rem"}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(project.content),
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
            onChange={(value) => handleContentChange(value, idx)}
            options={["inline", "link"]}
            expanded
          />
        </Grid>
      )}

      <Grid width="5%" marginLeft={isSmaller ? null : "1rem"}>
        {(isAuthenticated || isTestAuthenticated) && edit && (
          <IconButton onClick={() => removeProject(idx)}>
            <RemoveCircle sx={{ mr: 1 }} style={{ color: "black" }} />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
}
