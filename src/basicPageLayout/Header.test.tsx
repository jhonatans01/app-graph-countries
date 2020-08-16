import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Header from "./Header";

describe("Header tests", () => {
  let history: any;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/");
  });

  it("should render with correct classname", () => {
    const { container } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    const element = container.firstElementChild;
    expect(element?.className).toEqual("header");
    expect(element?.firstElementChild?.className).toEqual("header__options");
  });

  it("should render a link for Home", () => {
    const { container } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    const linkElements = container.getElementsByTagName("li");
    expect(linkElements).toHaveLength(1);
    expect(linkElements[0].className).toEqual("header__link");
    expect(linkElements[0].children[0].textContent).toEqual("Início");
  });
});
