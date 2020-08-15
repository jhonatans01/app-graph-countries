import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { countriesVar } from "../repositories/cache";
import { Country } from "../types/country";

export class ApiConfigService {
  private static instance: ApolloClient<NormalizedCacheObject> | null;
  private static cache: InMemoryCache;

  private constructor() {}

  public static getInstance(): ApolloClient<NormalizedCacheObject> {
    if (!this.instance) {
      this.cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              Country: {
                read(_, { variables }) {
                  const allCountries = countriesVar();
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
                  return countriesVar();
                },
              },
            },
          },
        },
      });

      this.instance = this.initializeApolloClient();
    }
    return this.instance;
  }

  private static initializeApolloClient() {
    return new ApolloClient({
      uri: "https://countries-274616.ew.r.appspot.com",
      defaultOptions: {
        query: {
          fetchPolicy: "cache-first",
        },
      },
      cache: this.cache,
      resolvers: {
        Mutation: {
          updateCountry: (
            _,
            { name, capital, area, population, topLevelDomains, alpha2Code },
            { cache }
          ) => {
            const previousValues = countriesVar().find(
              (value: Country) => value.alpha2Code === alpha2Code
            );

            if (previousValues) {
              previousValues.name = name;
              previousValues.capital = capital;
            }

            return null;
          },
        },
      },
    });
  }
}
