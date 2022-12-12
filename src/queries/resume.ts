import { gql } from "@apollo/client";

export const RESUME = gql`
  query {
    resume {
      skillGroupList {
        id
        name
        skills
      }
      experienceList {
        id
        role
        company
        location
        time
        responsibilities {
          id
          details
        }
      }
      educationList {
        id
        institution
        achievement
        time
      }
    }
  }
`;
