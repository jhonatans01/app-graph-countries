import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { mockedCache } from "../testUtils/cacheMock";
import { within } from "@testing-library/dom";
import CountryPage from "./CountryPage";
import { countriesVarMock } from "../testUtils/countryVarMock";
import { countriesWithDetails } from "../testUtils/countriesFixtures";
import { act } from "react-dom/test-utils";

describe("CountryPage tests", () => {
  beforeEach(() => {
    countriesVarMock(Object.assign([], countriesWithDetails));
  });

  it("should render country received by the query", async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false} cache={mockedCache}>
        <MemoryRouter initialEntries={["/country/brazil"]}>
          <Route exact path="/country/:name" component={CountryPage} />
        </MemoryRouter>
      </MockedProvider>
    );

    const cards = await getByTestId("country-card-test-id");
    expect(cards).toBeTruthy();

    const { getByText } = within(cards);
    expect(getByText("brazil")).toBeTruthy();
    expect(getByText("brasilia")).toBeTruthy();
    expect(getByText("123")).toBeTruthy();
    expect(getByText("345")).toBeTruthy();
    expect(getByText(".br")).toBeTruthy();

    expect(getByText("Editar país")).toBeTruthy();
    expect(queryByTestId("country-form-test-id")).toBeNull();
  });

  it("should show and hide edit form when the proper button is clicked", async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false} cache={mockedCache}>
        <MemoryRouter initialEntries={["/country/brazil"]}>
          <Route exact path="/country/:name" component={CountryPage} />
        </MemoryRouter>
      </MockedProvider>
    );

    const cards = await getByTestId("country-card-test-id");
    const button = cards.getElementsByTagName("button");
    await act(async () => {
      button[0].click();
    });

    let countryFormModal = getByTestId("country-form-test-id");
    expect(countryFormModal).toBeTruthy();
    await act(async () => {
      getByText("Salvar").click();
    });
    expect(queryByTestId("country-form-test-id")).toBeNull();
  });
});
