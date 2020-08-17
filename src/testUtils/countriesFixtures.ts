import { Country } from "../types/country";

export const countries: Country[] = [
  {
    name: "brazil",
    flag: { emoji: "emoji" },
    capital: "brasilia",
  },
  {
    name: "argentina",
    flag: { emoji: "emoji" },
    capital: "buenos aires",
  },
];

export const countriesWithDetails: Country[] = [
  {
    name: "brazil",
    flag: { emoji: "emoji" },
    capital: "brasilia",
    population: 123,
    area: 345,
    alpha2Code: "BR",
    topLevelDomains: [{ name: ".br" }],
  },
  {
    name: "argentina",
    flag: { emoji: "emoji" },
    capital: "buenos aires",
    population: 345,
    area: 456,
    alpha2Code: "AR",
    topLevelDomains: [{ name: ".ar" }],
  },
];
