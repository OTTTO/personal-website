import { RemoveCircle } from "@mui/icons-material";
import { AccordionDetails, Stack, IconButton, Typography } from "@mui/material";
import { WysiwygEditor } from "components/WysiwygEditor";
import { IExperience, IResponsibility } from "types/resume";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import * as DOMPurify from "dompurify";

export function ExperienceDetails({
  isAuthenticated,
  isTestAuthenticated,
  edit,
  resume,
  experienceList,
  setExperienceList,
  experience,
  expIdx,
  canSubmitArr,
  setCanSubmitArr,
}) {
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
    <AccordionDetails>
      <Stack id="dropabble-stack" direction="column" spacing={2}>
        <DragDropContext
          onDragEnd={(result) => onDragEndResponsibilities(result, expIdx)}
        >
          <Droppable
            droppableId={`droppable-responsibilities-${experience.id}`}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {experience.responsibilities
                  .sort((a, b) => a.position - b.position)
                  .map((responsibility: IResponsibility, idx: number) => {
                    let resIdx: number;
                    for (
                      let i = 0;
                      i < experienceList[expIdx].responsibilities.length;
                      i++
                    ) {
                      if (
                        experienceList[expIdx].responsibilities[i].id ===
                        responsibility.id
                      ) {
                        resIdx = i;
                        break;
                      }
                    }
                    return (isAuthenticated || isTestAuthenticated) && edit ? (
                      <Draggable
                        draggableId={responsibility.id}
                        index={responsibility.position}
                        key={responsibility.id}
                        isDragDisabled={
                          (!isAuthenticated && !isTestAuthenticated) || !edit
                        }
                      >
                        {(provided, snapshot) => (
                          <Stack
                            key={responsibility.id}
                            direction="column"
                            sx={{
                              border: "#c4c4c4 solid 1px",
                              borderRadius: "5px",
                            }}
                            padding="1rem 1rem 0 1rem"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={
                              snapshot.isDragging ? "draggingListItem" : ""
                            }
                          >
                            <WysiwygEditor
                              content={responsibility.details}
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
                                responsibility.details.length === 0 ||
                                responsibility.details.startsWith(emptyWysiwyg)
                              }
                            />
                            <IconButton
                              onClick={() =>
                                handleRemoveResponsibility(expIdx, resIdx)
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
                      <Typography key={responsibility.id}>
                        <li
                          className="responsibility-list"
                          key={resIdx}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(responsibility.details),
                          }}
                        />
                      </Typography>
                    );
                  })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>
    </AccordionDetails>
  );
}
