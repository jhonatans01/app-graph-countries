import React, { PropsWithChildren } from "react";
import "./card.scss";

export default function Card(props: PropsWithChildren<{}>) {
  return <div className={"card"}>{props.children}</div>;
}
