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

export const UPDATE_RESUME = gql`
  mutation UpsertResume($resume: ResumeInput!) {
    upsertResume(resume: $resume)
  }
`;
