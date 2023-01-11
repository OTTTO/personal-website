import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import mainTheme from "themes/mainTheme";
import { authenticationCheck } from "utils/utils";
import { v4 as uuid } from "uuid";
import { TextEditor } from "./TextEditor";
import * as DOMPurify from "dompurify";
import axios from "axios";
import { Loading } from "components/Loading";

const isAuthenticated = authenticationCheck();
const now = new Date().getTime();

export function Post() {
  const [loading, setLoading] = React.useState(true);
  const [edit, setEdit] = React.useState(true);
  const [post, setPost] = React.useState({
    id: uuid(),
    title: "",
    content: "",
    author: "",
    createdAt: now,
  });

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const newPost = { ...post };
    newPost[key] = e.target.value;
    setPost(newPost);
  };

  const handleContentChange = (content: string) => {
    const newPost = { ...post, content };
    setPost(newPost);
  };

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const resp = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/blog/post/${id}`
        );
        if (resp) {
          setPost(resp.data);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, []);

  const newPost = window.location.href.includes("new");
  const isLoading = !newPost && loading;

  return (
    <>
      <Grid display={isLoading ? "visible" : "none"}>
        <Loading />
      </Grid>
      <Grid
        sx={{ height: "vh100" }}
        border="black solid .25rem"
        display={isLoading ? "none" : "visible"}
      >
        <ThemeProvider theme={mainTheme}>
          <Menu backgroundColor="black" borderSides></Menu>
          <Grid
            container
            direction="column"
            paddingBottom="2rem"
            border="black solid .25rem"
            margin="0 auto"
            width="99%"
          >
            {!isAuthenticated || !edit ? (
              <Typography variant="h1" textAlign="center">
                {post.title}
              </Typography>
            ) : (
              <TextField
                fullWidth={true}
                value={post.title}
                onChange={(e) => handleTextChange(e, "title")}
                label="Title"
                sx={{ margin: "1rem 0rem" }}
              ></TextField>
            )}
            <Divider sx={{ backgroundColor: "black", borderBottomWidth: 2 }} />
            <Grid padding=".5rem 0">
              {!isAuthenticated || !edit ? (
                <Typography variant="h3" textAlign="center" fontWeight="light">
                  {post.author}
                </Typography>
              ) : (
                <TextField
                  fullWidth={true}
                  value={post.author}
                  onChange={(e) => handleTextChange(e, "author")}
                  label="Author"
                  sx={{ margin: "1rem 0rem" }}
                ></TextField>
              )}
              {(!isAuthenticated || !edit) && (
                <Typography variant="h4" textAlign="center">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              )}
            </Grid>
            <Divider sx={{ backgroundColor: "black", borderBottomWidth: 2 }} />
            <Grid container>
              <Grid width="5%"></Grid>
              <Grid
                container
                sx={{
                  padding: "1rem",
                  marginTop: "1rem",
                  border: "solid black",
                }}
                width="90%"
                alignItems="center"
                justifyContent="center"
              >
                <Grid>
                  {(!isAuthenticated || !edit) && (
                    <Typography
                      variant="h4"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content),
                      }}
                    ></Typography>
                  )}
                </Grid>
                <Grid
                  sx={{
                    display: !isAuthenticated || !edit ? "none" : "visible",
                  }}
                >
                  <Container>
                    <TextEditor
                      value={post.content}
                      onChange={(content: string) =>
                        handleContentChange(content)
                      }
                      first={post.content.length > 0}
                    />
                  </Container>
                </Grid>
                <Grid width="5%"></Grid>
              </Grid>
            </Grid>
            {isAuthenticated && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="right"
                padding="1rem 1rem 0rem 0rem"
                spacing={2}
              >
                <Button
                  variant="contained"
                  onClick={async () => {
                    await axios.put(
                      `${process.env.REACT_APP_API_ENDPOINT}/blog/post/save`,
                      post,
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      }
                    );
                    window.location.href = `/blog/post/edit/${post.id}`;
                  }}
                  key="0"
                >
                  <Typography variant="h6"> SAVE</Typography>
                </Button>

                {edit && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setEdit(false);
                    }}
                    key="2"
                  >
                    <Typography variant="h6"> VIEW</Typography>
                  </Button>
                )}
                {!edit && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setEdit(true);
                    }}
                    key="2"
                  >
                    <Typography variant="h6"> EDIT</Typography>
                  </Button>
                )}
              </Stack>
            )}
          </Grid>
          <Footer backgroundColor="black" />
        </ThemeProvider>
      </Grid>
    </>
  );
}
