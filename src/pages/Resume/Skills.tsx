import { AddCircle, ExpandMore, RemoveCircle } from "@mui/icons-material";
import {
  Stack,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  TextField,
  AccordionDetails,
} from "@mui/material";
import { ISkillGroup } from "types/resume";
import { v4 as uuid } from "uuid";

export function Skills({
  isAuthenticated,
  isTestAuthenticated,
  edit,
  skillGroupList,
  setSkillGroupList,
  canSubmitArr,
  setCanSubmitArr,
  updateErrorCount,
}) {
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

  return (
    <>
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
                    {(isAuthenticated || isTestAuthenticated) && edit ? (
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
                    {(isAuthenticated || isTestAuthenticated) && edit ? (
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
                  <IconButton onClick={() => handleRemoveSkillGroup(idx)}>
                    <RemoveCircle sx={{ mr: 1 }} />
                  </IconButton>
                )}
              </Stack>
            );
          })}
      </Stack>
    </>
  );
}
