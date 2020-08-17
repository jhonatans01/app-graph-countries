import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import CountryCards from "./CountryCards";
import { MockedProvider } from "@apollo/client/testing";
import { mockedCache } from "../testUtils/cacheMock";
import { within } from "@testing-library/dom";
import { countries } from "../testUtils/countriesFixtures";
import { countriesVarMock } from "../testUtils/countryVarMock";

describe("CountryCards tests", () => {
  let history: any;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/");
    countriesVarMock(Object.assign([], [countries[0]]));
  });

  it("should render countries received by the query", () => {
    const { container } = render(
      <Router history={history}>
        <MockedProvider mocks={[]} addTypename={false} cache={mockedCache}>
          <CountryCards />
        </MockedProvider>
      </Router>
    );

    const cards = container.getElementsByTagName("section");
    expect(cards).toHaveLength(1);

    const { getByText } = within(cards[0]);
    expect(getByText("brazil")).toBeTruthy();
    expect(getByText("brasilia")).toBeTruthy();
    expect(getByText("emoji")).toBeTruthy();
  });
});
