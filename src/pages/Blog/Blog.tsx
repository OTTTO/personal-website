import { Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import mainTheme from "themes/mainTheme";

const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ullamcorper ex ut mauris volutpat facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean ac est mollis, eleifend ipsum quis, cursus nisi. Duis sit amet metus arcu. Vivamus et egestas lectus. Sed eu dui sed odio pretium ornare. Nulla maximus pulvinar rutrum. Ut vitae tristique tellus, ut malesuada risus. Fusce urna ex, dignissim non magna eu, elementum interdum massa.
Nam at risus nec dui laoreet efficitur. Suspendisse rutrum maximus velit quis fermentum. Suspendisse mi nulla, molestie sed egestas ac, pharetra eu augue. Donec ac feugiat justo. Curabitur accumsan congue massa, ac accumsan lacus euismod venenatis. Nulla tortor dui, iaculis ut sodales ac, consectetur semper arcu. Vivamus vehicula ullamcorper pharetra. Vestibulum id molestie est, a facilisis felis. Proin at nibh quam. Curabitur dui magna, vestibulum at tortor in, malesuada porttitor turpis. Curabitur quis efficitur turpis. Vestibulum.`;

export function Blog() {
  return (
    <Grid sx={{ height: "vh100" }} border="black solid .5rem">
      <ThemeProvider theme={mainTheme}>
        <Menu backgroundColor="white"></Menu>
        <Grid container direction="column" width="90%" margin="0 auto">
          <Typography variant="h1" textAlign="center">
            PERSONAL BLOG
          </Typography>
          <Divider sx={{ backgroundColor: "grey", borderBottomWidth: 2 }} />
          <Grid container>
            <Grid width="5%"></Grid>
            <Grid
              container
              sx={{
                backgroundColor: "#dadde3",
                padding: "1rem",
                marginTop: "2rem",
                border: "solid black",
              }}
              width="90%"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                <b>BLOG POST #1</b>
              </Typography>
              <Divider
                sx={{ backgroundColor: "black", borderBottomWidth: 2 }}
              />
              <Typography> {content.slice(0, 500)}...</Typography>
              <Typography variant="h5">
                <b>- READ MORE -</b>
              </Typography>
            </Grid>
            <Grid width="5%"></Grid>
          </Grid>
        </Grid>
        <Footer backgroundColor="white" />
      </ThemeProvider>
    </Grid>
  );
}
