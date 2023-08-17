import { AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  Stack,
  Typography,
  IconButton,
  TextField,
  Grid,
  Divider,
} from "@mui/material";
import { IEducation } from "types/resume";
import { v4 as uuid } from "uuid";

export function Education({
  isAuthenticated,
  isTestAuthenticated,
  edit,
  educationList,
  setEducationList,
  updateErrorCount,
  canSubmitArr,
  setCanSubmitArr,
  isDeviceWidth,
}) {
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

  return (
    <>
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
                  <IconButton onClick={() => handleRemoveEducation(idx)}>
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
                    <Typography align="left">{education.time}</Typography>
                  </Grid>
                ) : (
                  <Grid container={true} justifyContent="space-between">
                    <Typography align="left">
                      {education.institution} - {education.achievement}
                    </Typography>
                    <Typography align="right">{education.time}</Typography>
                  </Grid>
                )}

                {idx + 1 < educationList.length && <Divider />}
              </Grid>
            );
          })}
      </Stack>
    </>
  );
}
