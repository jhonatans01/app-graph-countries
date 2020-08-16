import React from "react";
import { render } from "@testing-library/react";
import BasicPageLayout from "./BasicPageLayout";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("BasicPageLayout tests", () => {
  let history: any;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/");
  });

  it("should render header", () => {
    const { container } = render(
      <Router history={history}>
        <BasicPageLayout />
      </Router>
    );

    const header = container.getElementsByTagName("nav");
    expect(header).toHaveLength(1);
  });

  it("should render main section with correct className", () => {
    const { container } = render(
      <Router history={history}>
        <BasicPageLayout />
      </Router>
    );

    const mainSection = container.getElementsByTagName("section");
    expect(mainSection).toHaveLength(1);
    expect(mainSection[0].className).toEqual("content");
  });

  it("should render children passed by props", () => {
    const { container } = render(
      <Router history={history}>
        <BasicPageLayout>
          <p>child 1</p>
          <p>child 2</p>
        </BasicPageLayout>
      </Router>
    );

    const children = container.getElementsByTagName("p");
    expect(children).toHaveLength(2);
    expect(children[0].innerHTML).toEqual("child 1");
    expect(children[1].innerHTML).toEqual("child 2");
  });
});
