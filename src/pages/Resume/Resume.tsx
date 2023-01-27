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
import {
  authenticationCheck,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import useWindowDimensions from "hooks/useWindowDimensions";
import * as DOMPurify from "dompurify";
import { ErrorPage } from "pages/Error/Error";
import { Loading } from "components/Loading";
import { AuthButtons } from "components/AuthButtons";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { WysiwygEditor } from "components/WysiwygEditor";
import axios from "axios";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();
const header = { name: "", title: "" };
const emptyWysiwyg = "<p></p>";

export function Resume() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [resumeHeader, setResumeHeader] = React.useState(header);
  const [skillGroupList, setSkillGroupList] = React.useState<ISkillGroup[]>([]);
  const [experienceList, setExperienceList] = React.useState<IExperience[]>([]);
  const [educationList, setEducationList] = React.useState<IEducation[]>([]);
  const setResume = (header, skillGroups, experience, education) => {
    setResumeHeader(header);
    setSkillGroupList(skillGroups);
    setExperienceList(experience);
    setEducationList(education);
  };

  const resume: IResume = {
    resumeHeader: resumeHeader,
    skillGroups: skillGroupList,
    experience: experienceList,
    education: educationList,
  };

  const testResume = getStorage("resume");

  const [edit, setEdit] = React.useState(true);

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

  const updateErrorCountWysiwyg = (oldString: string, newString: string) => {
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    if (
      oldString.length !== 0 &&
      !oldString.startsWith(emptyWysiwyg) &&
      newString.startsWith(emptyWysiwyg)
    ) {
      newCanSubmitArr.push(true);
    } else if (
      oldString.startsWith(emptyWysiwyg) &&
      !newString.startsWith(emptyWysiwyg)
    ) {
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
    value: string,
    responsibility: IResponsibility,
    expIdx: number,
    resIdx: number
  ) => {
    const newResponsibility: IResponsibility = structuredClone(responsibility);
    newResponsibility.details = value;
    updateErrorCountWysiwyg(responsibility.details, newResponsibility.details);
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

    //Reset Position
    const sortedNewExperienceList = newExperienceList.sort(
      (a, b) => a.position - b.position
    );

    for (let i = 0; i < sortedNewExperienceList.length; i++) {
      sortedNewExperienceList[i].position = i;
    }

    setCanSubmitArr(newCanSubmitArr);
    setExperienceList(sortedNewExperienceList);
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

    if (
      responsbility.details.length === 0 ||
      responsbility.details.startsWith(emptyWysiwyg)
    ) {
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
      position: -1,
    });

    //Reset Position
    const sortedNewExperienceList = newExperienceList.sort(
      (a, b) => a.position - b.position
    );

    for (let i = 0; i < sortedNewExperienceList.length; i++) {
      sortedNewExperienceList[i].position = i;
    }

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
      position: -1,
    });

    //Reset Position
    const sortedNewResponsibilities = experience.responsibilities.sort(
      (a, b) => a.position - b.position
    );

    for (let i = 0; i < sortedNewResponsibilities.length; i++) {
      sortedNewResponsibilities[i].position = i;
    }

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

  const onDragEndExperiences = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const experiences = structuredClone(resume.experience).sort(
      (a, b) => a.position - b.position
    );
    const [removed] = experiences.splice(source.index, 1);
    experiences.splice(destination.index, 0, removed);

    //reset positions
    for (let i = 0; i < experiences.length; i++) {
      experiences[i].position = i;
    }

    setExperienceList(experiences);
  };

  const onDragEndResponsibilities = (
    { destination, source }: DropResult,
    expIdx: number
  ) => {
    if (!destination) return;

    const experiences = structuredClone(resume.experience);
    const responsibilities = experiences[expIdx].responsibilities.sort(
      (a, b) => a.position - b.position
    );

    const [removed] = responsibilities.splice(source.index, 1);
    responsibilities.splice(destination.index, 0, removed);

    //reset positions
    for (let i = 0; i < responsibilities.length; i++) {
      responsibilities[i].position = i;
    }

    setExperienceList(experiences);
  };

  const handleSaveOnClick = async () => {
    if (isTestAuthenticated) {
      localStorage.setItem("resume", JSON.stringify(resume));
    } else {
      await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/portfolio/resume/save`,
        { items: resume },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    }
    window.location.replace("/resume");
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/portfolio/resume`)
        .catch((err) => {
          setError(true);
        });
      if (resp && resp?.data?.items) {
        setResume(
          resp.data.items?.resumeHeader,
          resp.data.items?.skillGroups,
          resp.data.items?.experience,
          resp.data.items?.education
        );
      }
      setLoading(false);
    };
    if (!isTestAuthenticated) fetchData();
    else {
      setResume(
        testResume.resumeHeader,
        testResume.skillGroups,
        testResume.experience,
        testResume.education
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isTestAuthenticated) return;
    //Add error count for empty resume header fields to canSubmitArr
    let emptyFieldCount = 0;
    if (!testResume.resumeHeader.name) emptyFieldCount++;
    if (!testResume.resumeHeader.title) emptyFieldCount++;
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    for (let i = 0; i < emptyFieldCount; i++) {
      newCanSubmitArr.push(true);
    }
    setCanSubmitArr(newCanSubmitArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { width } = useWindowDimensions();
  const isDeviceWidth = width < 735;

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const backgroundColor = "black";

  return (
    <Grid border="double thick black">
      <ThemeProvider theme={mainTheme}>
        <Grid border="white solid .25rem">
          <Menu backgroundColor={backgroundColor} />
          <Grid
            padding="1rem 0rem 1rem 0rem"
            sx={{ backgroundColor: "black", position: "relative" }}
          >
            {!isDeviceWidth && (
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
                  sx={{
                    position: "absolute",
                    right: "0rem",
                    marginRight: "1%",
                  }}
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
            )}
            <Box
              padding="1rem"
              border="black thick double"
              sx={{
                margin: "auto",
                width: isDeviceWidth ? "80%" : "55%",
                backgroundColor: "white",
              }}
            >
              <Grid>
                {(isAuthenticated || isTestAuthenticated) && edit ? (
                  <Grid>
                    <TextField
                      error={resumeHeader.name.length === 0}
                      fullWidth={true}
                      value={resumeHeader.name}
                      onChange={handleResumeHeaderNameChange}
                      label="Name"
                      sx={{ margin: "1rem 0rem" }}
                    ></TextField>
                    <TextField
                      error={resumeHeader.title.length === 0}
                      fullWidth={true}
                      value={resumeHeader.title}
                      onChange={handleResumeHeaderTitleChange}
                      label="Title"
                    ></TextField>
                  </Grid>
                ) : (
                  <Grid>
                    <Typography variant="h1">{resumeHeader.name}</Typography>
                    <Typography variant="h3">{resumeHeader.title}</Typography>
                  </Grid>
                )}
                <Grid container direction="column">
                  {isDeviceWidth ? (
                    <>
                      <Button
                        variant="contained"
                        href="mailto:contact.dylanbeckwith@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        color="info"
                        sx={{ margin: "1rem 0rem .5rem" }}
                      >
                        <Typography variant="h6">
                          contact.dylan.beckwith@gmail.com
                        </Typography>
                      </Button>
                    </>
                  ) : (
                    <Fab
                      variant="extended"
                      href="mailto:contact.dylanbeckwith@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      sx={{ margin: "1rem 1rem 0rem 0rem" }}
                      size="small"
                    >
                      <MailOutline sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        contact.dylan.beckwith@gmail.com
                      </Typography>
                    </Fab>
                  )}
                  {isDeviceWidth ? (
                    <Button
                      variant="contained"
                      href="https://www.github.com/OTTTO"
                      target="_blank"
                      rel="noreferrer"
                      color="warning"
                    >
                      <Typography variant="h6">github.com/OTTTO</Typography>
                    </Button>
                  ) : (
                    <Fab
                      variant="extended"
                      href="https://www.github.com/OTTTO"
                      target="_blank"
                      rel="noreferrer"
                      sx={{ margin: "1rem 1rem 0rem 0rem" }}
                      size="small"
                    >
                      <GitHub sx={{ mr: 1 }} />
                      <Typography variant="h6"> github.com/OTTTO </Typography>
                    </Fab>
                  )}
                </Grid>

                <Typography variant="h6"> </Typography>
              </Grid>
              <Stack direction="row">
                <Typography variant="h4" padding="1rem 0rem">
                  <u>
                    <b>TECHNICAL SKILLS</b>
                  </u>
                </Typography>
                {(isAuthenticated || isTestAuthenticated) && edit && (
                  <IconButton onClick={handleAddSkillGroup}>
                    <AddCircle sx={{ mr: 1 }} />
                  </IconButton>
                )}
              </Stack>
              <Stack direction="column" spacing={1}>
                {structuredClone(skillGroupList)
                  .sort((a, b) => a.position - b.position)
                  .map((skillGroup: ISkillGroup) => {
                    let idx: number;
                    for (let i = 0; i < skillGroupList.length; i++) {
                      if (skillGroupList[i].id === skillGroup.id) {
                        idx = i;
                        break;
                      }
                    }
                    return (
                      <Stack direction="row" key={skillGroup.id}>
                        <Accordion sx={{ width: "100%" }}>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            {(isAuthenticated || isTestAuthenticated) &&
                            edit ? (
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
                            {(isAuthenticated || isTestAuthenticated) &&
                            edit ? (
                              <TextField
                                id="skillGroupSkills"
                                error={skillGroup.skills.length === 0}
                                fullWidth={true}
                                multiline
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
                        {(isAuthenticated || isTestAuthenticated) && edit && (
                          <IconButton
                            onClick={() => handleRemoveSkillGroup(idx)}
                          >
                            <RemoveCircle sx={{ mr: 1 }} />
                          </IconButton>
                        )}
                      </Stack>
                    );
                  })}
              </Stack>
              <Stack direction="row">
                <Typography variant="h4" padding="1rem 0rem">
                  <u>
                    <b>PROFESSIONAL EXPERIENCE</b>
                  </u>
                </Typography>
                {(isAuthenticated || isTestAuthenticated) && edit && (
                  <IconButton onClick={handleAddExperience}>
                    <AddCircle sx={{ mr: 1 }} />
                  </IconButton>
                )}
              </Stack>
              <Stack direction="column" spacing={1}>
                <DragDropContext onDragEnd={onDragEndExperiences}>
                  <Droppable droppableId="droppable-list">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {structuredClone(experienceList)
                          .sort((a, b) => a.position - b.position)
                          .map((experience: IExperience, idx: number) => {
                            let expIdx: number;
                            for (let i = 0; i < experienceList.length; i++) {
                              if (experienceList[i].id === experience.id) {
                                expIdx = i;
                                break;
                              }
                            }
                            return (
                              <Draggable
                                draggableId={experience.id}
                                index={experience.position}
                                key={experience.id}
                                isDragDisabled={
                                  (!isAuthenticated && !isTestAuthenticated) ||
                                  !edit
                                }
                              >
                                {(provided, snapshot) => (
                                  <Accordion
                                    key={experience.id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={
                                      snapshot.isDragging
                                        ? "draggingListItem"
                                        : ""
                                    }
                                    sx={{
                                      marginBottom:
                                        idx !== experienceList.length - 1
                                          ? "1rem"
                                          : 0,
                                    }}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMore />}
                                    >
                                      {(isAuthenticated ||
                                        isTestAuthenticated) &&
                                      edit ? (
                                        <Stack
                                          direction={
                                            isDeviceWidth ? "column" : "row"
                                          }
                                          spacing={isDeviceWidth ? 2 : 1}
                                        >
                                          <TextField
                                            id="experienceRole"
                                            error={experience.role.length === 0}
                                            defaultValue={experience.role}
                                            onChange={(e) =>
                                              handleExperienceListChange(
                                                e,
                                                experience,
                                                expIdx
                                              )
                                            }
                                            label="Role"
                                          ></TextField>
                                          <TextField
                                            id="experienceCompany"
                                            error={
                                              experience.company.length === 0
                                            }
                                            defaultValue={experience.company}
                                            onChange={(e) =>
                                              handleExperienceListChange(
                                                e,
                                                experience,
                                                expIdx
                                              )
                                            }
                                            label="Company"
                                          ></TextField>
                                          <TextField
                                            id="experienceLocation"
                                            error={
                                              experience.location.length === 0
                                            }
                                            defaultValue={experience.location}
                                            onChange={(e) =>
                                              handleExperienceListChange(
                                                e,
                                                experience,
                                                expIdx
                                              )
                                            }
                                            label="Location"
                                          ></TextField>
                                          <TextField
                                            id="experienceTime"
                                            error={experience.time.length === 0}
                                            defaultValue={experience.time}
                                            onChange={(e) =>
                                              handleExperienceListChange(
                                                e,
                                                experience,
                                                expIdx
                                              )
                                            }
                                            label="Time"
                                          ></TextField>
                                          <Stack direction="row">
                                            <IconButton
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddResponsibility(expIdx);
                                              }}
                                            >
                                              <AddCircle sx={{ mr: 1 }} />
                                            </IconButton>
                                            <IconButton
                                              onClick={() =>
                                                handleRemoveExperience(expIdx)
                                              }
                                            >
                                              <RemoveCircle sx={{ mr: 1 }} />
                                            </IconButton>
                                          </Stack>
                                        </Stack>
                                      ) : isDeviceWidth ? (
                                        <Box>
                                          <Typography variant="subtitle2">
                                            <b>
                                              <i>{experience.role}</i>
                                            </b>
                                          </Typography>
                                          <Typography variant="subtitle2">
                                            {experience.company}
                                          </Typography>
                                          <Typography variant="subtitle2">
                                            {experience.location}
                                          </Typography>
                                          <Typography variant="subtitle2">
                                            {experience.time}
                                          </Typography>
                                        </Box>
                                      ) : (
                                        <Box>
                                          <Typography variant="subtitle2">
                                            <b>
                                              <i>{experience.role}</i>,{" "}
                                              {experience.company}
                                            </b>
                                          </Typography>
                                          <Typography variant="subtitle2">
                                            {experience.location} :{" "}
                                            {experience.time}
                                          </Typography>
                                        </Box>
                                      )}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Stack
                                        id="dropabble-stack"
                                        direction="column"
                                        spacing={2}
                                      >
                                        <DragDropContext
                                          onDragEnd={(result) =>
                                            onDragEndResponsibilities(
                                              result,
                                              expIdx
                                            )
                                          }
                                        >
                                          <Droppable
                                            droppableId={`droppable-responsibilities-${experience.id}`}
                                          >
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                              >
                                                {experience.responsibilities
                                                  .sort(
                                                    (a, b) =>
                                                      a.position - b.position
                                                  )
                                                  .map(
                                                    (
                                                      responsibility: IResponsibility,
                                                      idx: number
                                                    ) => {
                                                      let resIdx: number;
                                                      for (
                                                        let i = 0;
                                                        i <
                                                        experienceList[expIdx]
                                                          .responsibilities
                                                          .length;
                                                        i++
                                                      ) {
                                                        if (
                                                          experienceList[expIdx]
                                                            .responsibilities[i]
                                                            .id ===
                                                          responsibility.id
                                                        ) {
                                                          resIdx = i;
                                                          break;
                                                        }
                                                      }
                                                      return (isAuthenticated ||
                                                        isTestAuthenticated) &&
                                                        edit ? (
                                                        <Draggable
                                                          draggableId={
                                                            responsibility.id
                                                          }
                                                          index={
                                                            responsibility.position
                                                          }
                                                          key={
                                                            responsibility.id
                                                          }
                                                          isDragDisabled={
                                                            (!isAuthenticated &&
                                                              !isTestAuthenticated) ||
                                                            !edit
                                                          }
                                                        >
                                                          {(
                                                            provided,
                                                            snapshot
                                                          ) => (
                                                            <Stack
                                                              key={
                                                                responsibility.id
                                                              }
                                                              direction="column"
                                                              sx={{
                                                                border:
                                                                  "#c4c4c4 solid 1px",
                                                                borderRadius:
                                                                  "5px",
                                                              }}
                                                              padding="1rem 1rem 0 1rem"
                                                              ref={
                                                                provided.innerRef
                                                              }
                                                              {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
                                                              className={
                                                                snapshot.isDragging
                                                                  ? "draggingListItem"
                                                                  : ""
                                                              }
                                                            >
                                                              <WysiwygEditor
                                                                content={
                                                                  responsibility.details
                                                                }
                                                                onChange={(
                                                                  value
                                                                ) =>
                                                                  handleResponsibilityListChange(
                                                                    value,
                                                                    responsibility,
                                                                    expIdx,
                                                                    resIdx
                                                                  )
                                                                }
                                                                options={[
                                                                  "inline",
                                                                ]}
                                                                expanded
                                                                error={
                                                                  responsibility
                                                                    .details
                                                                    .length ===
                                                                    0 ||
                                                                  responsibility.details.startsWith(
                                                                    emptyWysiwyg
                                                                  )
                                                                }
                                                              />
                                                              <IconButton
                                                                onClick={() =>
                                                                  handleRemoveResponsibility(
                                                                    expIdx,
                                                                    resIdx
                                                                  )
                                                                }
                                                              >
                                                                <RemoveCircle
                                                                  sx={{
                                                                    mr: 1,
                                                                  }}
                                                                />
                                                              </IconButton>
                                                            </Stack>
                                                          )}
                                                        </Draggable>
                                                      ) : (
                                                        <Typography
                                                          key={
                                                            responsibility.id
                                                          }
                                                        >
                                                          <li
                                                            className="responsibility-list"
                                                            key={resIdx}
                                                            dangerouslySetInnerHTML={{
                                                              __html:
                                                                DOMPurify.sanitize(
                                                                  responsibility.details
                                                                ),
                                                            }}
                                                          />
                                                        </Typography>
                                                      );
                                                    }
                                                  )}

                                                {provided.placeholder}
                                              </div>
                                            )}
                                          </Droppable>
                                        </DragDropContext>
                                      </Stack>
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Stack>
              <Stack direction="row">
                <Typography variant="h4" padding="1rem 0rem">
                  <u>
                    <b>EDUCATION</b>
                  </u>
                </Typography>
                {(isAuthenticated || isTestAuthenticated) && edit && (
                  <IconButton onClick={handleAddEducation}>
                    <AddCircle sx={{ mr: 1 }} />
                  </IconButton>
                )}
              </Stack>
              <Stack direction="column" spacing={1}>
                {structuredClone(educationList)
                  .sort((a, b) => a.position - b.position)
                  .map((education: IEducation) => {
                    let idx: number;
                    for (let i = 0; i < educationList.length; i++) {
                      if (educationList[i].id === education.id) {
                        idx = i;
                        break;
                      }
                    }
                    return (isAuthenticated || isTestAuthenticated) && edit ? (
                      <Stack direction="column" key={education.id}>
                        <Stack
                          direction={isDeviceWidth ? "column" : "row"}
                          spacing={isDeviceWidth ? 2 : 1}
                        >
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
                          <IconButton
                            onClick={() => handleRemoveEducation(idx)}
                          >
                            <RemoveCircle sx={{ mr: 1 }} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    ) : (
                      <Grid key={education.id}>
                        {isDeviceWidth ? (
                          <Grid container direction="column">
                            <Typography align="left">
                              <b>{education.institution}</b>
                            </Typography>
                            <Typography align="left">
                              {education.achievement}
                            </Typography>
                            <Typography align="left">
                              {education.time}
                            </Typography>
                          </Grid>
                        ) : (
                          <Grid container={true} justifyContent="space-between">
                            <Typography align="left">
                              {education.institution} - {education.achievement}
                            </Typography>
                            <Typography align="right">
                              {education.time}
                            </Typography>
                          </Grid>
                        )}

                        {idx + 1 < educationList.length && <Divider />}
                      </Grid>
                    );
                  })}
              </Stack>
            </Box>
            <Box
              margin="0 auto"
              sx={{
                width: isDeviceWidth ? "80%" : "55%",
                backgroundColor: "black",
              }}
            >
              {(isAuthenticated || isTestAuthenticated) && (
                <AuthButtons
                  backgroundColor={backgroundColor}
                  topPadding={true}
                  handleSaveOnClick={handleSaveOnClick}
                  disabled={canSubmitArr.length > 0}
                  edit={edit}
                  setEdit={setEdit}
                  resume={true}
                />
              )}
            </Box>
          </Grid>

          <Footer backgroundColor={backgroundColor}></Footer>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}

export default Resume;
