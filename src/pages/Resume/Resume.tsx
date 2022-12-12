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
} from "@mui/material";
import { ExpandMore, MailOutline, GitHub } from "@mui/icons-material";
import resumeTheme from "themes/resumeTheme";
import reactIcon from "images/reactjs-icon.svg";
import nodeIcon from "images/nodejs-icon.svg";
import graphQlIcon from "images/graphql-icon.svg";
import { useQuery } from "@apollo/client";
import { RESUME } from "queries/resume";

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

interface ResumeAccordionProps {
  summary: string | React.ReactNode;
  details: string | React.ReactNode;
}

function ResumeAccordion({ summary, details }: ResumeAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>
          <b>{summary}</b>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

interface ISkillGroup {
  name: string;
  skills: string;
}

function Skills({ skillGroupList }) {
  return (
    <>
      {skillGroupList.map((skillGroup: ISkillGroup, idx: number) => (
        <ResumeAccordion
          key={idx}
          summary={skillGroup.name}
          details={skillGroup.skills}
        />
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

interface IResponsibility {
  details: string;
}

interface IExperience {
  role: string;
  company: string;
  location: string;
  time: string;
  responsibilities: IResponsibility[];
}

function Experience({ experienceList }) {
  return (
    <>
      {experienceList.map((experience: IExperience, idx: number) => (
        <ResumeAccordion
          key={idx}
          summary={
            <RoleInfo
              role={experience.role}
              company={experience.company}
              location={experience.location}
              time={experience.time}
            />
          }
          details={experience.responsibilities.map(
            (responsibility: IResponsibility, index: number) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: responsibility.details }}
              />
            )
          )}
        />
      ))}
    </>
  );
}

interface EducationItemProps {
  institution: string;
  achievement: string;
  time: string;
}

interface IEducation extends EducationItemProps {}

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

function Education({ educationList }) {
  return (
    <>
      {educationList.map((education: IEducation, idx: number) => {
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
      })}
    </>
  );
}

function Resume() {
  const { data, loading, error } = useQuery(RESUME);
  console.log(`data: ${JSON.stringify(data)}`);
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
          <Contact />
          <Typography variant="h4" padding="1rem">
            TECHNICAL SKILLS
          </Typography>
          <Skills skillGroupList={data.resume.skillGroupList} />
          <Typography variant="h4" padding="1rem">
            PROFESSIONAL EXPERIENCE
          </Typography>
          <Experience experienceList={data.resume.experienceList} />
          <Typography variant="h4" padding="1rem">
            EDUCATION
          </Typography>
          <Education educationList={data.resume.educationList} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Resume;
