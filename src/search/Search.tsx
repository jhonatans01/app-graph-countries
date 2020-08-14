import React, { FormEvent } from "react";
import searchImage from "!!file-loader!../../public/images/search.png";
import { RouteComponentProps, withRouter } from "react-router-dom";
import FormInput from "../formInput/FormInput";
import Form from "../form/Form";
import "./search.scss";

interface State {
  countryName: string;
}

class Search extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { countryName: "" };
    this.submitSearch = this.submitSearch.bind(this);
    this.submit = this.submit.bind(this);
  }

  private submitSearch(event: FormEvent<any>) {
    event.preventDefault();
    const { countryName } = this.state;

    if (countryName !== "") {
      this.props.history.push(`/country/${countryName}`);
    }
  }

  private submit(values: any) {
    if (values.countryName) {
      this.props.history.push(`/country/${values.countryName}`);
    }
  }

  render() {
    return (
      <Form onSubmit={this.submit} className={"search"}>
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
}

export default withRouter(Search);
