import React, { useState, ChangeEvent } from "react";
import "./formInput.scss";

interface Props {
  readonly placeholder?: string;
  readonly type: "text" | "number" | "search";
  readonly name: string;
  readonly label?: string;
  readonly className?: string;
  readonly initialValue?: string | number;
}

function inititalValue(
  type: "text" | "number" | "search",
  initialValue?: string | number
) {
  if (initialValue) {
    return initialValue;
  }
  if (type === "text") return "";
  if (type === "number") return 0;
  if (type === "search") return "";
}

export default function FormInput(props: Props) {
  const { name, label, className, type, placeholder, initialValue } = props;
  const [value, setValue] = useState(inititalValue(type, initialValue));

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setValue(event.target.value);
  }

  return (
    <div className={`form-input ${className && className}`}>
      {label && (
        <label htmlFor={name} className={className}>
          {label}
        </label>
      )}
      <input
        className={""}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
