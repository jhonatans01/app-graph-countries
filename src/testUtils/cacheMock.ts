import { InMemoryCache } from "@apollo/client";
import { Country } from "../types/country";
import { countriesVarMock } from "./countryVarMock";

export const mockedCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        Country: {
          read(_, { variables }) {
            const allCountries = countriesVarMock();
            if (variables && variables.name) {
              return allCountries.find(
                (country: Country) => variables.name === country.name
              );
            } else if (variables && variables.alpha2Code) {
              return allCountries.find(
                (country: Country) =>
                  variables.alpha2Code === country.alpha2Code
              );
            }
            return countriesVarMock();
          },
        },
      },
    },
  },
});
