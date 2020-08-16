import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App tests", () => {
  it("should render header and country cards list", () => {
    const { container } = render(<App />);
    const sectionElements = container.getElementsByTagName("section");
    const header = container.getElementsByTagName("nav");

    expect(header).toHaveLength(1);
    expect(header[0].className).toEqual("header");

    expect(sectionElements).toHaveLength(2);
    expect(sectionElements[0].className).toEqual("content");
    expect(sectionElements[1].className).toEqual("cards");
  });
});
