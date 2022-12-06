import { 
    Box, 
    Grid, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Typography,
    Divider, 
    Fab, 
    ThemeProvider
} from '@mui/material';
import { ExpandMore, MailOutline, GitHub } from '@mui/icons-material';
import resumeTheme from '../../themes/resumeTheme';

function Contact() {
    return(
        <Box>
            <Typography variant="h1"> Dylan Beckwith </Typography>
            <Typography variant="h3"> Software Engineer </Typography>
            <Fab variant="extended" href='mailto:contact.dylanbeckwith@gmail.com' sx={{'margin':'1rem 1rem 0rem 0rem'}}>
                <MailOutline sx={{ mr: 1 }} />
                <Typography variant="h6"> contact.dylan.beckwith@gmail.com </Typography>
            </Fab>
            <Fab variant="extended" href='https://www.github.com/OTTTO' sx={{'margin':'1rem 1rem 0rem 0rem'}}>
                <GitHub sx={{ mr: 1 }} />
                <Typography variant="h6"> github.com/OTTTO </Typography>
            </Fab>
        
            <Typography variant="h6">  </Typography>
        </Box>        
    )
}

interface ResumeAccordionProps {
    summary: string | React.ReactNode;
    details: string | React.ReactNode;
}

function ResumeAccordion({summary, details}: ResumeAccordionProps) {
    return(
    <Accordion >
        <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography><b>{summary}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>{details}</Typography>
        </AccordionDetails>
    </Accordion>)
}

function Skills() {
    return(<>
        <ResumeAccordion summary='Languages' details='TypeScript, Java, Python, BASH'/>
        <ResumeAccordion summary='Databases' details='SQL, JDBC, Hibernate, Knex'/>
        <ResumeAccordion summary='Web Technologies' details='Node, GraphQL, ES6+, jQuery, Spring, React'/>
        <ResumeAccordion summary='Tools' details='AWS, Git, Unix CLI, Eclipse, Postman'/>
    </>)
}

interface RoleInfoProps {
    role: string;
    company: string;
    location: string;
    time: string;
}

function RoleInfo({role, company, location, time}: RoleInfoProps) {
    return(<>
        <Typography variant='subtitle2'><b><i>{role}</i>, {company}</b></Typography>
        <Typography variant='subtitle2'><b>{location}, {time}</b></Typography> 
        </>)
}

const dialexaRoleInfo = <RoleInfo role='Software Engineer' company='Dialexa' location='Austin, TX' time='May 2022 - Present'/>
const dialexaRoleResponsibilities = [
    `Started Node TypeScript green field project from scratch and completed in 6 months`,
    `Built out a CI/CD pipeline with GitHub Actions that only would pass if unit test coverage was over 80%`,
    `Set up an Auth Service leveraging AWS Cognito including SSO for Google, Apple, and Facebook`,
    `Implemented a GraphQL API interface for use by web and mobile teams`
]

const sparkCompassRoleInfo = <RoleInfo role='Full Stack Developer' company='Spark Compass' location='Austin, TX' time='April 2019 - May 2022'/>
const sparkCompassRoleResponsibilities = [
    `Built out features and fixed bugs for a rewards program whose biggest client was Ole Miss University.`,
    `Integrated a blockchain solution into a Java application by connecting the client application to a blockchain server.`,
    `Processed over half a million transactions in the final year of production with a 97.2% transaction success rate`,
    `Utilized Spring MVC to quickly expand on current web application and add new functionality`,
    `Used AngularJS to make a website generic by removing client specific content and replacing it with templates and image references that can be easily updated by uploading images/text through the admin panel`,
    `Programmatically migrated resources from EC2 to S3`,
    `Implemented Interactive Video Service using AWS API Gateway, Lambda, and React.`
]

const oneNetworkRoleInfo = <RoleInfo role='Full Stack Developer' company='ONE Network Enterprises' location='Austin, TX' time='June 2021 - May 2022'/>
const oneNetworkRoleResponsibilities = [
    `Worked on supply chain software as a military contractor for the US Navy, completing tight deadlines every 4 weeks in scrum.`,
    `Built React components with CSS/JS while also navigating a codebase with over 40,000 java files.`,
    `Programmatically ran CRUD operations, including JOINs, on SQL Databases`
]

