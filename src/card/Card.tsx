import React, { PropsWithChildren } from "react";
import "./card.scss";

export default function Card(props: PropsWithChildren<{ className: string }>) {
  return (
    <div className={`card ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
}
