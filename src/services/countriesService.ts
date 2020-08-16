import { ApiConfigService } from "./apiConfigService";
import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  ApolloQueryResult,
} from "@apollo/client";
import { countriesVar } from "../repositories/cache";

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
              area
              alpha2Code
              population
              flag {
                emoji
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

  public setValuesToVar(result: ApolloQueryResult<any>) {
    countriesVar(result.data.Country);
  }
}
