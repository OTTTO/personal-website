import { Close, CloudUploadOutlined, ImageOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import React, { useEffect } from "react";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export function CloudImages({
  isTestAuthenticated,
  isSmaller,
  handleSelectImage,
  idx = -1,
  iconColor = "black",
}) {
  const [file, setFile] = React.useState();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const [openImages, setOpenImages] = React.useState(false);
  const handleOpenImages = () => setOpenImages(true);
  const handleCloseImages = () => setOpenImages(false);
  const [images, setImages] = React.useState([]);

  const handleUploadImage = () => {
    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: uuid(),
      Body: file,
    };

    if (isTestAuthenticated) {
      alert("Sorry, test admins are not allowed to upload images!");
    } else {
      s3.upload(params, (err) => {
        if (err) {
          console.log(err);
        } else {
          getImages();
        }
      });
      alert("Your image has been successfully uploaded to the cloud!");
    }
  };

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

  useEffect(() => {
    getImages();
  }, []);

  return (
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
          style={{ color: iconColor }}
        ></CloudUploadOutlined>
      </IconButton>
      <IconButton onClick={handleOpenImages}>
        <ImageOutlined
          fontSize="large"
          style={{ color: iconColor }}
        ></ImageOutlined>
      </IconButton>

      {/* IMAGES DIALOG */}
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
                  onClick={(e) => {
                    handleSelectImage(e, idx);
                    handleCloseImages();
                  }}
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
