import { Button, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import { Link } from "react-router-dom";

export function PageButtons({
  backTitle = undefined,
  backTo = undefined,
  forwardTitle = undefined,
  forwardTo = undefined,
  hasHome = true,
}) {
  const homeLink = "/projects/xplained/ds";
  return (
    <Grid display="flex" justifyContent="space-between">
      <Grid>
        {backTitle && backTo && (
          <Link to={backTo}>
            <Button>
              <ArrowBackIosIcon />
              <Typography>{backTitle}</Typography>
            </Button>
          </Link>
        )}
      </Grid>
      <Grid
        position="absolute"
        sx={{ transform: "translate(-50%, -5%)", left: "50%" }}
      >
        {hasHome && (
          <Link to={homeLink}>
            <IconButton>
              <OtherHousesIcon />
            </IconButton>
          </Link>
        )}
      </Grid>
      {forwardTitle && forwardTo && (
        <Link to={forwardTo}>
          <Button>
            <Typography>{forwardTitle}</Typography>
            <ArrowForwardIosIcon />
          </Button>
        </Link>
      )}
    </Grid>
  );
}
