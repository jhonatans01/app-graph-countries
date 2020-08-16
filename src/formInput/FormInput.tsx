import React, { useState, ChangeEvent } from "react";
import "./formInput.scss";

interface Props {
  readonly placeholder?: string;
  readonly type: "text" | "number";
  readonly name: string;
  readonly label?: string;
  readonly className?: string;
  readonly initialValue?: string | number;
  readonly required?: boolean;
}

function inititalValue(
  type: "text" | "number",
  initialValue?: string | number
) {
  if (initialValue) {
    return initialValue;
  }
  if (type === "text") return "";
  if (type === "number") return 0;
}

function onBlur(event: React.FocusEvent<HTMLInputElement>) {
  event.preventDefault();
  const target = event.target;
  if (target && target.required) {
    target.className = !target.value ? "form-input--warning" : "";
  }
}

export default function FormInput(props: Props) {
  const {
    name,
    label,
    className,
    type,
    placeholder,
    initialValue,
    required,
  } = props;
  const [value, setValue] = useState(inititalValue(type, initialValue));

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setValue(event.target.value);
  }

  return (
    <div className={`form-input ${className ? className : ""}`}>
      {label && (
        <label className={"form-input__label"} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
