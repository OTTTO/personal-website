import { gql } from "@apollo/client";

export const HOME = gql`
  query {
    home {
      id
      intro
      websiteInfo
      mainImg
    }
  }
`;

export const UPDATE_HOME = gql`
  mutation UpdateHome($home: HomeInput!) {
    updateHome(home: $home)
  }
`;
