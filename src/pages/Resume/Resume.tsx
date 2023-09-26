import { Box, Divider, Grid, ThemeProvider } from "@mui/material";
import mainTheme from "themes/mainTheme";

import React, { useContext, useEffect } from "react";
import { Menu } from "components/Menu";
import { Footer } from "components/Footer";
import { IEducation, IExperience, IResume, ISkillGroup } from "types/resume";
import {
  authenticationCheck,
  getMainTheme,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ErrorPage } from "pages/Error/Error";
import { Loading } from "components/Loading";
import { AuthButtons } from "components/AuthButtons";
import axios from "axios";
import { Headers } from "./Headers";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { SideIcons } from "./SideIcons";
import { Skills } from "./Skills";
import { ThemeContext } from "themes/context";
import { Title } from "components/TItle";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();
const header = { name: "", title: "" };

export function Resume() {
  const { theme } = useContext(ThemeContext);
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
            padding="0rem 0rem 1rem 0rem"
            sx={{
              position: "relative",
              background: getMainTheme(theme),
            }}
          >
            <Title title="RESUME" />
            <Divider
              sx={{
                backgroundColor: "white",
                borderBottomWidth: 4,
              }}
            />
            {!isDeviceWidth && <SideIcons />}
            <Box
              padding="1rem"
              border="black thick double"
              sx={{
                margin: "1rem auto 0",
                width: isDeviceWidth ? "80%" : "55%",
                backgroundColor: "white",
              }}
            >
              <Headers
                isAuthenticated={isAuthenticated}
                isTestAuthenticated={isTestAuthenticated}
                edit={edit}
                resumeHeader={resumeHeader}
                setResumeHeader={setResumeHeader}
                updateErrorCount={updateErrorCount}
                isDeviceWidth={isDeviceWidth}
              />
              <Skills
                isAuthenticated={isAuthenticated}
                isTestAuthenticated={isTestAuthenticated}
                edit={edit}
                skillGroupList={skillGroupList}
                setSkillGroupList={setSkillGroupList}
                canSubmitArr={canSubmitArr}
                setCanSubmitArr={setCanSubmitArr}
                updateErrorCount={updateErrorCount}
              />
              <Experience
                isAuthenticated={isAuthenticated}
                isTestAuthenticated={isTestAuthenticated}
                edit={edit}
                resume={resume}
                updateErrorCount={updateErrorCount}
                experienceList={experienceList}
                setExperienceList={setExperienceList}
                canSubmitArr={canSubmitArr}
                setCanSubmitArr={setCanSubmitArr}
                isDeviceWidth={isDeviceWidth}
              />
              <Education
                isAuthenticated={isAuthenticated}
                isTestAuthenticated={isTestAuthenticated}
                edit={edit}
                educationList={educationList}
                setEducationList={setEducationList}
                updateErrorCount={updateErrorCount}
                canSubmitArr={canSubmitArr}
                setCanSubmitArr={setCanSubmitArr}
                isDeviceWidth={isDeviceWidth}
              />
            </Box>

            {(isAuthenticated || isTestAuthenticated) && (
              <AuthButtons
                handleSaveOnClick={handleSaveOnClick}
                disabled={canSubmitArr.length > 0}
                edit={edit}
                setEdit={setEdit}
              />
            )}
          </Grid>
          <Footer />
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}

export default Resume;
