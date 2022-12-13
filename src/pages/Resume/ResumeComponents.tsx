import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Fab,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import {
  ExpandMore,
  MailOutline,
  GitHub,
  AddCircle,
  RemoveCircle,
} from "@mui/icons-material";

const isAuthenticated = localStorage.getItem("token");

export function Contact() {
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

export interface ISkillGroup {
  id?: string;
  name: string;
  skills: string;
}

export function Skills({ skillGroupList, handleChange, removeGroup }) {
  return (
    <>
      {skillGroupList.map((skillGroup: ISkillGroup, idx: number) => (
        <>
          <Stack direction="row">
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                {!isAuthenticated ? (
                  <Typography>
                    <b>{skillGroup.name}</b>
                  </Typography>
                ) : (
                  <TextField
                    id="skillGroupName"
                    fullWidth={true}
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
                    fullWidth={true}
                    defaultValue={skillGroup.skills}
                    onChange={(e) => handleChange(e, skillGroup, idx)}
                  ></TextField>
                )}
              </AccordionDetails>
            </Accordion>
            {isAuthenticated && (
              <IconButton onClick={() => removeGroup(idx)}>
                <RemoveCircle sx={{ mr: 1 }} />
              </IconButton>
            )}
          </Stack>
        </>
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

export interface IExperience {
  id?: string;
  role: string;
  company: string;
  location: string;
  time: string;
  responsibilities: IResponsibility[];
}

export interface IResponsibility {
  id?: string;
  details: string;
}

export function Experience({
  experienceList,
  handleExperienceChange,
  handleResponsibilityChange,
  removeExperience,
  addResponsibility,
  removeResponsibility,
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
                <IconButton onClick={() => removeExperience(expIdx)}>
                  <RemoveCircle sx={{ mr: 1 }} />
                </IconButton>
              </Stack>
            )}
          </AccordionSummary>
          {isAuthenticated && (
            <IconButton onClick={() => addResponsibility(expIdx)}>
              <AddCircle sx={{ mr: 1 }} />
            </IconButton>
          )}
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
                    <Stack direction="row">
                      <TextField
                        id="responsibility"
                        fullWidth={true}
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
                      <IconButton
                        onClick={() => removeResponsibility(expIdx, resIdx)}
                      >
                        <RemoveCircle sx={{ mr: 1 }} />
                      </IconButton>
                    </Stack>
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

export interface IEducation extends EducationItemProps {
  id?: string;
}

export function EducationItem({
  institution,
  achievement,
  time,
}: EducationItemProps) {
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

export function Education({ educationList, handleChange, removeEducation }) {
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
              <>
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
                  <IconButton onClick={() => removeEducation(idx)}>
                    <RemoveCircle sx={{ mr: 1 }} />
                  </IconButton>
                </Stack>
              </>
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
