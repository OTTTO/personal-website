import {
  Box,
  Grid,
  Typography,
  ThemeProvider,
  Button,
  IconButton,
  Stack,
  Fab,
  Accordion,
  AccordionSummary,
  TextField,
  AccordionDetails,
  Divider,
} from "@mui/material";
import mainTheme from "themes/mainTheme";
import reactIcon from "images/reactjs-icon.svg";
import nodeIcon from "images/nodejs-icon.svg";
import graphQlIcon from "images/graphql-icon.svg";
import { useMutation, useQuery } from "@apollo/client";
import { RESUME, UPDATE_RESUME } from "queries/resume";
import React, { useEffect } from "react";
import {
  AddCircle,
  ExpandMore,
  GitHub,
  MailOutline,
  RemoveCircle,
} from "@mui/icons-material";
import { v4 as uuid } from "uuid";
import { Menu } from "components/Menu";
import { Footer } from "components/Footer";
import {
  IEducation,
  IExperience,
  IResponsibility,
  IResume,
  ISkillGroup,
} from "types/resume";
import { LogoutButton } from "components/LogoutButton";
import { authenticationCheck } from "utils/utils";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = !!localStorage.getItem("testToken");
const header = { name: "", title: "" };

export function Resume() {
  const [resumeHeader, setResumeHeader] = React.useState(header);
  const [skillGroupList, setSkillGroupList] = React.useState<ISkillGroup[]>([]);
  const [experienceList, setExperienceList] = React.useState<IExperience[]>([]);
  const [educationList, setEducationList] = React.useState<IEducation[]>([]);
  const resume: IResume = {
    resumeHeader: resumeHeader,
    skillGroups: skillGroupList,
    experience: experienceList,
    education: educationList,
  };

  const getResume = (): IResume => {
    return JSON.parse(localStorage.getItem("resume"));
  };

  const getTestEdit = (): boolean => {
    return JSON.parse(localStorage.getItem("testEdit"));
  };

  const [canSubmitArr, setCanSubmitArr] = React.useState<boolean[]>([]);

  const updateErrorCount = (oldString: string, newString: string) => {
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    if (oldString.length > 0 && newString.length === 0) {
      newCanSubmitArr.push(true);
    } else if (oldString.length === 0 && newString.length > 0) {
      newCanSubmitArr.pop();
    }
    setCanSubmitArr(newCanSubmitArr);
  };

  const handleResumeHeaderNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResumeHeader({
      ...resumeHeader,
      name: e.target.value,
    });
    updateErrorCount(resumeHeader.name, e.target.value);
  };

  const handleResumeHeaderTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResumeHeader({
      ...resumeHeader,
      title: e.target.value,
    });
    updateErrorCount(resumeHeader.title, e.target.value);
  };

  const handleSkillGroupListChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    skillGroup: ISkillGroup,
    idx: number
  ) => {
    const newSkillGroup: ISkillGroup = structuredClone(skillGroup);
    if (e.target.id === "skillGroupName") {
      newSkillGroup.name = e.target.value;
      updateErrorCount(skillGroup.name, newSkillGroup.name);
    } else if (e.target.id === "skillGroupSkills") {
      newSkillGroup.skills = e.target.value;
      updateErrorCount(skillGroup.skills, newSkillGroup.skills);
    }
    const newSkillGroupList = structuredClone(skillGroupList);
    newSkillGroupList[idx] = newSkillGroup;
    setSkillGroupList(newSkillGroupList);
  };

  const handleExperienceListChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    experience: IExperience,
    idx: number
  ) => {
    const newExperience: IExperience = structuredClone(experience);
    if (e.target.id === "experienceRole") {
      newExperience.role = e.target.value;
      updateErrorCount(experience.role, newExperience.role);
    } else if (e.target.id === "experienceCompany") {
      newExperience.company = e.target.value;
      updateErrorCount(experience.company, newExperience.company);
    } else if (e.target.id === "experienceLocation") {
      newExperience.location = e.target.value;
      updateErrorCount(experience.location, newExperience.location);
    } else if (e.target.id === "experienceTime") {
      newExperience.time = e.target.value;
      updateErrorCount(experience.time, newExperience.time);
    }
    const newExperienceList = structuredClone(experienceList);
    newExperienceList[idx] = newExperience;
    setExperienceList(newExperienceList);
  };

  const handleResponsibilityListChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    responsibility: IResponsibility,
    expIdx: number,
    resIdx: number
  ) => {
    const newResponsibility: IResponsibility = structuredClone(responsibility);
    newResponsibility.details = e.target.value;
    updateErrorCount(responsibility.details, newResponsibility.details);
    const newExperienceList = structuredClone(experienceList);
    newExperienceList[expIdx].responsibilities[resIdx] = newResponsibility;
    setExperienceList(newExperienceList);
  };

  const handleEducationListChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    education: IEducation,
    idx: number
  ) => {
    const newEducation: IEducation = structuredClone(education);
    if (e.target.id === "educationInstitution") {
      newEducation.institution = e.target.value;
      updateErrorCount(education.institution, newEducation.institution);
    } else if (e.target.id === "educationAchievement") {
      newEducation.achievement = e.target.value;
      updateErrorCount(education.achievement, newEducation.achievement);
    } else if (e.target.id === "educationTime") {
      newEducation.time = e.target.value;
      updateErrorCount(education.time, newEducation.time);
    }
    const newEducationList = structuredClone(educationList);
    newEducationList[idx] = newEducation;
    setEducationList(newEducationList);
  };

  const handleRemoveSkillGroup = (idx: number) => {
    const newSkillGroupList: ISkillGroup[] = structuredClone(skillGroupList);

    //Reset Position
    for (let i = 0; i < newSkillGroupList.length; i++) {
      newSkillGroupList[i].position = i;
    }

    //Splice removed element out of array and remove error count from canSubmitArr
    const skillGroup: ISkillGroup = newSkillGroupList.splice(idx, 1)[0];
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);

    for (const property in skillGroup) {
      if (skillGroup[property].length === 0) {
        newCanSubmitArr.pop();
      }
    }

    setCanSubmitArr(newCanSubmitArr);
    setSkillGroupList(newSkillGroupList);
  };

  const handleRemoveExperience = (idx: number) => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);

    //Reset Position
    for (let i = 0; i < newExperienceList.length; i++) {
      newExperienceList[i].position = i;
    }

    //Splice removed element out of array and remove error count from canSubmitArr
    const experience: IExperience = newExperienceList.splice(idx, 1)[0];
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);

    for (const property in experience) {
      if (experience[property].length === 0) {
        newCanSubmitArr.pop();
      }
    }

    // Account for responsibilities
    for (const responsbility of experience.responsibilities) {
      if (responsbility.details.length === 0) {
        newCanSubmitArr.pop();
      }
    }

    setCanSubmitArr(newCanSubmitArr);
    setExperienceList(newExperienceList);
  };

  const handleRemoveResponsibility = (expIdx: number, resIdx: number) => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);

    //Reset Position
    for (
      let i = 0;
      i < newExperienceList[expIdx].responsibilities.length;
      i++
    ) {
      newExperienceList[expIdx].responsibilities[i].position = i;
    }

    //Splice removed element out of array and remove error count from canSubmitArr
    const responsbility: IResponsibility = newExperienceList[
      expIdx
    ].responsibilities.splice(resIdx, 1)[0];
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);

    if (responsbility.details.length === 0) {
      newCanSubmitArr.pop();
    }

    setCanSubmitArr(newCanSubmitArr);
    setExperienceList(newExperienceList);
  };

  const handleRemoveEducation = (idx: number) => {
    const newEducationList: IEducation[] = structuredClone(educationList);

    //Reset Position
    for (let i = 0; i < newEducationList.length; i++) {
      newEducationList[i].position = i;
    }

    //Splice removed element out of array and remove error count from canSubmitArr
    const education: IEducation = newEducationList.splice(idx, 1)[0];
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);

    for (const property in education) {
      if (education[property].length === 0) {
        newCanSubmitArr.pop();
      }
    }

    setCanSubmitArr(newCanSubmitArr);
    setEducationList(newEducationList);
  };

  const handleAddSkillGroup = () => {
    const newSkillGroupList: ISkillGroup[] = structuredClone(skillGroupList);
    newSkillGroupList.push({
      id: uuid(),
      name: "",
      skills: "",
      position: skillGroupList.length,
    });

    //Add error count to canSubmitArr
    const emptyFieldCount = 2;
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    for (let i = 0; i < emptyFieldCount; i++) {
      newCanSubmitArr.push(true);
    }
    setCanSubmitArr(newCanSubmitArr);
    setSkillGroupList(newSkillGroupList);
  };

  const handleAddExperience = () => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);
    newExperienceList.push({
      id: uuid(),
      role: "",
      company: "",
      location: "",
      time: "",
      responsibilities: [{ id: uuid(), details: "", position: 0 }],
      position: experienceList.length,
    });

    //Add error count to canSubmitArr
    const emptyFieldCount = 5;
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    for (let i = 0; i < emptyFieldCount; i++) {
      newCanSubmitArr.push(true);
    }
    setCanSubmitArr(newCanSubmitArr);
    setExperienceList(newExperienceList);
  };

  const handleAddResponsibility = (expIdx: number) => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);
    const experience = newExperienceList[expIdx];
    experience.responsibilities.push({
      id: uuid(),
      details: "",
      position: experienceList[expIdx].responsibilities.length,
    });

    //Add error count to canSubmitArr
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    newCanSubmitArr.push(true);
    setCanSubmitArr(newCanSubmitArr);
    setExperienceList(newExperienceList);
  };

  const handleAddEducation = () => {
    const newEducationList: IEducation[] = structuredClone(educationList);
    newEducationList.push({
      id: uuid(),
      institution: "",
      achievement: "",
      time: "",
      position: educationList.length,
    });

    //Add error count to canSubmitArr
    const emptyFieldCount = 3;
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    for (let i = 0; i < emptyFieldCount; i++) {
      newCanSubmitArr.push(true);
    }
    setCanSubmitArr(newCanSubmitArr);
    setEducationList(newEducationList);
  };

  const [updateResume] = useMutation(UPDATE_RESUME);
  const { data, loading, error } = useQuery(RESUME);

  useEffect(() => {
    if (!loading && data) {
      setResumeHeader(
        isTestAuthenticated
          ? getResume().resumeHeader
          : data.resume.resumeHeader
      );
      setSkillGroupList(
        isTestAuthenticated
          ? getResume().skillGroups
          : data.resume.skillGroupList
      );
      setExperienceList(
        isTestAuthenticated
          ? getResume().experience
          : data.resume.experienceList
      );
      setEducationList(
        isTestAuthenticated ? getResume().education : data.resume.educationList
      );
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const backgroundColor = "black";

  return (
    <ThemeProvider theme={mainTheme}>
      <Menu backgroundColor={backgroundColor} />
      <Grid
        padding="1rem 0rem 1rem 0rem"
        sx={{ backgroundColor: "black", position: "relative" }}
      >
        <Grid justifyContent="space-between">
          <Grid
            item
            xs={2}
            container={true}
            justifyContent="space-between"
            direction="column"
            height="100%"
            sx={{ position: "absolute", left: "0rem", marginLeft: "2%" }}
          >
            <Grid item>
              <img
                src={reactIcon}
                className="App-logo-left"
                alt="react-icon"
                width="80%"
              />
            </Grid>
            <Grid item>
              <img
                src={graphQlIcon}
                className="App-logo-left"
                alt="graphql-icon"
                width="80%"
              />
            </Grid>
            <Grid item>
              <img
                src={nodeIcon}
                className="App-logo-left"
                alt="node-icon"
                width="80%"
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            container={true}
            justifyContent="space-between"
            direction="column"
            height="100%"
            sx={{ position: "absolute", right: "0rem", marginRight: "1%" }}
          >
            <img
              src={reactIcon}
              className="App-logo-right"
              alt="react-icon"
              width="80%"
            />
            <img
              src={graphQlIcon}
              className="App-logo-right"
              alt="graphql-icon"
              width="80%"
            />

            <img
              src={nodeIcon}
              className="App-logo-right"
              alt="node-icon"
              width="80%"
            />
          </Grid>
        </Grid>
        <Box
          padding="1rem"
          sx={{ margin: "auto", width: "55%", backgroundColor: "white" }}
        >
          {isAuthenticated || isTestAuthenticated ? (
            <Stack direction="row" sx={{ float: "right" }} spacing={2}>
              <Button
                variant="contained"
                sx={{ height: "2rem" }}
                onClick={async () => {
                  if (isTestAuthenticated) {
                    localStorage.setItem("resume", JSON.stringify(resume));
                  } else {
                    await updateResume({
                      variables: { resume },
                    });
                  }
                  window.location.replace("/resume");
                }}
                disabled={canSubmitArr.length > 0}
              >
                SAVE
              </Button>
              {isTestAuthenticated && getTestEdit() && (
                <Button
                  variant="contained"
                  sx={{ height: "2rem" }}
                  color="success"
                  onClick={() => {
                    localStorage.setItem("testEdit", "false");
                    window.location.replace("/resume");
                  }}
                >
                  VIEW
                </Button>
              )}
              {isTestAuthenticated && !getTestEdit() && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    localStorage.setItem("testEdit", "true");
                    window.location.replace("/resume");
                  }}
                >
                  EDIT
                </Button>
              )}
              {isTestAuthenticated && <LogoutButton replaceUrl="/resume" />}
            </Stack>
          ) : null}
          <Box>
            {isAuthenticated || (isTestAuthenticated && getTestEdit()) ? (
              <Grid>
                <TextField
                  error={resumeHeader.name.length === 0}
                  fullWidth={true}
                  defaultValue={
                    resumeHeader.name || data.resume.resumeHeader.name
                  }
                  onChange={handleResumeHeaderNameChange}
                  label="Name"
                ></TextField>
                <br></br>
                <br></br>
                <TextField
                  error={resumeHeader.title.length === 0}
                  fullWidth={true}
                  defaultValue={
                    resumeHeader.title || data.resume.resumeHeader.title
                  }
                  onChange={handleResumeHeaderTitleChange}
                  label="Title"
                ></TextField>
              </Grid>
            ) : (
              <Grid>
                <Typography variant="h1">
                  {resumeHeader.name || data.resume.resumeHeader.name}
                </Typography>
                <Typography variant="h3">
                  {resumeHeader.title || data.resume.resumeHeader.title}
                </Typography>
              </Grid>
            )}
            <Fab
              variant="extended"
              href="mailto:contact.dylanbeckwith@gmail.com"
              sx={{ margin: "1rem 1rem 0rem 0rem" }}
            >
              <MailOutline sx={{ mr: 1 }} />
              <Typography variant="h6">
                contact.dylan.beckwith@gmail.com
              </Typography>
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
          <Stack direction="row">
            <Typography variant="h4" padding="1rem">
              TECHNICAL SKILLS
            </Typography>
            {isAuthenticated || (isTestAuthenticated && getTestEdit()) ? (
              <IconButton onClick={handleAddSkillGroup}>
                <AddCircle sx={{ mr: 1 }} />
              </IconButton>
            ) : null}
          </Stack>
          {structuredClone(skillGroupList || data.resume.skillGroupList)
            .sort((a, b) => a.position - b.position)
            .map((skillGroup: ISkillGroup, idx: number) => {
              return (
                <Stack direction="row" key={skillGroup.id}>
                  <Accordion sx={{ width: "100%" }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      {isAuthenticated ||
                      (isTestAuthenticated && getTestEdit()) ? (
                        <TextField
                          id="skillGroupName"
                          error={skillGroup.name.length === 0}
                          fullWidth={true}
                          inputProps={{ className: "test" }}
                          defaultValue={skillGroup.name}
                          onChange={(e) =>
                            handleSkillGroupListChange(e, skillGroup, idx)
                          }
                          label="Skill Group"
                        ></TextField>
                      ) : (
                        <Typography>
                          <b>{skillGroup.name}</b>
                        </Typography>
                      )}
                    </AccordionSummary>
                    <AccordionDetails>
                      {isAuthenticated ||
                      (isTestAuthenticated && getTestEdit()) ? (
                        <TextField
                          id="skillGroupSkills"
                          error={skillGroup.skills.length === 0}
                          fullWidth={true}
                          defaultValue={skillGroup.skills}
                          onChange={(e) =>
                            handleSkillGroupListChange(e, skillGroup, idx)
                          }
                          label="Skills"
                        ></TextField>
                      ) : (
                        <Typography>{skillGroup.skills}</Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  {isAuthenticated || (isTestAuthenticated && getTestEdit()) ? (
                    <IconButton onClick={() => handleRemoveSkillGroup(idx)}>
                      <RemoveCircle sx={{ mr: 1 }} />
                    </IconButton>
                  ) : null}
                </Stack>
              );
            })}
          <Stack direction="row">
            <Typography variant="h4" padding="1rem">
              PROFESSIONAL EXPERIENCE
            </Typography>
            {isAuthenticated || (isTestAuthenticated && getTestEdit()) ? (
              <IconButton onClick={handleAddExperience}>
                <AddCircle sx={{ mr: 1 }} />
              </IconButton>
            ) : null}
          </Stack>
          {structuredClone(experienceList || data.resume.experienceList)
            .sort((a, b) => a.position - b.position)
            .map((experience: IExperience, expIdx: number) => (
              <Accordion key={experience.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  {isAuthenticated || (isTestAuthenticated && getTestEdit()) ? (
                    <Stack direction="row">
                      <TextField
                        id="experienceRole"
                        error={experience.role.length === 0}
                        defaultValue={experience.role}
                        onChange={(e) =>
                          handleExperienceListChange(e, experience, expIdx)
                        }
                        label="Role"
                      ></TextField>
                      <TextField
                        id="experienceCompany"
                        error={experience.company.length === 0}
                        defaultValue={experience.company}
                        onChange={(e) =>
                          handleExperienceListChange(e, experience, expIdx)
                        }
                        label="Company"
                      ></TextField>
                      <TextField
                        id="experienceLocation"
                        error={experience.location.length === 0}
                        defaultValue={experience.location}
                        onChange={(e) =>
                          handleExperienceListChange(e, experience, expIdx)
                        }
                        label="Location"
                      ></TextField>
                      <TextField
                        id="experienceTime"
                        error={experience.time.length === 0}
                        defaultValue={experience.time}
                        onChange={(e) =>
                          handleExperienceListChange(e, experience, expIdx)
                        }
                        label="Time"
                      ></TextField>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddResponsibility(expIdx);
                        }}
                      >
                        <AddCircle sx={{ mr: 1 }} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleRemoveExperience(expIdx)}
                      >
                        <RemoveCircle sx={{ mr: 1 }} />
                      </IconButton>
                    </Stack>
                  ) : (
                    <Box>
                      <Typography variant="subtitle2">
                        <b>
                          <i>{experience.role}</i>, {experience.company}
                        </b>
                      </Typography>
                      <Typography variant="subtitle2">
                        <b>
                          {experience.location} : {experience.time}
                        </b>
                      </Typography>
                    </Box>
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  {experience.responsibilities
                    .sort((a, b) => a.position - b.position)
                    .map((responsibility: IResponsibility, resIdx: number) => {
                      return isAuthenticated ||
                        (isTestAuthenticated && getTestEdit()) ? (
                        <Stack key={responsibility.id}>
                          {resIdx > 0 && <br></br>}
                          <Stack direction="row">
                            <TextField
                              id="responsibility"
                              error={responsibility.details.length === 0}
                              fullWidth={true}
                              multiline
                              defaultValue={responsibility.details}
                              onChange={(e) =>
                                handleResponsibilityListChange(
                                  e,
                                  responsibility,
                                  expIdx,
                                  resIdx
                                )
                              }
                              label="Responsibility"
                            ></TextField>
                            <IconButton
                              onClick={() =>
                                handleRemoveResponsibility(expIdx, resIdx)
                              }
                            >
                              <RemoveCircle sx={{ mr: 1 }} />
                            </IconButton>
                          </Stack>
                        </Stack>
                      ) : (
                        <Typography key={responsibility.id}>
                          <li
                            key={resIdx}
                            dangerouslySetInnerHTML={{
                              __html: responsibility.details,
                            }}
                          />
                        </Typography>
                      );
                    })}
                </AccordionDetails>
              </Accordion>
            ))}
          <Stack direction="row">
            <Typography variant="h4" padding="1rem">
              EDUCATION
            </Typography>
            {isAuthenticated || (isTestAuthenticated && getTestEdit()) ? (
              <IconButton onClick={handleAddEducation}>
                <AddCircle sx={{ mr: 1 }} />
              </IconButton>
            ) : null}
          </Stack>
          {structuredClone(educationList || data.resume.educationList)
            .sort((a, b) => a.position - b.position)
            .map((education: IEducation, idx: number) => {
              return isAuthenticated ||
                (isTestAuthenticated && getTestEdit()) ? (
                <Stack direction="column" key={education.id}>
                  {idx > 0 && <br></br>}
                  <Stack direction="row">
                    <TextField
                      id="educationInstitution"
                      error={education.institution.length === 0}
                      defaultValue={education.institution}
                      onChange={(e) =>
                        handleEducationListChange(e, education, idx)
                      }
                      label="Institution"
                    ></TextField>
                    <TextField
                      id="educationAchievement"
                      error={education.achievement.length === 0}
                      defaultValue={education.achievement}
                      onChange={(e) =>
                        handleEducationListChange(e, education, idx)
                      }
                      label="Achievement"
                    ></TextField>
                    <TextField
                      id="educationTime"
                      error={education.time.length === 0}
                      defaultValue={education.time}
                      onChange={(e) =>
                        handleEducationListChange(e, education, idx)
                      }
                      label="Time"
                    ></TextField>
                    <IconButton onClick={() => handleRemoveEducation(idx)}>
                      <RemoveCircle sx={{ mr: 1 }} />
                    </IconButton>
                  </Stack>
                </Stack>
              ) : (
                <Grid key={education.id}>
                  <Grid container={true} justifyContent="space-between">
                    <Typography align="left">
                      <b>{education.institution}</b> - {education.achievement}
                    </Typography>
                    <Typography align="right">
                      <b>{education.time}</b>
                    </Typography>
                  </Grid>
                  {idx + 1 < educationList.length && <Divider />}
                </Grid>
              );
            })}
        </Box>
      </Grid>
      <Footer backgroundColor={backgroundColor}></Footer>
    </ThemeProvider>
  );
}

export default Resume;
