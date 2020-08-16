import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card tests", () => {
  it("should render children", () => {
    const { getByText } = render(
      <Card>
        <p>Test</p>
      </Card>
    );

    expect(getByText("Test")).toBeInTheDocument();
  });

  it("should render with correct className when passed by props", () => {
    const { container } = render(<Card className={"test-classname"} />);

    expect(container.firstElementChild?.className).toEqual(
      "card test-classname"
    );
  });

  it("should render only with main class when className is not passed by props", () => {
    const { container } = render(<Card />);

    expect(container.firstElementChild?.className).toEqual("card ");
  });
});
