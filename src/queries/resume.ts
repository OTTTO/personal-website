import { gql } from "@apollo/client";

export const RESUME = gql`
  query {
    resume {
      skillGroupList {
        id
        position
        name
        skills
      }
      experienceList {
        id
        position
        role
        company
        location
        time
        responsibilities {
          id
          position
          details
        }
      }
      educationList {
        id
        position
        institution
        achievement
        time
      }
    }
  }
`;

export const UPDATE_RESUME = gql`
  mutation UpdateResume($resume: ResumeInput!) {
    updateResume(resume: $resume)
  }
`;
