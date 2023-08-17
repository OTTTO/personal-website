import { ExpandMore, AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  AccordionSummary,
  Stack,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";

export function ExperienceSummary({
  isAuthenticated,
  isTestAuthenticated,
  edit,
  experience,
  expIdx,
  handleExperienceListChange,
  handleAddResponsibility,
  handleRemoveExperience,
  isDeviceWidth,
}) {
  return (
    <AccordionSummary expandIcon={<ExpandMore />}>
      {(isAuthenticated || isTestAuthenticated) && edit ? (
        <Stack
          direction={isDeviceWidth ? "column" : "row"}
          spacing={isDeviceWidth ? 2 : 1}
        >
          <TextField
            id="experienceRole"
            error={experience.role.length === 0}
            defaultValue={experience.role}
            onChange={(e) => handleExperienceListChange(e, experience, expIdx)}
            label="Role"
          ></TextField>
          <TextField
            id="experienceCompany"
            error={experience.company.length === 0}
            defaultValue={experience.company}
            onChange={(e) => handleExperienceListChange(e, experience, expIdx)}
            label="Company"
          ></TextField>
          <TextField
            id="experienceLocation"
            error={experience.location.length === 0}
            defaultValue={experience.location}
            onChange={(e) => handleExperienceListChange(e, experience, expIdx)}
            label="Location"
          ></TextField>
          <TextField
            id="experienceTime"
            error={experience.time.length === 0}
            defaultValue={experience.time}
            onChange={(e) => handleExperienceListChange(e, experience, expIdx)}
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
            <IconButton onClick={() => handleRemoveExperience(expIdx)}>
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
          <Typography variant="subtitle2">{experience.company}</Typography>
          <Typography variant="subtitle2">{experience.location}</Typography>
          <Typography variant="subtitle2">{experience.time}</Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="subtitle2">
            <b>
              <i>{experience.role}</i>, {experience.company}
            </b>
          </Typography>
          <Typography variant="subtitle2">
            {experience.location} : {experience.time}
          </Typography>
        </Box>
      )}
    </AccordionSummary>
  );
}
