import {
  Box,
  Grid,
  Typography,
  ThemeProvider,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import resumeTheme from "themes/resumeTheme";
import reactIcon from "images/reactjs-icon.svg";
import nodeIcon from "images/nodejs-icon.svg";
import graphQlIcon from "images/graphql-icon.svg";
import { useMutation, useQuery } from "@apollo/client";
import { RESUME, UPDATE_RESUME } from "queries/resume";
import React, { useEffect } from "react";
import {
  Contact,
  Education,
  Experience,
  IEducation,
  IExperience,
  IResponsibility,
  IResume,
  ISkillGroup,
  Skills,
} from "./ResumeComponents";
import { AddCircle } from "@mui/icons-material";

const isAuthenticated = localStorage.getItem("token");

export function Resume() {
  const [skillGroupList, setSkillGroupList] = React.useState<ISkillGroup[]>();
  const [experienceList, setExperienceList] = React.useState<IExperience[]>();
  const [educationList, setEducationList] = React.useState<IEducation[]>();
  const resume: IResume = {
    skillGroups: skillGroupList,
    experience: experienceList,
    education: educationList,
  };

  const handleSkillGroupListChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    skillGroup: ISkillGroup,
    idx: number
  ) => {
    const newSkillGroup: ISkillGroup = structuredClone(skillGroup);
    if (e.target.id === "skillGroupName") {
      newSkillGroup.name = e.target.value;
    } else if (e.target.id === "skillGroupSkills") {
      newSkillGroup.skills = e.target.value;
    }
    const newSkillGroupList = structuredClone(skillGroupList);
    newSkillGroupList[idx] = newSkillGroup;
    setSkillGroupList(newSkillGroupList);
  };

  const handleExperienceListChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    experience: IExperience,
    idx: number
  ) => {
    const newExperience: IExperience = structuredClone(experience);
    if (e.target.id === "experienceRole") {
      newExperience.role = e.target.value;
    } else if (e.target.id === "experienceCompany") {
      newExperience.company = e.target.value;
    } else if (e.target.id === "experienceLocation") {
      newExperience.location = e.target.value;
    } else if (e.target.id === "experienceTime") {
      newExperience.time = e.target.value;
    }
    const newExperienceList = structuredClone(experienceList);
    newExperienceList[idx] = newExperience;
    setExperienceList(newExperienceList);
  };

  const handleResponsibilityListChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    responsibility: IResponsibility,
    expIdx: number,
    resIdx: number
  ) => {
    const newResponsibility: IResponsibility = structuredClone(responsibility);
    newResponsibility.details = e.target.value;
    const newExperienceList = structuredClone(experienceList);
    newExperienceList[expIdx].responsibilities[resIdx] = newResponsibility;
    setExperienceList(newExperienceList);
  };

  const handleEducationListChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    education: IEducation,
    idx: number
  ) => {
    const newEducation: IEducation = structuredClone(education);
    if (e.target.id === "educationInstitution") {
      newEducation.institution = e.target.value;
    } else if (e.target.id === "educationAchievement") {
      newEducation.achievement = e.target.value;
    } else if (e.target.id === "educationTime") {
      newEducation.time = e.target.value;
    }
    const newEducationList = structuredClone(educationList);
    newEducationList[idx] = newEducation;
    setEducationList(newEducationList);
  };

  const handleRemoveSkillGroup = (idx: number) => {
    const newSkillGroupList: ISkillGroup[] = structuredClone(skillGroupList);
    newSkillGroupList.splice(idx, 1);
    for (let i = 0; i < newSkillGroupList.length; i++) {
      newSkillGroupList[i].position = i;
    }
    setSkillGroupList(newSkillGroupList);
  };

  const handleRemoveExperience = (idx: number) => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);
    newExperienceList.splice(idx, 1);
    for (let i = 0; i < newExperienceList.length; i++) {
      newExperienceList[i].position = i;
    }
    setExperienceList(newExperienceList);
  };

  const handleRemoveResponsibility = (expIdx: number, resIdx: number) => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);
    newExperienceList[expIdx].responsibilities.splice(resIdx, 1);
    for (
      let i = 0;
      i < newExperienceList[expIdx].responsibilities.length;
      i++
    ) {
      newExperienceList[expIdx].responsibilities[i].position = i;
    }
    setExperienceList(newExperienceList);
  };

  const handleRemoveEducation = (idx: number) => {
    const newEducationList: IEducation[] = structuredClone(educationList);
    newEducationList.splice(idx, 1);
    for (let i = 0; i < newEducationList.length; i++) {
      newEducationList[i].position = i;
    }
    setEducationList(newEducationList);
  };

  const handleAddSkillGroup = () => {
    const newSkillGroupList: ISkillGroup[] = structuredClone(skillGroupList);
    newSkillGroupList.push({
      name: "",
      skills: "",
      position: skillGroupList.length,
    });
    setSkillGroupList(newSkillGroupList);
  };

  const handleAddExperience = () => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);
    newExperienceList.push({
      role: "",
      company: "",
      location: "",
      time: "",
      responsibilities: [{ details: "", position: 0 }],
      position: experienceList.length,
    });
    setExperienceList(newExperienceList);
  };

  const handleAddResponsibility = (expIdx: number) => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);
    const experience = newExperienceList[expIdx];
    experience.responsibilities.push({
      details: "",
      position: experienceList[expIdx].responsibilities.length,
    });
    setExperienceList(newExperienceList);
  };

  const handleAddEducation = () => {
    const newEducationList: IEducation[] = structuredClone(educationList);
    newEducationList.push({
      institution: "",
      achievement: "",
      time: "",
      position: educationList.length,
    });
    setEducationList(newEducationList);
  };

  const [updateResume] = useMutation(UPDATE_RESUME);
  const { data, loading, error } = useQuery(RESUME);

  useEffect(() => {
    if (!loading && data) {
      setSkillGroupList(data.resume.skillGroupList);
      setExperienceList(data.resume.experienceList);
      setEducationList(data.resume.educationList);
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <ThemeProvider theme={resumeTheme}>
      <Box
        padding="1rem 0rem 1rem 0rem"
        sx={{ backgroundColor: "black", position: "relative" }}
      >
        <Grid
          container={true}
          justifyContent="space-between"
          sx={{ position: "absolute", top: 0 }}
        >
          <img
            src={reactIcon}
            className="App-logo-left"
            alt="react-icon"
            width="10%"
          />
          <img
            src={reactIcon}
            className="App-logo-right"
            alt="react-icon"
            width="10%"
          />
        </Grid>
        <Grid
          container={true}
          justifyContent="space-between"
          sx={{ position: "absolute", bottom: "42%" }}
        >
          <img
            src={graphQlIcon}
            className="App-logo-left"
            alt="graphql-icon"
            width="10%"
          />
          <img
            src={graphQlIcon}
            className="App-logo-right"
            alt="graphql-icon"
            width="10%"
          />
        </Grid>
        <Grid
          container={true}
          justifyContent="space-between"
          sx={{ position: "absolute", bottom: "1rem" }}
        >
          <img
            src={nodeIcon}
            className="App-logo-left"
            alt="node-icon"
            width="10%"
          />
          <img
            src={nodeIcon}
            className="App-logo-right"
            alt="node-icon"
            width="10%"
          />
        </Grid>
        <Box
          padding="1rem"
          sx={{ margin: "auto", width: "55%", backgroundColor: "white" }}
        >
          {isAuthenticated && (
            <>
              <Stack direction="row" sx={{ float: "right" }} spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    updateResume({ variables: { resume } });
                    window.location.replace("/resume");
                  }}
                >
                  SAVE
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.replace("/");
                  }}
                >
                  LOGOUT
                </Button>
              </Stack>
            </>
          )}
          <Contact />
          <Stack direction="row">
            <Typography variant="h4" padding="1rem">
              TECHNICAL SKILLS
            </Typography>
            {isAuthenticated && (
              <IconButton onClick={handleAddSkillGroup}>
                <AddCircle sx={{ mr: 1 }} />
              </IconButton>
            )}
          </Stack>
          <Skills
            skillGroupList={skillGroupList || data.resume.skillGroupList}
            handleChange={handleSkillGroupListChange}
            removeGroup={handleRemoveSkillGroup}
          />
          <Stack direction="row">
            <Typography variant="h4" padding="1rem">
              PROFESSIONAL EXPERIENCE
            </Typography>
            {isAuthenticated && (
              <IconButton onClick={handleAddExperience}>
                <AddCircle sx={{ mr: 1 }} />
              </IconButton>
            )}
          </Stack>
          <Experience
            experienceList={experienceList || data.resume.experienceList}
            handleExperienceChange={handleExperienceListChange}
            handleResponsibilityChange={handleResponsibilityListChange}
            removeExperience={handleRemoveExperience}
            addResponsibility={handleAddResponsibility}
            removeResponsibility={handleRemoveResponsibility}
          />
          <Stack direction="row">
            <Typography variant="h4" padding="1rem">
              EDUCATION
            </Typography>
            {isAuthenticated && (
              <IconButton onClick={handleAddEducation}>
                <AddCircle sx={{ mr: 1 }} />
              </IconButton>
            )}
          </Stack>
          <Education
            educationList={educationList || data.resume.educationList}
            handleChange={handleEducationListChange}
            removeEducation={handleRemoveEducation}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Resume;
