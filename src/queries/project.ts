import { gql } from "@apollo/client";

export const PROJECTS = gql`
  query {
    projects {
      id
      title
      content
      img
      subtitle
      href
      openNewTab
      createdAt
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProjects($projects: [ProjectInput!]!) {
    updateProjects(projects: $projects)
  }
`;
