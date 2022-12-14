import {
  AddCircle,
  DeleteForeverOutlined,
  EditOutlined,
  RemoveCircle,
} from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import React, { useEffect } from "react";

import { authenticationCheck } from "utils/utils";
import axios from "axios";
import * as DOMPurify from "dompurify";
import { Loading } from "components/Loading";
import projectsTheme from "themes/projectsTheme";

const isAuthenticated = authenticationCheck();

interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
}

export function Blog() {
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState({ id: "", idx: -1 });
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleDeletePost = async () => {
    let newPosts: IPost[] = structuredClone(posts);
    newPosts.splice(deleteId.idx, 1);
    setPosts(newPosts);

    await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/blog/post/delete/${deleteId.id}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/blog/posts`
      );
      if (resp) {
        setPosts(resp.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <Grid border="double thick black">
      <Grid sx={{ height: "vh100" }} border=".25rem white solid">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black"></Menu>
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            borderBottom=".25rem white solid"
            sx={{ backgroundColor: "black" }}
          >
            <Typography variant="h1" textAlign="center" color="white">
              PERSONAL BLOG
            </Typography>
            {isAuthenticated ? (
              <IconButton href="/blog/post/new">
                <AddCircle sx={{ mr: 1 }} style={{ color: "white" }} />
              </IconButton>
            ) : null}
            <Divider sx={{ backgroundColor: "white", borderBottomWidth: 4 }} />
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
                        padding: !isAuthenticated
                          ? "1rem"
                          : "1rem 1rem 0rem 1rem",
                        marginTop: "2rem",
                        border: "thick black double",
                        backgroundColor: "white",
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
                      <Typography variant="h5">{post.author}</Typography>
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
                      {!isAuthenticated ? (
                        <Typography variant="h4">
                          <a href={`/blog/post/${post.id}`}>- READ MORE -</a>
                        </Typography>
                      ) : (
                        <Grid>
                          <IconButton
                            onClick={async () => {
                              setDeleteId({ id: post.id, idx });
                              handleOpenDelete();
                            }}
                          >
                            <RemoveCircle
                              sx={{ mr: 1 }}
                              style={{ color: "black" }}
                            />
                          </IconButton>
                          <IconButton href={`/blog/post/edit/${post.id}`}>
                            <EditOutlined
                              sx={{ mr: 1 }}
                              style={{ color: "black" }}
                            />
                          </IconButton>
                        </Grid>
                      )}
                    </Grid>

                    <Grid width="5%"></Grid>
                  </Grid>
                );
              })}
          </Grid>
          <Footer backgroundColor="black" />

          {/* DELETE MODAL */}
          <Modal
            open={openDelete}
            onClose={handleCloseDelete}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              width="80%"
              sx={{
                margin: "auto",
                backgroundColor: "white",
                borderRadius: ".5rem",
                opacity: ".9",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                textAlign="center"
                paddingTop="1rem"
              >
                Are you sure that you want to delete this post?
                <IconButton
                  onClick={async () => {
                    handleDeletePost();
                    handleCloseDelete();
                  }}
                >
                  <DeleteForeverOutlined
                    style={{ color: "red" }}
                  ></DeleteForeverOutlined>
                </IconButton>
              </Typography>
            </Grid>
          </Modal>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
