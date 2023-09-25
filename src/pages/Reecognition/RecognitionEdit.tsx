import { Grid, IconButton } from "@mui/material";
import { RecognitionTextField } from "./RecognitionTextField";
import useWindowDimensions from "hooks/useWindowDimensions";
import { RemoveCircle } from "@mui/icons-material";

export function RecognitionEdit({
  recognition,
  item,
  idx,
  handleTextChange,
  isAuthenticated,
  isTestAuthenticated,
  edit,
  removeRecognitionItem,
}) {
  const { width } = useWindowDimensions();
  const mobileSize = 500;
  const isMobile = width <= mobileSize;
  return (
    <Grid
      container
      sx={{
        backgroundColor: "white",
        padding: "1rem",
        margin:
          idx !== recognition.length - 1 ? "1rem 0" : "1rem 0rem 0rem 0rem",
        border: "thick double black",
        borderRadius: "10px",
      }}
      width={isMobile ? "90%" : "80%"}
      alignItems="center"
      justifyContent="center"
    >
      <Grid>
        <Grid padding={isMobile ? "0rem 0rem" : ".5rem 0rem"} margin="0 auto">
          <RecognitionTextField
            multiline
            item={item}
            property="content"
            idx={idx}
            label="Content"
            handleTextChange={handleTextChange}
          />
          <RecognitionTextField
            item={item}
            property="source"
            idx={idx}
            label="Source"
            handleTextChange={handleTextChange}
          />
          <RecognitionTextField
            item={item}
            property="href"
            idx={idx}
            label="href"
            handleTextChange={handleTextChange}
          />
          {(isAuthenticated || isTestAuthenticated) && edit && (
            <Grid>
              <IconButton onClick={() => removeRecognitionItem(idx)}>
                <RemoveCircle sx={{ mr: 1 }} style={{ color: "black" }} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