const dataEconomyRoleInfo = <RoleInfo role='Back End Developer' company='Data Economy' location='Austin, TX' time='January 2019 - October 2020'/>
const dataEconomyRoleResponsbilities = [
    `Built the backend of a federated search engine for two distinct data platforms processing hundreds of thousands of items. Retrieved and processed data to provide key metric analytics on this data as well.`,
    `Wrote Java code to consume and produce RESTful APIs`,
    `Contracted by a banking consortium to construct and maintain a private, permissioned blockchain in Ethereum.`,
    `Built an end-to-end fraud tracking solution`
]

const wintermuteRoleInfo = <RoleInfo role='Blockchain Back End Developer' company='Wintermute Industries' location='New York, NY' time='July 2017 -  December 2018'/>
const wintermuteRoleResponsbilities = [
    `Wrote Ethereum Smart Contracts and audited codebases for multiple clients`,
    `Built a Node API that provided a simple interface to the Solidity backend for other JS developers to consume`,
    `Contributed to the official Solidity technical documentation on GitHub in order to make our company's coding style the de facto style within the Ethereum Blockchain community`
]

const gyogRoleInfo = <RoleInfo role='Web Developer' company='Grow Your Own Garden LLC' location='Tricities, WA' time='May 2016 -  August 2016'/>
const gyogRoleResponsibilities = [
    `Built and deployed a fully responsive e-commerce website with HTML5/Bootstrap/CSS on AWS.`,
    `Customized third-party extensions, integrated Stripe payment API, and used vanilla Javascript to build UI components`
]

const roleInfos = [dialexaRoleInfo, oneNetworkRoleInfo, sparkCompassRoleInfo, dataEconomyRoleInfo, wintermuteRoleInfo, gyogRoleInfo]
const roleResponsibilities = [
    dialexaRoleResponsibilities,
    oneNetworkRoleResponsibilities,
    sparkCompassRoleResponsibilities,    
    dataEconomyRoleResponsbilities,
    wintermuteRoleResponsbilities,
    gyogRoleResponsibilities
]

function Roles() {
    return(<>
        {roleInfos.map((roleInfo, idx) => <ResumeAccordion summary={roleInfo} details={roleResponsibilities[idx].map((responsibility, idx)=> <li key={idx}> {responsibility} </li>)}/>)}        
    </>)
}

interface EducationItemProps {
    institution: string;
    achievement: string;
    time: string;
}

function EducationItem({institution, achievement, time}: EducationItemProps) {
    return(
    <Grid container={true} justifyContent="space-between"> 
        <Typography align='left'><b>{institution}</b> - {achievement}</Typography>
        <Typography align='right'><b>{time}</b></Typography>
    </Grid>)
}

function Education() {
    return(<>
        <EducationItem institution='Lewis University' achievement='BS in Computer Science' time='2020-2022'/>
        <Divider/>
        <EducationItem institution='AWS' achievement='Certified Cloud Practitioner' time='August 2018'/>
        <Divider/>
        <EducationItem institution='Santa Clara University' achievement='BS Biochemistry Candidate' time='2011-2015'/>
    </>)
}

function Resume() {
    return (
    <ThemeProvider theme={resumeTheme}>
        <Box sx={{'background-color': 'black'}}>
            <Box padding="1rem" sx={{margin: 'auto', width: '50%', 'background-color': 'white'}}>
                <Contact/>
                <Typography variant="h4" padding="1rem"> TECHNICAL SKILLS </Typography>
                <Skills/>
                <Typography variant="h4" padding="1rem"> PROFESSIONAL EXPERIENCE </Typography>
                <Roles/>
                <Typography variant="h4" padding="1rem"> EDUCATION </Typography>
                <Education/>
            </Box>
        </Box>
    </ThemeProvider>)
}

export default Resume