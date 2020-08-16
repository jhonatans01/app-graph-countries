import React from "react";
import "./button.scss";

interface Props {
  title: string;
  type: "primary" | "secondary";
  onClick?: () => any;
}

function Button(props: Props) {
  const { title, type, onClick } = props;

  return (
    <button
      className={`btn btn--${type}`}
      onClick={onClick}
      type={props.type === "primary" ? "submit" : "button"}
    >
      {title}
    </button>
  );
}

export default Button;
