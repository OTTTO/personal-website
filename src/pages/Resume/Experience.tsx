import { AddCircle } from "@mui/icons-material";
import { Stack, Typography, IconButton, Accordion } from "@mui/material";
import { IExperience } from "types/resume";
import { v4 as uuid } from "uuid";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { ExperienceSummary } from "./ExperienceSummary";
import { ExperienceDetails } from "./ExperienceDetails";

export function Experience({
  isAuthenticated,
  isTestAuthenticated,
  edit,
  resume,
  updateErrorCount,
  experienceList,
  setExperienceList,
  canSubmitArr,
  setCanSubmitArr,
  isDeviceWidth,
}) {
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

  return (
    <>
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
                          (!isAuthenticated && !isTestAuthenticated) || !edit
                        }
                      >
                        {(provided, snapshot) => (
                          <Accordion
                            key={experience.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={
                              snapshot.isDragging ? "draggingListItem" : ""
                            }
                            sx={{
                              marginBottom:
                                idx !== experienceList.length - 1 ? "1rem" : 0,
                            }}
                          >
                            <ExperienceSummary
                              isAuthenticated={isAuthenticated}
                              isTestAuthenticated={isTestAuthenticated}
                              edit={edit}
                              experience={experience}
                              expIdx={expIdx}
                              handleExperienceListChange={
                                handleExperienceListChange
                              }
                              handleAddResponsibility={handleAddResponsibility}
                              handleRemoveExperience={handleRemoveExperience}
                              isDeviceWidth={isDeviceWidth}
                            />
                            <ExperienceDetails
                              isAuthenticated={isAuthenticated}
                              isTestAuthenticated={isTestAuthenticated}
                              edit={edit}
                              resume={resume}
                              experienceList={experienceList}
                              setExperienceList={setExperienceList}
                              experience={experience}
                              expIdx={expIdx}
                              canSubmitArr={canSubmitArr}
                              setCanSubmitArr={setCanSubmitArr}
                            />
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
    </>
  );
}
