import { makeVar, gql } from "@apollo/client";
import { Country } from "../types/country";

export const typeDefs = gql`
  extend type Flag {
    emoji: String!
  }

  extend type TopLevelDomains {
    name: String!
  }
`;

export const countriesVar = makeVar<Country[]>([{} as never]);
