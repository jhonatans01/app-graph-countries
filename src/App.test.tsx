import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { ApolloClient, ApolloQueryResult } from "@apollo/client";
import { mockedCache } from "./testUtils/cacheMock";
import CountriesService from "./services/countriesService";
import { countriesWithDetails } from "./testUtils/countriesFixtures";
import { countriesVarMock } from "./testUtils/countryVarMock";

describe("App tests", () => {
  const apolloClient = new ApolloClient({
    uri: "http://localhost",
    defaultOptions: {
      query: {
        fetchPolicy: "cache-first",
      },
    },
    cache: mockedCache,
  });

  beforeEach(() => {
    jest.spyOn(CountriesService.prototype, "getAll").mockReturnValue(
      new Promise<ApolloQueryResult<any>>((resolve) =>
        resolve({
          data: countriesWithDetails,
          error: undefined,
          loading: false,
          networkStatus: 1,
        })
      )
    );

    jest
      .spyOn(CountriesService.prototype, "setValuesToVar")
      .mockResolvedValue(countriesVarMock(countriesWithDetails) as never);
  });

  it("should render header and country cards list", async () => {
    const { container, getByText } = render(<App apiClient={apolloClient} />);
    const sectionElements = await container.getElementsByTagName("section");
    const header = container.getElementsByTagName("nav");

    expect(header).toHaveLength(1);
    expect(header[0].className).toEqual("header");

    expect(sectionElements).toHaveLength(2);
    expect(sectionElements[0].className).toEqual("content");
    expect(sectionElements[1].className).toEqual("cards");

    expect(getByText("brazil")).toBeTruthy();
    expect(getByText("argentina")).toBeTruthy();
  });
});
