import { Grid } from "@mui/material";
import reactIcon from "images/reactjs-icon.svg";
import nodeIcon from "images/nodejs-icon.svg";
import graphQlIcon from "images/graphql-icon.svg";

export function SideIcons() {
  return (
    <Grid justifyContent="space-between">
      <Grid
        item
        xs={2}
        container={true}
        justifyContent="space-between"
        direction="column"
        height="92%"
        sx={{ position: "absolute", left: "0rem", marginLeft: "2%" }}
      >
        <Grid item>
          <img
            src={reactIcon}
            className="App-logo-left"
            alt="react-icon"
            width="80%"
          />
        </Grid>
        <Grid item>
          <img
            src={graphQlIcon}
            className="App-logo-left"
            alt="graphql-icon"
            width="80%"
          />
        </Grid>
        <Grid item>
          <img
            src={nodeIcon}
            className="App-logo-left"
            alt="node-icon"
            width="80%"
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={2}
        container={true}
        justifyContent="space-between"
        direction="column"
        height="92%"
        sx={{
          position: "absolute",
          right: "0rem",
          marginRight: "1%",
        }}
      >
        <img
          src={reactIcon}
          className="App-logo-right"
          alt="react-icon"
          width="80%"
        />
        <img
          src={graphQlIcon}
          className="App-logo-right"
          alt="graphql-icon"
          width="80%"
        />

        <img
          src={nodeIcon}
          className="App-logo-right"
          alt="node-icon"
          width="80%"
        />
      </Grid>
    </Grid>
  );
}
