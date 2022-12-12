import { gql } from "@apollo/client";

export const RESUME = gql`
  query {
    resume {
      skillGroupList {
        name
        skills
      }
      experienceList {
        role
        company
        location
        time
        responsibilities {
          details
        }
      }
      educationList {
        institution
        achievement
        time
      }
    }
  }
`;
