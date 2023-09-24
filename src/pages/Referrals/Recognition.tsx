import { Grid, Divider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import projectsTheme from "themes/projectsTheme";
import { Menu } from "components/Menu";
import { Footer } from "components/Footer";
import { RecognitionItem } from "./RecognitionItem";
import { useContext } from "react";
import { ThemeContext } from "themes/context";
import { getMainTheme } from "utils/utils";
import { Title } from "components/TItle";

export function Recognition() {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid border="double thick black">
      <Grid sx={{ height: "vh100" }} border=".25rem white solid">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black"></Menu>
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            sx={{ background: getMainTheme(theme) }}
          >
            <Title title="RECOGNITION" />
            <Divider sx={{ backgroundColor: "white", borderBottomWidth: 4 }} />
            <RecognitionItem
              content="Dylan is a truly exceptional Full Stack developer. He can easily
              switch between two different languages: Java and React+JS, and he
              performs at a very high level of productivity. Dylan can tackle
              complex issues with ease and is highly responsible when it comes to meeting delivery deadlines."
              source="Anastassiya Starns (Senior Engineer)"
              linkedin="https://www.linkedin.com/in/anastassiya-mayer/"
              left
              up={false}
            />
            <RecognitionItem
              content="Dylan gets things done. He is one of the fastest developers on the
              project and doesn't just finish his tasks and call it a day… our
              colleagues at IBM appreciated that a lot."
              source="Moazzam Khan (Project Lead)"
              linkedin="https://www.linkedin.com/in/moazzam-khan-915194b/"
              left={false}
              up
            />
            <RecognitionItem
              content="On what was only a week-long effort, Dylan was able to pickup
              both a new language and new unit testing framework and start
              contributing immediately. He instantly started writing
              Groovy/Spock like he had been doing it for years, started knocking
              out stories almost as fast as I could write them, and provided
              good feedback on the design, architecture, and implementation.
              With only two of us and a very short deadline, I could not have
              done this without him."
              source="John Valentino (Prinicpal Software Engineer)"
              linkedin="https://www.linkedin.com/in/john-valentino-5554162/"
              left
              up
            />
            <RecognitionItem
              content="Dylan is someone you can give the summary of what you need done
              and he'll immediately get to working on it raising any concerns
              along the way. I found it to be a refreshing experience pairing up
              with Dylan when particularly difficult or complicated issues would
              arise. There was a feeling of 'getting it figured out together'
              which I've rarely had the chance to experience throughout my
              career."
              source="Robert Goddard (Senior Engineer)"
              linkedin="https://www.linkedin.com/in/robert-goddard-05257812/"
              left={false}
              up
            />
            <RecognitionItem
              content="Dylan wasted no time getting up and running on this project.
              Relatively new to Dialexa, but you would have no idea with how
              quickly he fit into the team, adapted to new processes, and picked
              up new technologies. He exemplifies all of Dialexa's best traits
              and has become a fundamental member of the team. He has eased some
              of my anxieties on this project with his knowledge on [certain
              difficult technologies] and I appreciate his willingness to
              research options and his patience in sharing some of the knowledge
              with me. We're lucky to have Dylan on this team!"
              source="Meghan Miller (Project Manager)"
              linkedin="https://www.linkedin.com/in/miller-meghan/"
              left
              up
            />
          </Grid>
          <Footer />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
