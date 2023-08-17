import { MailOutline, GitHub } from "@mui/icons-material";
import { Grid, TextField, Typography, Button, Fab } from "@mui/material";

export function Headers({
  isAuthenticated,
  isTestAuthenticated,
  edit,
  resumeHeader,
  setResumeHeader,
  updateErrorCount,
  isDeviceWidth,
}) {
  const handleResumeHeaderNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResumeHeader({
      ...resumeHeader,
      name: e.target.value,
    });
    updateErrorCount(resumeHeader.name, e.target.value);
  };

  const handleResumeHeaderTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResumeHeader({
      ...resumeHeader,
      title: e.target.value,
    });
    updateErrorCount(resumeHeader.title, e.target.value);
  };

  return (
    <>
      <Grid>
        {(isAuthenticated || isTestAuthenticated) && edit ? (
          <Grid>
            <TextField
              error={resumeHeader.name.length === 0}
              fullWidth={true}
              value={resumeHeader.name}
              onChange={handleResumeHeaderNameChange}
              label="Name"
              sx={{ margin: "1rem 0rem" }}
            ></TextField>
            <TextField
              error={resumeHeader.title.length === 0}
              fullWidth={true}
              value={resumeHeader.title}
              onChange={handleResumeHeaderTitleChange}
              label="Title"
            ></TextField>
          </Grid>
        ) : (
          <Grid>
            <Typography variant="h1">{resumeHeader.name}</Typography>
            <Typography variant="h3">{resumeHeader.title}</Typography>
          </Grid>
        )}
        <Grid container direction="column">
          {isDeviceWidth ? (
            <>
              <Button
                variant="contained"
                href="mailto:contact.dylanbeckwith@gmail.com"
                target="_blank"
                rel="noreferrer"
                color="info"
                sx={{ margin: "1rem 0rem .5rem" }}
              >
                <Typography variant="h6">
                  contact.dylan.beckwith@gmail.com
                </Typography>
              </Button>
            </>
          ) : (
            <Fab
              variant="extended"
              href="mailto:contact.dylanbeckwith@gmail.com"
              target="_blank"
              rel="noreferrer"
              sx={{ margin: "1rem 1rem 0rem 0rem" }}
              size="small"
            >
              <MailOutline sx={{ mr: 1 }} />
              <Typography variant="h6">
                contact.dylan.beckwith@gmail.com
              </Typography>
            </Fab>
          )}
          {isDeviceWidth ? (
            <Button
              variant="contained"
              href="https://www.github.com/OTTTO"
              target="_blank"
              rel="noreferrer"
              color="warning"
            >
              <Typography variant="h6">github.com/OTTTO</Typography>
            </Button>
          ) : (
            <Fab
              variant="extended"
              href="https://www.github.com/OTTTO"
              target="_blank"
              rel="noreferrer"
              sx={{ margin: "1rem 1rem 0rem 0rem" }}
              size="small"
            >
              <GitHub sx={{ mr: 1 }} />
              <Typography variant="h6"> github.com/OTTTO </Typography>
            </Fab>
          )}
        </Grid>

        <Typography variant="h6"> </Typography>
      </Grid>
    </>
  );
}
