import React from "react";
import { PrimaryButton, SecondaryButton } from "./../styles/buttons.style";

interface Props {
  title: string;
  type: "primary" | "secondary";
  onClick?: () => any;
}

function Button(props: Props) {
  const { title, type, onClick } = props;

  return type === "primary" ? (
    <PrimaryButton onClick={onClick} type="submit">
      {title}
    </PrimaryButton>
  ) : (
    <SecondaryButton onClick={onClick} type="button">
      {title}
    </SecondaryButton>
  );
}

export default Button;
