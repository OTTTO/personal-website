import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Fab,
  ThemeProvider,
  TextField,
  Button,
} from "@mui/material";
import { ExpandMore, MailOutline, GitHub } from "@mui/icons-material";
import resumeTheme from "themes/resumeTheme";
import reactIcon from "images/reactjs-icon.svg";
import nodeIcon from "images/nodejs-icon.svg";
import graphQlIcon from "images/graphql-icon.svg";
import { useMutation, useQuery } from "@apollo/client";
import { RESUME, UPDATE_RESUME } from "queries/resume";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";

const isAuthenticated = localStorage.getItem("token");

function Contact() {
  return (
    <Box>
      <Typography variant="h1"> Dylan Beckwith </Typography>
      <Typography variant="h3"> Software Engineer </Typography>
      <Fab
        variant="extended"
        href="mailto:contact.dylanbeckwith@gmail.com"
        sx={{ margin: "1rem 1rem 0rem 0rem" }}
      >
        <MailOutline sx={{ mr: 1 }} />
        <Typography variant="h6"> contact.dylan.beckwith@gmail.com </Typography>
      </Fab>
      <Fab
        variant="extended"
        href="https://www.github.com/OTTTO"
        sx={{ margin: "1rem 1rem 0rem 0rem" }}
      >
        <GitHub sx={{ mr: 1 }} />
        <Typography variant="h6"> github.com/OTTTO </Typography>
      </Fab>

      <Typography variant="h6"> </Typography>
    </Box>
  );
}

interface ISkillGroup {
  id?: string;
  name: string;
  skills: string;
}

function Skills({ skillGroupList, handleChange }) {
  return (
    <>
      {skillGroupList.map((skillGroup: ISkillGroup, idx: number) => (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            {!isAuthenticated ? (
              <Typography>
                <b>{skillGroup.name}</b>
              </Typography>
            ) : (
              <TextField
                id="skillGroupName"
                inputProps={{ className: "test" }}
                defaultValue={skillGroup.name}
                onChange={(e) => handleChange(e, skillGroup, idx)}
              ></TextField>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {!isAuthenticated ? (
              <Typography>{skillGroup.skills}</Typography>
            ) : (
              <TextField
                id="skillGroupSkills"
                defaultValue={skillGroup.skills}
                onChange={(e) => handleChange(e, skillGroup, idx)}
              ></TextField>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

interface RoleInfoProps {
  role: string;
  company: string;
  location: string;
  time: string;
}

function RoleInfo({ role, company, location, time }: RoleInfoProps) {
  return (
    <>
      <Typography variant="subtitle2">
        <b>
          <i>{role}</i>, {company}
        </b>
      </Typography>
      <Typography variant="subtitle2">
        <b>
          {location}, {time}
        </b>
      </Typography>
    </>
  );
}

interface IExperience {
  id?: string;
  role: string;
  company: string;
  location: string;
  time: string;
  responsibilities: IResponsibility[];
}

interface IResponsibility {
  id?: string;
  details: string;
}

function Experience({
  experienceList,
  handleExperienceChange,
  handleResponsibilityChange,
}) {
  return (
    <>
      {experienceList.map((experience: IExperience, expIdx: number) => (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            {!isAuthenticated ? (
              <Typography>
                <b>
                  <RoleInfo
                    role={experience.role}
                    company={experience.company}
                    location={experience.location}
                    time={experience.time}
                  />
                </b>
              </Typography>
            ) : (
              <Stack direction="row">
                <TextField
                  id="experienceRole"
                  defaultValue={experience.role}
                  onChange={(e) =>
                    handleExperienceChange(e, experience, expIdx)
                  }
                ></TextField>
                <TextField
                  id="experienceCompany"
                  defaultValue={experience.company}
                  onChange={(e) =>
                    handleExperienceChange(e, experience, expIdx)
                  }
                ></TextField>
                <TextField
                  id="experienceLocation"
                  defaultValue={experience.location}
                  onChange={(e) =>
                    handleExperienceChange(e, experience, expIdx)
                  }
                ></TextField>
                <TextField
                  id="experienceTime"
                  defaultValue={experience.time}
                  onChange={(e) =>
                    handleExperienceChange(e, experience, expIdx)
                  }
                ></TextField>
              </Stack>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {!isAuthenticated ? (
              <Typography>
                {experience.responsibilities.map(
                  (responsibility: IResponsibility, index: number) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: responsibility.details,
                      }}
                    />
                  )
                )}
              </Typography>
            ) : (
              <Stack>
                {experience.responsibilities.map(
                  (responsibility: IResponsibility, resIdx) => (
                    <TextField
                      id="responsibility"
                      multiline
                      defaultValue={responsibility.details}
                      onChange={(e) =>
                        handleResponsibilityChange(
                          e,
                          responsibility,
                          expIdx,
                          resIdx
                        )
                      }
                    ></TextField>
                  )
                )}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

interface EducationItemProps {
  institution: string;
  achievement: string;
  time: string;
}

interface IEducation extends EducationItemProps {
  id?: string;
}

function EducationItem({ institution, achievement, time }: EducationItemProps) {
  return (
    <Grid container={true} justifyContent="space-between">
      <Typography align="left">
        <b>{institution}</b> - {achievement}
      </Typography>
      <Typography align="right">
        <b>{time}</b>
      </Typography>
    </Grid>
  );
}

function Education({ educationList, handleChange }) {
  return (
    <>
      {!isAuthenticated
        ? educationList.map((education: IEducation, idx: number) => {
            return (
              <>
                <EducationItem
                  institution={education.institution}
                  achievement={education.achievement}
                  time={education.time}
                />
                {idx + 1 < educationList.length && <Divider />}
              </>
            );
          })
        : educationList.map((education: IEducation, idx: number) => {
            return (
              <Stack direction="row">
                <TextField
                  id="educationInstitution"
                  defaultValue={education.institution}
                  onChange={(e) => handleChange(e, education, idx)}
                ></TextField>
                <TextField
                  id="educationAchievement"
                  defaultValue={education.achievement}
                  onChange={(e) => handleChange(e, education, idx)}
                ></TextField>
                <TextField
                  id="educationTime"
                  defaultValue={education.time}
                  onChange={(e) => handleChange(e, education, idx)}
                ></TextField>
              </Stack>
            );
          })}
    </>
  );
}

export interface IResume {
  skillGroups: ISkillGroup[];
  experience: IExperience[];
  education: IEducation[];
}

function Resume() {
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
    console.log(`res: ${JSON.stringify(responsibility)}`);
    newResponsibility.details = e.target.value;
    const newExperienceList = structuredClone(experienceList);
    console.log(`new res:${JSON.stringify(newResponsibility)}`);
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
            <Button
              variant="contained"
              sx={{ float: "right" }}
              onClick={() => updateResume({ variables: { resume } })}
            >
              SAVE
            </Button>
          )}
          <Contact />
          <Typography variant="h4" padding="1rem">
            TECHNICAL SKILLS
          </Typography>
          <Skills
            skillGroupList={skillGroupList || data.resume.skillGroupList}
            handleChange={handleSkillGroupListChange}
          />
          <Typography variant="h4" padding="1rem">
            PROFESSIONAL EXPERIENCE
          </Typography>
          <Experience
            experienceList={experienceList || data.resume.experienceList}
            handleExperienceChange={handleExperienceListChange}
            handleResponsibilityChange={handleResponsibilityListChange}
          />
          <Typography variant="h4" padding="1rem">
            EDUCATION
          </Typography>
          <Education
            educationList={educationList || data.resume.educationList}
            handleChange={handleEducationListChange}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Resume;
