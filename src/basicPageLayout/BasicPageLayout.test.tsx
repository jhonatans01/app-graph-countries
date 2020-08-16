import React from "react";
import { render } from "@testing-library/react";
import BasicPageLayout from "./BasicPageLayout";

describe("BasicPageLayout tests", () => {
  it("should render header", () => {
    const { container } = render(<BasicPageLayout />);

    const header = container.getElementsByTagName("nav");
    expect(header).toHaveLength(1);
  });

  it("should render main section with correct className", () => {
    const { container } = render(<BasicPageLayout />);

    const mainSection = container.getElementsByTagName("section");
    expect(mainSection).toHaveLength(1);
    expect(mainSection[0].className).toEqual("content");
  });

  it("should render children passed by props", () => {
    const { container } = render(
      <BasicPageLayout>
        <p>child 1</p>
        <p>child 2</p>
      </BasicPageLayout>
    );

    const children = container.getElementsByTagName("p");
    expect(children).toHaveLength(2);
    expect(children[0].innerHTML).toEqual("child 1");
    expect(children[1].innerHTML).toEqual("child 2");
  });
});
