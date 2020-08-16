import React, { PropsWithChildren } from "react";
import "./card.scss";

export default function Card(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div data-testid={"country-card-test-id"} className={`card ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
}
