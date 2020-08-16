import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button tests", () => {
  it("should render primary button with correct class name and correct title", () => {
    const { getByText } = render(
      <Button
        title={"button primary"}
        type={"primary"}
        onClick={() => undefined}
      />
    );

    const buttonElement = getByText("button primary");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.className).toEqual("btn btn--primary");
  });

  it("should render secondary button with correct class name and correct title", () => {
    const { getByText, container } = render(
      <Button
        title={"button secondary"}
        type={"secondary"}
        onClick={() => undefined}
      />
    );

    const buttonElement = getByText("button secondary");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.className).toEqual("btn btn--secondary");
  });

  it("should call action when clicked", () => {
    const mockChangeValue = jest.fn();
    const { getByText } = render(
      <Button
        title={"button title"}
        type={"primary"}
        onClick={mockChangeValue}
      />
    );

    getByText("button title").click();
    expect(mockChangeValue).toHaveBeenCalled();
  });
});
