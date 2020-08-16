import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Search from "./Search";

describe("Search tests", () => {
  let history: any;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/");
  });

  it("should render form input", () => {
    const { getByPlaceholderText } = render(
      <Router history={history}>
        <Search />
      </Router>
    );

    expect(getByPlaceholderText("Procurar por país")).toBeInTheDocument();
  });

  it("should render form with correct className", () => {
    const { container } = render(
      <Router history={history}>
        <Search />
      </Router>
    );

    expect(container.firstElementChild?.className).toEqual("search");
  });

  it("should render submit button with correct className", () => {
    const { container } = render(
      <Router history={history}>
        <Search />
      </Router>
    );

    const submitButton = container.getElementsByTagName("button");
    expect(submitButton).toHaveLength(1);
    expect(submitButton[0].className).toEqual("search__button");
    expect(submitButton[0].firstElementChild?.className).toEqual(
      "search__icon"
    );
  });

  it("should redirect to details page when click on submit button an has some text", () => {
    const { container, getByPlaceholderText } = render(
      <Router history={history}>
        <Search />
      </Router>
    );

    const input = getByPlaceholderText("Procurar por país");
    fireEvent.change(input, { target: { value: "brazil" } });

    const submitButton = container.getElementsByTagName("button");
    submitButton[0].click();

    expect(history.location.pathname).toEqual("/country/brazil");
  });
});
