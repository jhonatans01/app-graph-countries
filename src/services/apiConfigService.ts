import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { countries } from "../repositories/countryRepository";

export class ApiConfigService {
  private static instance: ApolloClient<NormalizedCacheObject> | null;

  private constructor() {}

  public static getInstance(): ApolloClient<NormalizedCacheObject> {
    if (!this.instance) {
      this.instance = this.initializeApolloClient();
    }
    return this.instance;
  }

  private static initializeApolloClient() {
    return new ApolloClient({
      uri: "https://countries-274616.ew.r.appspot.com",
      cache: new InMemoryCache(),
    });
  }
}
