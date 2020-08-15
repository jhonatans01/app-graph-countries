import React from "react";
import searchImage from "!!file-loader!../../public/images/search.png";
import { RouteComponentProps, withRouter } from "react-router-dom";
import FormInput from "../formInput/FormInput";
import Form from "../form/Form";
import "./search.scss";

function Search(props: RouteComponentProps) {
  function onSubmit(values: any) {
    if (values.countryName) {
      props.history.push(`/country/${values.countryName}`);
    }
  }

  return (
    <Form onSubmit={onSubmit} className={"search"}>
      <FormInput
        type={"text"}
        name={"countryName"}
        placeholder={"Procurar por país"}
        className={"search__input"}
      />

      <button className={"search__button"} type="submit">
        <img className={"search__icon"} src={searchImage} />
      </button>
    </Form>
  );
}

export default withRouter(Search);
