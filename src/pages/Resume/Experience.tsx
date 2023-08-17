import { AddCircle, ExpandMore, RemoveCircle } from "@mui/icons-material";
import {
  Stack,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  TextField,
  Box,
  AccordionDetails,
} from "@mui/material";
import { WysiwygEditor } from "components/WysiwygEditor";
import { IExperience, IResponsibility } from "types/resume";
import { v4 as uuid } from "uuid";
import * as DOMPurify from "dompurify";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

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

  const handleResponsibilityListChange = (
    value: string,
    responsibility: IResponsibility,
    expIdx: number,
    resIdx: number
  ) => {
    const newResponsibility: IResponsibility = structuredClone(responsibility);
    newResponsibility.details = value;
    updateErrorCountWysiwyg(responsibility.details, newResponsibility.details);
    const newExperienceList = structuredClone(experienceList);
    newExperienceList[expIdx].responsibilities[resIdx] = newResponsibility;
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

  const handleRemoveResponsibility = (expIdx: number, resIdx: number) => {
    const newExperienceList: IExperience[] = structuredClone(experienceList);

    //Reset Position
    for (
      let i = 0;
      i < newExperienceList[expIdx].responsibilities.length;
      i++
    ) {
      newExperienceList[expIdx].responsibilities[i].position = i;
    }

    //Splice removed element out of array and remove error count from canSubmitArr
    const responsbility: IResponsibility = newExperienceList[
      expIdx
    ].responsibilities.splice(resIdx, 1)[0];
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);

    if (
      responsbility.details.length === 0 ||
      responsbility.details.startsWith(emptyWysiwyg)
    ) {
      newCanSubmitArr.pop();
    }

    setCanSubmitArr(newCanSubmitArr);
    setExperienceList(newExperienceList);
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

  const onDragEndResponsibilities = (
    { destination, source }: DropResult,
    expIdx: number
  ) => {
    if (!destination) return;

    const experiences = structuredClone(resume.experience);
    const responsibilities = experiences[expIdx].responsibilities.sort(
      (a, b) => a.position - b.position
    );

    const [removed] = responsibilities.splice(source.index, 1);
    responsibilities.splice(destination.index, 0, removed);

    //reset positions
    for (let i = 0; i < responsibilities.length; i++) {
      responsibilities[i].position = i;
    }

    setExperienceList(experiences);
  };

  const emptyWysiwyg = "<p></p>";

  const updateErrorCountWysiwyg = (oldString: string, newString: string) => {
    const newCanSubmitArr: boolean[] = structuredClone(canSubmitArr);
    if (
      oldString.length !== 0 &&
      !oldString.startsWith(emptyWysiwyg) &&
      newString.startsWith(emptyWysiwyg)
    ) {
      newCanSubmitArr.push(true);
    } else if (
      oldString.startsWith(emptyWysiwyg) &&
      !newString.startsWith(emptyWysiwyg)
    ) {
      newCanSubmitArr.pop();
    }
    setCanSubmitArr(newCanSubmitArr);
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
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              {(isAuthenticated || isTestAuthenticated) &&
                              edit ? (
                                <Stack
                                  direction={isDeviceWidth ? "column" : "row"}
                                  spacing={isDeviceWidth ? 2 : 1}
                                >
                                  <TextField
                                    id="experienceRole"
                                    error={experience.role.length === 0}
                                    defaultValue={experience.role}
                                    onChange={(e) =>
                                      handleExperienceListChange(
                                        e,
                                        experience,
                                        expIdx
                                      )
                                    }
                                    label="Role"
                                  ></TextField>
                                  <TextField
                                    id="experienceCompany"
                                    error={experience.company.length === 0}
                                    defaultValue={experience.company}
                                    onChange={(e) =>
                                      handleExperienceListChange(
                                        e,
                                        experience,
                                        expIdx
                                      )
                                    }
                                    label="Company"
                                  ></TextField>
                                  <TextField
                                    id="experienceLocation"
                                    error={experience.location.length === 0}
                                    defaultValue={experience.location}
                                    onChange={(e) =>
                                      handleExperienceListChange(
                                        e,
                                        experience,
                                        expIdx
                                      )
                                    }
                                    label="Location"
                                  ></TextField>
                                  <TextField
                                    id="experienceTime"
                                    error={experience.time.length === 0}
                                    defaultValue={experience.time}
                                    onChange={(e) =>
                                      handleExperienceListChange(
                                        e,
                                        experience,
                                        expIdx
                                      )
                                    }
                                    label="Time"
                                  ></TextField>
                                  <Stack direction="row">
                                    <IconButton
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddResponsibility(expIdx);
                                      }}
                                    >
                                      <AddCircle sx={{ mr: 1 }} />
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        handleRemoveExperience(expIdx)
                                      }
                                    >
                                      <RemoveCircle sx={{ mr: 1 }} />
                                    </IconButton>
                                  </Stack>
                                </Stack>
                              ) : isDeviceWidth ? (
                                <Box>
                                  <Typography variant="subtitle2">
                                    <b>
                                      <i>{experience.role}</i>
                                    </b>
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {experience.company}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {experience.location}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {experience.time}
                                  </Typography>
                                </Box>
                              ) : (
                                <Box>
                                  <Typography variant="subtitle2">
                                    <b>
                                      <i>{experience.role}</i>,{" "}
                                      {experience.company}
                                    </b>
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {experience.location} : {experience.time}
                                  </Typography>
                                </Box>
                              )}
                            </AccordionSummary>
                            <div onClick={(e) => e.stopPropagation()}>
                              <AccordionDetails>
                                <Stack
                                  id="dropabble-stack"
                                  direction="column"
                                  spacing={2}
                                >
                                  <DragDropContext
                                    onDragEnd={(result) =>
                                      onDragEndResponsibilities(result, expIdx)
                                    }
                                  >
                                    <Droppable
                                      droppableId={`droppable-responsibilities-${experience.id}`}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.droppableProps}
                                        >
                                          {experience.responsibilities
                                            .sort(
                                              (a, b) => a.position - b.position
                                            )
                                            .map(
                                              (
                                                responsibility: IResponsibility,
                                                idx: number
                                              ) => {
                                                let resIdx: number;
                                                for (
                                                  let i = 0;
                                                  i <
                                                  experienceList[expIdx]
                                                    .responsibilities.length;
                                                  i++
                                                ) {
                                                  if (
                                                    experienceList[expIdx]
                                                      .responsibilities[i]
                                                      .id === responsibility.id
                                                  ) {
                                                    resIdx = i;
                                                    break;
                                                  }
                                                }
                                                return (isAuthenticated ||
                                                  isTestAuthenticated) &&
                                                  edit ? (
                                                  <Draggable
                                                    draggableId={
                                                      responsibility.id
                                                    }
                                                    index={
                                                      responsibility.position
                                                    }
                                                    key={responsibility.id}
                                                    isDragDisabled={
                                                      (!isAuthenticated &&
                                                        !isTestAuthenticated) ||
                                                      !edit
                                                    }
                                                  >
                                                    {(provided, snapshot) => (
                                                      <Stack
                                                        key={responsibility.id}
                                                        direction="column"
                                                        sx={{
                                                          border:
                                                            "#c4c4c4 solid 1px",
                                                          borderRadius: "5px",
                                                        }}
                                                        padding="1rem 1rem 0 1rem"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={
                                                          snapshot.isDragging
                                                            ? "draggingListItem"
                                                            : ""
                                                        }
                                                      >
                                                        <WysiwygEditor
                                                          content={
                                                            responsibility.details
                                                          }
                                                          onChange={(value) =>
                                                            handleResponsibilityListChange(
                                                              value,
                                                              responsibility,
                                                              expIdx,
                                                              resIdx
                                                            )
                                                          }
                                                          options={["inline"]}
                                                          expanded
                                                          error={
                                                            responsibility
                                                              .details
                                                              .length === 0 ||
                                                            responsibility.details.startsWith(
                                                              emptyWysiwyg
                                                            )
                                                          }
                                                        />
                                                        <IconButton
                                                          onClick={() =>
                                                            handleRemoveResponsibility(
                                                              expIdx,
                                                              resIdx
                                                            )
                                                          }
                                                        >
                                                          <RemoveCircle
                                                            sx={{
                                                              mr: 1,
                                                            }}
                                                          />
                                                        </IconButton>
                                                      </Stack>
                                                    )}
                                                  </Draggable>
                                                ) : (
                                                  <Typography
                                                    key={responsibility.id}
                                                  >
                                                    <li
                                                      className="responsibility-list"
                                                      key={resIdx}
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          DOMPurify.sanitize(
                                                            responsibility.details
                                                          ),
                                                      }}
                                                    />
                                                  </Typography>
                                                );
                                              }
                                            )}

                                          {provided.placeholder}
                                        </div>
                                      )}
                                    </Droppable>
                                  </DragDropContext>
                                </Stack>
                              </AccordionDetails>
                            </div>
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
