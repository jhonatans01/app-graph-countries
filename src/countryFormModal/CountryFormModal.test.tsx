import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Country } from "../types/country";
import { MockedProvider } from "@apollo/client/testing";
import { mockedCache } from "../testUtils/cacheMock";
import { countriesVarMock } from "../testUtils/countryVarMock";
import CountryFormModal from "./CountryFormModal";
import { countries, countriesWithDetails } from "../testUtils/countriesFixtues";
import { resolversMock } from "../testUtils/resolversMock";
import { act } from "react-dom/test-utils";

async function fireChangeInput(inputElement: HTMLInputElement, value: string) {
  await act(async () => {
    fireEvent.change(inputElement, { target: { value } });
  });
}

describe("CountryFormModal tests", () => {
  beforeEach(() => {
    countriesVarMock(Object.assign([], [countriesWithDetails[0]]));
  });

  it("should render with correct classNames", () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CountryFormModal
          country={countries[0]}
          onClose={() => undefined}
          show={true}
        />
      </MockedProvider>
    );

    const children = container.children[0];
    expect(children.className).toEqual("modal");
    expect(children.children[0].className).toEqual("modal__content");
  });

  it("should render empty html when show is false", () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CountryFormModal
          country={{} as Country}
          onClose={() => undefined}
          show={false}
        />
      </MockedProvider>
    );

    expect(container.children).toHaveLength(0);
  });

  it("should render correct form inputs and buttons when show is true", () => {
    const { container, getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CountryFormModal
          country={countries[0]}
          onClose={() => undefined}
          show={true}
        />
      </MockedProvider>
    );

    const formInputs = container.getElementsByTagName("input");

    expect(formInputs).toHaveLength(5);
    expect(formInputs[0].name).toEqual("name");
    expect(formInputs[1].name).toEqual("capital");
    expect(formInputs[2].name).toEqual("population");
    expect(formInputs[3].name).toEqual("area");
    expect(formInputs[4].name).toEqual("topLevelDomains");

    expect(getByText("Cancelar")).toBeTruthy();
    expect(getByText("Salvar")).toBeTruthy();
  });

  it("should have updated values when submitting the form", async () => {
    const { container, getByText } = render(
      <MockedProvider
        mocks={[]}
        addTypename={false}
        cache={mockedCache}
        resolvers={resolversMock}
      >
        <CountryFormModal
          country={countriesWithDetails[0]}
          onClose={() => undefined}
          show={true}
        />
      </MockedProvider>
    );

    const formInputs = container.getElementsByTagName("input");

    expect(formInputs).toHaveLength(5);
    await fireChangeInput(formInputs[0], "argentina");
    await fireChangeInput(formInputs[1], "buenos aires");
    await fireChangeInput(formInputs[2], "123");
    await fireChangeInput(formInputs[3], "567");
    await fireChangeInput(formInputs[4], ".AR");

    await act(async () => {
      getByText("Salvar").click();
    });

    const updatedCountries = countriesVarMock();
    const expectedCountries = [
      {
        name: "argentina",
        capital: "buenos aires",
        population: 123,
        area: 567,
        topLevelDomains: [{ name: ".AR" }],
        alpha2Code: "BR",
        flag: { emoji: "emoji" },
      },
    ];

    expect(updatedCountries).toEqual(expectedCountries);
  });

  it("should call onClose function when submitting the form", async () => {
    const spy = jest.fn();
    const { container, getByText } = render(
      <MockedProvider
        mocks={[]}
        addTypename={false}
        cache={mockedCache}
        resolvers={resolversMock}
      >
        <CountryFormModal
          country={countriesWithDetails[0]}
          onClose={spy}
          show={true}
        />
      </MockedProvider>
    );

    const formInputs = container.getElementsByTagName("input");

    expect(formInputs).toHaveLength(5);
    await fireChangeInput(formInputs[0], "argentina");
    await fireChangeInput(formInputs[1], "buenos aires");
    await fireChangeInput(formInputs[2], "123");
    await fireChangeInput(formInputs[3], "567");
    await fireChangeInput(formInputs[4], ".AR");

    await act(async () => {
      getByText("Salvar").click();
    });

    const updatedFormValues = {
      name: "argentina",
      capital: "buenos aires",
      population: "123",
      area: "567",
      topLevelDomains: [{ name: ".AR" }],
    };

    expect(spy).toHaveBeenCalledWith(updatedFormValues);
  });
});
