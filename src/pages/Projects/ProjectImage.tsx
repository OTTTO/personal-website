import { Close, CloudUploadOutlined, ImageOutlined } from "@material-ui/icons";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export function ProjectImage({
  projects,
  isSmaller,
  edit,
  idx,
  handleTextChange,
  isAuthenticated,
  setProjects,
}) {
  const [openImages, setOpenImages] = React.useState(false);
  const handleOpenImages = () => setOpenImages(true);
  const handleCloseImages = () => setOpenImages(false);
  const [images, setImages] = React.useState([]);

  const getImages = async () =>
    s3.listObjects(
      {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          setImages(
            data.Contents.map(
              (object) => `${process.env.REACT_APP_S3_IMAGES_URI}/${object.Key}`
            )
          );
        }
      }
    );

  const project = projects[idx];
  const [file, setFile] = React.useState();
  const [isChecked, setIsChecked] = React.useState(project.openNewTab);

  const checkboxOnChange = (idx: number) => {
    setIsChecked(!isChecked);
    const newProjects = structuredClone(projects);
    const newProject = structuredClone(newProjects[idx]);
    newProject.openNewTab = !isChecked;
    newProjects[idx] = newProject;
    setProjects(newProjects);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadImage = () => {
    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: uuid(),
      Body: file,
    };

    s3.upload(params, (err) => {
      if (err) {
        console.log(err);
      } else {
        getImages();
      }
    });
  };

  const handleSelectImage = (e, idx: number) => {
    const newProjects = structuredClone(projects);
    const newProject = structuredClone(newProjects[idx]);
    const img = e.target.currentSrc.split("/").pop();
    newProject.img = img;
    newProjects[idx] = newProject;
    setProjects(newProjects);
    handleCloseImages();
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Grid container direction="column" alignItems="center">
      {project.img && (
        <a
          href={project.href}
          target={project.openNewTab ? "_blank" : null}
          rel={project.openNewTab ? "noreferrer" : null}
        >
          <img
            src={
              project.img &&
              `${process.env.REACT_APP_S3_IMAGES_URI}/${project.img}`
            }
            alt={!isAuthenticated || !edit ? project.title : ""}
            className={isSmaller ? "projectImgSmallDevice" : "projectImg"}
          ></img>
        </a>
      )}
      {isAuthenticated && edit && (
        <>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            paddingTop={isSmaller ? 0 : "1rem"}
          >
            <input type="file" onChange={handleFileChange} />
            <IconButton onClick={handleUploadImage}>
              <CloudUploadOutlined
                fontSize="large"
                style={{ color: "black" }}
              ></CloudUploadOutlined>
            </IconButton>
            <IconButton onClick={handleOpenImages}>
              <ImageOutlined
                fontSize="large"
                style={{ color: "black" }}
              ></ImageOutlined>
            </IconButton>
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            paddingTop="1rem"
          >
            <Grid width={isSmaller ? "10%" : "100%"}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={() => checkboxOnChange(idx)}
                    sx={{ padding: ".5rem" }}
                  ></Checkbox>
                }
                label="New Tab"
              />
            </Grid>
            <Grid width={isSmaller ? "65%" : "100%"} sx={{ display: "block" }}>
              <TextField
                fullWidth
                value={project.href || ""}
                onChange={(e) => handleTextChange(e, "href", idx)}
                label="href"
              ></TextField>
            </Grid>
          </Grid>
        </>
      )}

      {/* IIMAGES DIALOG */}
      <Dialog
        open={openImages}
        onClose={handleCloseImages}
        scroll="paper"
        fullWidth
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          sx={{
            margin: "auto",
            backgroundColor: "white",
            borderRadius: ".5rem",
            opacity: ".9",
            paddingBottom: "1rem",
          }}
        >
          <IconButton onClick={handleCloseImages} sx={{ float: "left" }}>
            <Close style={{ color: "red" }}></Close>
          </IconButton>
          <DialogTitle>
            <Grid>
              <Typography
                variant="h5"
                component="h2"
                textAlign="center"
                paddingTop="1rem"
                fontWeight="bold"
              >
                SELECT AN IMAGE
              </Typography>
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <Grid
              container
              direction="column"
              alignItems="space-between"
            ></Grid>
            {images &&
              images.map((img, i) => (
                <Button
                  key={i}
                  size="small"
                  sx={{ display: "inline-block" }}
                  onClick={(e) => handleSelectImage(e, idx)}
                >
                  <img src={img} alt={img} className="imagesModalImg"></img>
                </Button>
              ))}
          </DialogContent>
        </Grid>
      </Dialog>
    </Grid>
  );
}
