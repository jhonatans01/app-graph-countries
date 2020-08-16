import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FormInput from "./FormInput";

describe("FormInput tests", () => {
  it("should render correct class name for wrapper", () => {
    const { container } = render(<FormInput name={"name"} type={"text"} />);

    expect(container.firstElementChild?.className).toEqual("form-input ");
  });

  it("should render correct class name for wrapper when is passed by props", () => {
    const { container } = render(
      <FormInput name={"name"} type={"text"} className={"test"} />
    );

    expect(container.firstElementChild?.className).toEqual("form-input test");
  });

  it("should set initial when is text type and value when passed by props", () => {
    const { container } = render(
      <FormInput name={"name"} type={"text"} initialValue={"initial"} />
    );

    let input = container.getElementsByTagName("input");
    expect(input).toBeTruthy();
    expect(input).toHaveLength(1);
    expect(input[0].value).toEqual("initial");
  });

  it("should set initial value as empty string when is not passed by props", () => {
    const { container } = render(<FormInput name={"name"} type={"text"} />);

    let input = container.getElementsByTagName("input");
    expect(input).toBeTruthy();
    expect(input).toHaveLength(1);
    expect(input[0].value).toEqual("");
  });

  it("should set initial value when is number type and value is passed by props", () => {
    const { container } = render(
      <FormInput name={"name"} type={"number"} initialValue={123} />
    );

    let input = container.getElementsByTagName("input");
    expect(input).toBeTruthy();
    expect(input).toHaveLength(1);
    expect(input[0].value).toEqual("123");
  });

  it("should set initial value as 0 when is not passed by props", () => {
    const { container } = render(<FormInput name={"name"} type={"number"} />);

    let input = container.getElementsByTagName("input");
    expect(input).toBeTruthy();
    expect(input).toHaveLength(1);
    expect(input[0].value).toEqual("0");
  });

  it("should render form input with label when is passed by props", () => {
    const { container } = render(
      <FormInput
        name={"name"}
        type={"text"}
        className={"test"}
        label={"label test"}
      />
    );

    const label = container.getElementsByTagName("label");

    expect(label).toHaveLength(1);
    expect(label[0].textContent).toEqual("label test");
    expect(label[0].className).toEqual("form-input__label");
  });
});
