import { AddCircle, EditOutlined, RemoveCircle } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import React, { useEffect } from "react";
import mainTheme from "themes/mainTheme";
import { authenticationCheck } from "utils/utils";
import axios from "axios";
import * as DOMPurify from "dompurify";

const isAuthenticated = authenticationCheck();

interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
}

export function Blog() {
  const [posts, setPosts] = React.useState([]);

  const handleRemovePost = (idx) => {
    let newPosts: IPost[] = structuredClone(posts);
    newPosts.splice(idx, 1);
    setPosts(newPosts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/blog/posts`
      );
      if (resp) {
        setPosts(resp.data);
      }
    };
    fetchData();
  }, []);

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
                      padding: !isAuthenticated
                        ? "1rem"
                        : "1rem 1rem 0rem 1rem",
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
                    <Typography
                      variant="h4"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          `${post.content.slice(0, 500)}...`
                        ),
                      }}
                    ></Typography>
                    <Typography variant="h4">
                      <a href={`/blog/post/${post.id}`}>- READ MORE -</a>
                    </Typography>
                    {isAuthenticated && (
                      <Grid>
                        <IconButton onClick={() => handleRemovePost(idx)}>
                          <RemoveCircle sx={{ mr: 1 }} />
                        </IconButton>
                        <IconButton href={`/blog/post/edit/${post.id}`}>
                          <EditOutlined sx={{ mr: 1 }} />
                        </IconButton>
                      </Grid>
                    )}
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
