import React, { PropsWithChildren } from "react";
import Header from "./Header";
import "./basicPageLayout.scss";

function BasicPageLayout(props: PropsWithChildren<any>) {
  return (
    <>
      <Header />
      <section className={"content"}>{props.children}</section>
    </>
  );
}

export default BasicPageLayout;
