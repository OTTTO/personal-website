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

function Skills() {
  return (
    <>
      <ResumeAccordion
        summary="Languages"
        details="TypeScript, Java, Python, BASH"
      />
      <ResumeAccordion
        summary="Databases"
        details="SQL, JDBC, Hibernate, Knex"
      />
      <ResumeAccordion
        summary="Web Technologies"
        details="Node, GraphQL, ES6+, jQuery, Spring, React"
      />
      <ResumeAccordion
        summary="Tools"
        details="AWS, Git, Unix CLI, Eclipse, Postman"
      />
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

const dialexaRoleInfo = (
  <RoleInfo
    role="Software Engineer"
    company="Dialexa"
    location="Austin, TX"
    time="May 2022 - Present"
  />
);
const dialexaRoleResponsibilities = [
  `Started <b> Node TypeScript</b> green field project from scratch and completed in 6 months`,
  `Built out a <b>CI/CD</b> pipeline with GitHub Actions that only would pass if <b>unit test</b> coverage was over 80%`,
  `Set up an <b>Auth</b> Service leveraging AWS <b>Cognito</b> including <b>SSO</b> for Google, Apple, and Facebook`,
  `Implemented a <b>GraphQL</b> API interface for use by web and mobile teams`,
];

const sparkCompassRoleInfo = (
  <RoleInfo
    role="Full Stack Developer"
    company="Spark Compass"
    location="Austin, TX"
    time="April 2019 - May 2022"
  />
);
const sparkCompassRoleResponsibilities = [
  `Built out features and fixed bugs for a rewards program whose biggest client was Ole Miss University.`,
  `Integrated a blockchain solution into a <b>Java</b> application by connecting the client application to a blockchain server.`,
  `Processed over half a million transactions in the final year of production with a 97.2% transaction success rate`,
  `Utilized <b>Spring</b> MVC to quickly expand on current web application and add new functionality`,
  `Used <b>AngularJS</b> to make a website generic by removing client specific content and replacing it with templates and image references that can be easily updated by uploading images/text through the admin panel`,
  `Programmatically migrated resources from <b>EC2</b> to <b>S3</b>`,
  `Implemented Interactive Video Service using AWS <b>API Gateway</b>, <b>Lambda</b>, and <b>React</b>.`,
];

const oneNetworkRoleInfo = (
  <RoleInfo
    role="Full Stack Developer"
    company="ONE Network Enterprises"
    location="Austin, TX"
    time="June 2021 - May 2022"
  />
);
const oneNetworkRoleResponsibilities = [
  `Worked on supply chain software as a military contractor for the US Navy, completing tight deadlines every 4 weeks in <b>Scrum</b>.`,
  `Built <b>React</b> components with CSS/JS while also navigating a codebase with over 40,000 java files.`,
  `Programmatically ran <b>CRUD</b> operations, including <b>JOIN</b>s, on <b>SQL</b> Databases`,
];

const dataEconomyRoleInfo = (
  <RoleInfo
    role="Back End Developer"
    company="Data Economy"
    location="Austin, TX"
    time="January 2019 - October 2020"
  />
);
const dataEconomyRoleResponsbilities = [
  `Built the backend of a federated search engine for two distinct data platforms processing hundreds of thousands of items. Retrieved and processed data to provide key metric analytics on this data as well.`,
  `Wrote Java code to consume and produce <b>RESTful APIs</b>`,
  `Contracted by a banking consortium to construct and maintain a private, permissioned blockchain in Ethereum.`,
  `Built an end-to-end fraud tracking solution`,
];

const wintermuteRoleInfo = (
  <RoleInfo
    role="Blockchain Back End Developer"
    company="Wintermute Industries"
    location="New York, NY"
    time="July 2017 -  December 2018"
  />
);
const wintermuteRoleResponsbilities = [
  `Wrote Ethereum Smart Contracts and audited codebases for multiple clients`,
  `Built a <b>Node</b> API that provided a simple interface to the Solidity backend for other JS developers to consume`,
  `Contributed to the official Solidity technical documentation on GitHub in order to make our company's coding style the de facto style within the Ethereum Blockchain community`,
];

const gyogRoleInfo = (
  <RoleInfo
    role="Web Developer"
    company="Grow Your Own Garden LLC"
    location="Tricities, WA"
    time="May 2016 -  August 2016"
  />
);
const gyogRoleResponsibilities = [
  `Built and deployed a fully responsive e-commerce website with <b>HTML5/Bootstrap/CSS</b> on <b>AWS</b>.`,
  `Customized third-party extensions, integrated Stripe payment API, and used vanilla <b>Javascript</b> to build UI components`,
];

const roleInfos = [
  dialexaRoleInfo,
  oneNetworkRoleInfo,
  sparkCompassRoleInfo,
  dataEconomyRoleInfo,
  wintermuteRoleInfo,
  gyogRoleInfo,
];
const roleResponsibilities = [
  dialexaRoleResponsibilities,
  oneNetworkRoleResponsibilities,
  sparkCompassRoleResponsibilities,
  dataEconomyRoleResponsbilities,
  wintermuteRoleResponsbilities,
  gyogRoleResponsibilities,
];

function Roles() {
  return (
    <>
      {roleInfos.map((roleInfo, idx) => (
        <ResumeAccordion
          summary={roleInfo}
          details={roleResponsibilities[idx].map((responsibility, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{ __html: responsibility }}
            />
          ))}
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

function Education() {
  return (
    <>
      <EducationItem
        institution="Lewis University"
        achievement="BS in Computer Science"
        time="2020-2022"
      />
      <Divider />
      <EducationItem
        institution="AWS"
        achievement="Certified Cloud Practitioner"
        time="August 2018"
      />
      <Divider />
      <EducationItem
        institution="Santa Clara University"
        achievement="BS Biochemistry Candidate"
        time="2011-2015"
      />
    </>
  );
}

function Resume() {
  const { data, loading, error } = useQuery(RESUME);

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
          <Skills />
          <Typography variant="h4" padding="1rem">
            PROFESSIONAL EXPERIENCE
          </Typography>
          <Roles />
          <Typography variant="h4" padding="1rem">
            EDUCATION
          </Typography>
          <Education />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Resume;
