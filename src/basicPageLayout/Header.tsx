import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import "./basicPageLayout.scss";

function Link(props: { label: string; path: string }) {
  return (
    <li className={"header__link"}>
      <LinkRouter to={props.path}>{props.label}</LinkRouter>
    </li>
  );
}

function Header() {
  return (
    <nav className={"header"}>
      <ul className={"header__options"}>
        <Link path={"/"} label="Início" />
      </ul>
    </nav>
  );
}

export default Header;
