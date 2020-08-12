import React, { PropsWithChildren } from "react";
import Header from "./Header";

function BasicPageLayout(props: PropsWithChildren<any>) {
  return (
    <div>
      <Header />
      <section>{props.children}</section>
    </div>
  );
}

export default BasicPageLayout;
