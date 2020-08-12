import { ApiConfigService } from "./apiConfigService";
import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  ApolloQueryResult,
} from "@apollo/client";

export default class CountriesService {
  private readonly apiConfigService: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.apiConfigService = ApiConfigService.getInstance();
  }

  public getAll() {
    return this.apiConfigService
      .query({
        query: gql`
          query {
            Country {
              name
              capital
              flag {
                emoji
              }
            }
          }
        `,
      })
      .then((result: ApolloQueryResult<any>) => result);
  }

  public get(countryName: string) {
    return this.apiConfigService
      .query({
        query: gql`
          query {
            Country(name: "${countryName}") {
              name
              capital
              area
              population
              flag {
                svgFile
              }
              topLevelDomains {
                name
              }
            }
          }
        `,
      })
      .then((result: ApolloQueryResult<any>) => result);
  }
}
