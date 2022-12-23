import { gql } from "@apollo/client";

export const HOME = gql`
  query {
    home {
      id
      intro
      websiteInfo
    }
  }
`;

export const UPDATE_HOME = gql`
  mutation UpdateHome($home: HomeInput!) {
    updateHome(home: $home)
  }
`;
