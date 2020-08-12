import React from "react";
import { PrimaryButton } from "./../styles/buttons.style";

interface Props {
  title: string;
  type: "primary" | "secondary";
  onClick?: () => any;
}

function Button(props: Props) {
  const { title, type, onClick } = props;

  return <PrimaryButton onClick={onClick}>{title}</PrimaryButton>;
}

export default Button;
