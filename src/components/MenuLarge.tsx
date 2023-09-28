import {
  ArticleOutlined,
  BeenhereOutlined,
  CrisisAlertOutlined,
  HomeOutlined,
  PeopleOutlined,
  ReceiptOutlined,
} from "@mui/icons-material";
import { Fab, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function MenuLarge({ isLarger }) {
  return (
    <>
      <Fab
        variant="extended"
        {...{ component: Link, to: "/" }}
        sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
        size={isLarger ? "large" : "small"}
      >
        {isLarger ? (
          <HomeOutlined
            sx={{ mr: 1 }}
            fontSize={isLarger ? "large" : "small"}
          />
        ) : null}
        <Typography variant="h4">HOME</Typography>
      </Fab>
      <Fab
        variant="extended"
        {...{ component: Link, to: "/resume" }}
        sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
        size={isLarger ? "large" : "small"}
      >
        {isLarger ? (
          <ArticleOutlined
            sx={{ mr: 1 }}
            fontSize={isLarger ? "large" : "small"}
          />
        ) : null}
        <Typography variant="h4">RESUME</Typography>
      </Fab>
      <Fab
        variant="extended"
        {...{ component: Link, to: "/projects" }}
        sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
        size={isLarger ? "large" : "small"}
      >
        {isLarger ? (
          <CrisisAlertOutlined
            sx={{ mr: 1 }}
            fontSize={isLarger ? "large" : "small"}
          />
        ) : null}
        <Typography variant="h4">PROJECTS</Typography>
      </Fab>
      <Fab
        variant="extended"
        {...{ component: Link, to: "/recognition" }}
        sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
        size={isLarger ? "large" : "small"}
      >
        {isLarger ? (
          <PeopleOutlined
            sx={{ mr: 1 }}
            fontSize={isLarger ? "large" : "small"}
          />
        ) : null}
        <Typography variant="h4">RECOGNITION</Typography>
      </Fab>
      <Fab
        variant="extended"
        {...{ component: Link, to: "/blog" }}
        sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
        size={isLarger ? "large" : "small"}
      >
        {isLarger ? (
          <ReceiptOutlined
            sx={{ mr: 1 }}
            fontSize={isLarger ? "large" : "small"}
          />
        ) : null}
        <Typography variant="h4">BLOG</Typography>
      </Fab>
      <Fab
        variant="extended"
        {...{ component: Link, to: "/mentorship" }}
        sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
        size={isLarger ? "large" : "small"}
      >
        {isLarger ? (
          <BeenhereOutlined
            sx={{ mr: 1 }}
            fontSize={isLarger ? "large" : "small"}
          />
        ) : null}
        <Typography variant="h4">MENTORSHIP</Typography>
      </Fab>
    </>
  );
}
