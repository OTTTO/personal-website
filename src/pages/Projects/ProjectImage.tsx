import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { CloudImages } from "components/CloudImages";
import React from "react";
import { s3ImagesURI } from "utils/constants";

export function ProjectImage({
  projects,
  isSmaller,
  edit,
  idx,
  handleTextChange,
  isAuthenticated,
  isTestAuthenticated,
  setProjects,
}) {
  const project = projects[idx];
  const [isChecked, setIsChecked] = React.useState(project.openNewTab);

  const checkboxOnChange = (idx: number) => {
    setIsChecked(!isChecked);
    const newProjects = structuredClone(projects);
    const newProject = structuredClone(newProjects[idx]);
    newProject.openNewTab = !isChecked;
    newProjects[idx] = newProject;
    setProjects(newProjects);
  };

  const handleSelectImage = (e, idx: number) => {
    const newProjects = structuredClone(projects);
    const newProject = structuredClone(newProjects[idx]);
    const img = e.target.currentSrc.split("/").pop();
    newProject.img = img;
    newProjects[idx] = newProject;
    setProjects(newProjects);
  };

  return (
    <Grid container direction="column" alignItems="center">
      {project.img && (
        <img
          src={project.img && `${s3ImagesURI}/${project.img}`}
          alt={
            (!isAuthenticated && !isTestAuthenticated) || !edit
              ? project.title
              : ""
          }
          className="projectImg"
        ></img>
      )}
      {(isAuthenticated || isTestAuthenticated) && edit && (
        <>
          <CloudImages
            isTestAuthenticated={isTestAuthenticated}
            handleSelectImage={handleSelectImage}
            paddingTop={true}
            idx={idx}
          ></CloudImages>

          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            paddingTop="1rem"
          >
            <Grid width={isSmaller ? "10%" : "100%"}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={() => checkboxOnChange(idx)}
                    sx={{ padding: ".5rem" }}
                  ></Checkbox>
                }
                label="New Tab"
              />
            </Grid>
            <Grid width={isSmaller ? "65%" : "100%"} sx={{ display: "block" }}>
              <TextField
                fullWidth
                value={project.href || ""}
                onChange={(e) => handleTextChange(e, "href", idx)}
                label="href"
              ></TextField>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
