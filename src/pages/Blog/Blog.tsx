import { AddCircle } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import React from "react";
import mainTheme from "themes/mainTheme";
import { authenticationCheck } from "utils/utils";
import { v4 as uuid } from "uuid";

const isAuthenticated = authenticationCheck();

interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
}

export function Blog() {
  const postContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ullamcorper ex ut mauris volutpat facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean ac est mollis, eleifend ipsum quis, cursus nisi. Duis sit amet metus arcu. Vivamus et egestas lectus. Sed eu dui sed odio pretium ornare. Nulla maximus pulvinar rutrum. Ut vitae tristique tellus, ut malesuada risus. Fusce urna ex, dignissim non magna eu, elementum interdum massa.
    Nam at risus nec dui laoreet efficitur. Suspendisse rutrum maximus velit quis fermentum. Suspendisse mi nulla, molestie sed egestas ac, pharetra eu augue. Donec ac feugiat justo. Curabitur accumsan congue massa, ac accumsan lacus euismod venenatis. Nulla tortor dui, iaculis ut sodales ac, consectetur semper arcu. Vivamus vehicula ullamcorper pharetra. Vestibulum id molestie est, a facilisis felis. Proin at nibh quam. Curabitur dui magna, vestibulum at tortor in, malesuada porttitor turpis. Curabitur quis efficitur turpis. Vestibulum.`;

  const [posts, setPosts] = React.useState([
    {
      id: "abc-123",
      title: "Second post",
      content: "ABC " + postContent,
      author: "Dylan Beckwith",
      createdAt: new Date().getTime(),
    },
    {
      id: "zyx-123",
      title: "First post",
      content: "ZYX " + postContent,
      author: "Dylan Beckwith",
      createdAt: new Date().getTime() - 100000000,
    },
  ]);

  return (
    <Grid sx={{ height: "vh100" }} border="black solid .5rem">
      <ThemeProvider theme={mainTheme}>
        <Menu backgroundColor="white"></Menu>
        <Grid container direction="column" width="90%" margin="0 auto">
          <Typography variant="h1" textAlign="center">
            PERSONAL BLOG
          </Typography>
          {isAuthenticated ? (
            <IconButton href="/blog/post/new">
              <AddCircle sx={{ mr: 1 }} />
            </IconButton>
          ) : null}
          <Divider sx={{ backgroundColor: "grey", borderBottomWidth: 2 }} />
          {posts
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((post, idx) => {
              return (
                <Grid container key={idx}>
                  <Grid width="5%"></Grid>
                  <Grid
                    container
                    direction="column"
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
                    <Typography
                      variant="h5"
                      sx={{ textDecoration: "underline", display: "block" }}
                    >
                      <b>{post.title}</b>
                    </Typography>
                    <Typography variant="h6">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="h4">
                      {post.content.slice(0, 250)}...
                    </Typography>
                    <Typography variant="h4">
                      <a href={`/blog/post/${post.id}`}>- READ MORE -</a>
                    </Typography>
                  </Grid>
                  <Grid width="5%"></Grid>
                </Grid>
              );
            })}
        </Grid>
        <Footer backgroundColor="white" />
      </ThemeProvider>
    </Grid>
  );
}
