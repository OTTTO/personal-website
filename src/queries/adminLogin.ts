import { gql } from "@apollo/client";

export const ADMIN_LOGIN = gql`
  query LoginAdmin($email: String!, $password: String!) {
    signInAdmin(email: $email, password: $password)
  }
`;
