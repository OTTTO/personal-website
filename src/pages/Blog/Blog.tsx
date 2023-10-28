import {
  AddCircle,
  DeleteForeverOutlined,
  EditOutlined,
  RemoveCircle,
} from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import React, { useContext, useEffect } from "react";

import {
  authenticationCheck,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import axios from "axios";
import * as DOMPurify from "dompurify";
import { Loading } from "components/Loading";
import projectsTheme from "themes/projectsTheme";
import { ThemeContext } from "context/theme";
import { Link, useLocation } from "react-router-dom";
import { ErrorPage } from "pages/Error/Error";
import { getMainTheme } from "utils/utils";
import { Title } from "components/TItle";
import { Pagination } from "components/Pagination";
import { TitleDivider } from "components/TitleDivider";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();

interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
}

export function Blog() {
  const { theme } = useContext(ThemeContext);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState({ id: "", idx: -1 });
  const [openDelete, setOpenDelete] = React.useState(false);
  const [paginatedPosts, setPaginatedPosts] = React.useState([]);
  const queryPage = new URLSearchParams(useLocation().search).get("page");
  const paginationPage = parseInt(queryPage) - 1 || 0;

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

  const testPosts = getStorage("posts");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/blog/posts`)
        .catch((err) => {
          setError(true);
        });
      if (resp) {
        setPosts(resp.data.sort((a, b) => b.createdAt - a.createdAt));
      }
      setLoading(false);
    };
    if (!isTestAuthenticated) fetchData();
    else {
      setPosts(testPosts);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorPage />;
  if (loading) return <Loading />;

  return (
    <Grid border="double thick black">
      <Grid sx={{ height: "vh100" }} border=".25rem white solid">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black" />
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            sx={{ background: getMainTheme(theme) }}
          >
            <Title title="PERSONAL BLOG" />
            {isAuthenticated || isTestAuthenticated ? (
              <IconButton href="/blog/post/new">
                <AddCircle sx={{ mr: 1 }} style={{ color: "white" }} />
              </IconButton>
            ) : null}
            <TitleDivider />
            {paginatedPosts &&
              paginatedPosts.map((post, idx) => {
                return (
                  <Grid container key={idx}>
                    <Grid width="5%"></Grid>
                    <Grid
                      container
                      direction="column"
                      sx={{
                        padding:
                          !isAuthenticated && !isTestAuthenticated
                            ? "1rem"
                            : "1rem 1rem 0rem 1rem",
                        marginTop: "1rem",
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
                      <Typography>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            `${post.content.slice(0, 500)}...`
                          ),
                        }}
                      ></Typography>
                      {!isAuthenticated && !isTestAuthenticated ? (
                        <Typography>
                          <Link to={`/blog/post/${post.id}`}>
                            - READ MORE -
                          </Link>
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
            <Pagination
              items={posts}
              setPaginatedItems={setPaginatedPosts}
              pageLength="3"
              currentPage={paginationPage}
              root={"/blog"}
            />
          </Grid>
          <Footer />

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
