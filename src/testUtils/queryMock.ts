import { gql } from "@apollo/client";

export const queryGetCountry = gql`
  query {
    Country @client
  }
`;
