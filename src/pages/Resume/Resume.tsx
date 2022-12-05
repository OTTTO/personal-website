import { Accordion, AccordionSummary, Typography, AccordionDetails} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

function Contact() {
    return(<>
    <Typography> Dylan Beckwith </Typography>
    <Typography> Software Engineer </Typography>
    <Typography> contact.dylanbeckwith@gmail.com </Typography>
    <Typography> github.com/OTTTO </Typography>
    </>
    )
}

interface SkillGroupProps {
    group: string;
    skills: string;
  }

function SkillGroup({group, skills}: SkillGroupProps) {
    return( <Accordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><b>{group}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{skills}</Typography>
        </AccordionDetails>
      </Accordion>)
}

function Skills() {
    return(<>
    <SkillGroup group='Languages' skills='TypeScript, Java, Python, BASH'/>
    <SkillGroup group='Databases' skills='SQL, JDBC, Hibernate, Knex'/>
    <SkillGroup group='Web Technologies' skills='Node, GraphQL, ES6+, jQuery, Spring, React'/>
    <SkillGroup group='Tools' skills='AWS, Git, Unix CLI, Eclipse, Postman'/>
    </>)
}

		
	
			

function Resume() {
    return (<>
    <Contact/>
    <Skills/>
    </>)
}

export default Resume