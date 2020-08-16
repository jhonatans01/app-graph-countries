import { Country } from "../types/country";
import { Resolvers } from "@apollo/client";
import { countriesVarMock } from "./countryVarMock";

export const resolversMock: Resolvers = {
  Mutation: {
    updateCountry: (
      _,
      { name, capital, area, population, topLevelDomains, flag, alpha2Code },
      { cache }
    ) => {
      let allValues = countriesVarMock();
      let previousValues = allValues.find(
        (value: Country) => value.alpha2Code === alpha2Code
      );

      if (previousValues) {
        const newValues = {
          name: name,
          capital: capital,
          area: Number.parseInt(area),
          population: Number.parseInt(population),
          flag: flag,
          topLevelDomains: topLevelDomains,
          alpha2Code: alpha2Code,
        } as Country;

        allValues = allValues.map((country: Country) =>
          country.alpha2Code === alpha2Code ? newValues : country
        );

        countriesVarMock(allValues);
      }

      return null;
    },
  },
};
