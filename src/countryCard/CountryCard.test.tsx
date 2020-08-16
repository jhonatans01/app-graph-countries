import React from "react";
import { render } from "@testing-library/react";
import CountryCard from "./CountryCard";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { within } from "@testing-library/dom";
import {countries} from "../testUtils/countriesFixtues";

describe("CountryCard tests", () => {


  let history: any;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/");
  });

  it("should render all countries passed by props", () => {
    const { getAllByTestId } = render(
      <Router history={history}>
        <CountryCard countries={countries} />
      </Router>
    );

    const countryCards = getAllByTestId("country-card-test-id");
    expect(countryCards).toHaveLength(2);

    const firstElement = within(countryCards[0]);
    expect(firstElement.getByText("brazil")).toBeTruthy();
    expect(firstElement.getByText("brasilia")).toBeTruthy();
    expect(firstElement.getByText("emoji")).toBeTruthy();
    expect(firstElement.getByText("Detalhes")).toBeTruthy();

    const secondElement = within(countryCards[1]);
    expect(secondElement.getByText("argentina")).toBeTruthy();
    expect(secondElement.getByText("buenos aires")).toBeTruthy();
    expect(secondElement.getByText("emoji")).toBeTruthy();
    expect(secondElement.getByText("Detalhes")).toBeTruthy();
  });

  it("should redirect to details page when details button is clicked", () => {
    const { getAllByTestId } = render(
      <Router history={history}>
        <CountryCard countries={countries} />
      </Router>
    );

    const countryCards = getAllByTestId("country-card-test-id");
    expect(countryCards).toHaveLength(2);

    const firstElement = within(countryCards[0]);
    expect(firstElement.getByText("brazil")).toBeTruthy();

    let detailsButton = firstElement.getByText("Detalhes");
    expect(detailsButton).toBeTruthy();
    detailsButton.click();

    expect(history.location.pathname).toEqual("/country/brazil");
  });
});
