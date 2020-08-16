import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form from "./Form";
import FormInput from "../formInput/FormInput";

describe("Form tests", () => {
  it("should render correct class name for wrapper when is passed by props", () => {
    const { container } = render(
      <Form className={"class"} onSubmit={() => undefined} />
    );

    expect(container.firstElementChild?.className).toEqual("class");
  });

  it("should call submit function for passed by props", () => {
    const spy = jest.fn();
    const { container } = render(<Form className={"class"} onSubmit={spy} />);

    const formElement = container.firstElementChild;
    expect(formElement).toBeTruthy();

    fireEvent.submit(formElement || ({} as HTMLFormElement), {});
    expect(spy).toHaveBeenCalled();
  });

  it("should call submit fucntion with correct values", () => {
    const spy = jest.fn();
    const { container } = render(
      <Form onSubmit={spy}>
        <FormInput type={"text"} name={"name1"} />
        <p>random element</p>
        <FormInput type={"text"} name={"name2"} />
      </Form>
    );

    const inputElements = container.getElementsByTagName("input");
    expect(inputElements).toHaveLength(2);
    fireEvent.change(inputElements[0], { target: { value: "value 1" } });
    fireEvent.change(inputElements[1], { target: { value: "value 2" } });

    const formElement = container.firstElementChild;
    expect(formElement).toBeTruthy();

    fireEvent.submit(formElement || ({} as HTMLFormElement), {});

    expect(spy).toHaveBeenCalledWith({ name2: "value 2", name1: "value 1" });
  });

  it("should render elements passed by props", () => {
    const { container } = render(
      <Form onSubmit={() => undefined}>
        <p>element1</p>
        <p>element2</p>
      </Form>
    );

    let children = container.getElementsByTagName("p");
    expect(children).toBeTruthy();

    expect(children).toHaveLength(2);
    expect(children[0].innerHTML).toBe("element1");
    expect(children[1].innerHTML).toBe("element2");
  });
});
