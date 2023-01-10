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

const isAuthenticated = authenticationCheck();

const postContent = `<h1><span style="font-weight: bold;">Frontend</span></h1><p>I had only worked with React a handful of times before starting this project, at this point I finally feel comfortable in this technology.  I now have a solid understanding of state management and hooks. I also got to get hands on with a component library, in this case MaterialUI. By working with <a href="https://mui.com/material-ui/material-icons/" target="_blank">MUI,</a> I learned more about how grids and flexbox work. Another area I got experience with was asking for data with graphQL and consuming it, before this I had only ever been on the backend side serving up data. I learned how important it is to make your frontend responsive because otherwise it can look terrible with certain device widths.</p><h1><span style="font-weight: bold;">Backend</span></h1><p>I used the same stack that we used on my last work project except I chose to go with TypeORM instead of knex.  Because of some of the language used in the TypeORM package I became more familiar with the relationships that are shared between tables in SQL databases. The other major difference was that I did not use Cognito or any third party for authentication.  Although it is usually frowned upon, I decided to roll my own auth for the experience during which I learned more about jwt and handling passwords.</p><h1>Infrastructure</h1><p>Most of the following was relatively new to me as I have only done a full deployment one other time and that was 5 years ago. I used AWS to spin up an EC2 instance on which I installed a postgres database.  On the same server I cloned my backend repo and set up a Nest web server.  To do this professionally, instead of just calling 'nohup npm start &' to start the server in the background; I created a systemd service and enabled it so that whenever the server starts the backend spins up.  I also set up an elastic ip address for this instance so if it ever goes down it maintains the same ip.  For the frontend, I used static website hosting with an S3 bucket.  I set up an SSL certificate for this bucket in order for my website to be HTTPS secured.  I connected this S3 bucket to a domain which I purchased with Route 53. I eventually set up SSL on my server manually with a tool called certbot which was certainly a learning experience as I came to understand just how expensive it is to run an Application Load Balancer just for the purpose of being able to serve up content with HTTPS. During this time I also learned a very important lesson when it comes to infrastructure, you need to know how much something is going to cost before provisioning the resources.  I spent more than 60 dollars in the course of 24 hours on RDS provisions.  Now this may not seem like a lot but over the course of a year that would have been $20,000!  Luckily for me, I had billing alarms set to go off when certain dollar amounts were exceeded so I was able to react quickly and shut down the offending resources.</p>`;

export function Post() {
  const [edit, setEdit] = React.useState(true);
  const [post, setPost] = React.useState({
    id: uuid(),
    title: "",
    content: "",
    author: "",
    createdAt: new Date().getTime(),
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
    //get post from backend with postId || new Post
    if (id) {
      setPost({
        id: "zyx-123",
        title: "Personal Project: What I Learned",
        content: postContent,
        author: "Dylan Beckwith",
        createdAt: new Date().getTime() - 1000000,
      });
    }
  }, []);

  return (
    <Grid sx={{ height: "vh100" }} border="black solid .5rem">
      <ThemeProvider theme={mainTheme}>
        <Menu backgroundColor="white"></Menu>
        <Grid container direction="column" width="90%" margin="0 auto">
          {!isAuthenticated && !edit ? (
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
          {!isAuthenticated && !edit ? (
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
                  display: isAuthenticated && edit ? "visible" : "none",
                }}
              >
                <Container>
                  <TextEditor
                    value={post.content}
                    onChange={(content: string) => handleContentChange(content)}
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
                  //   await updateHome({ variables: { home } });
                  window.location.reload();
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
        <Footer backgroundColor="white" />
      </ThemeProvider>
    </Grid>
  );
}
