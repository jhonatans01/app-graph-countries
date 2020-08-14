import React, { PropsWithChildren, FormEvent } from "react";
import "./form.scss";

interface Props {
  readonly onSubmit: (values: any) => void;
  readonly className?: string;
}

export default function Form(props: PropsWithChildren<Props>) {
  let ref: HTMLFormElement | null;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values: any = {};
    const inputElements = ref?.getElementsByTagName("input");

    if (inputElements) {
      for (let i = 0; i < inputElements.length; i++) {
        const el = inputElements[i];
        values[el.name] = el.value;
      }
    }

    props.onSubmit(values);
  }

  return (
    <form
      className={props.className}
      onSubmit={onSubmit}
      ref={(input) => {
        ref = input;
      }}
    >
      {props.children}
    </form>
  );
}
