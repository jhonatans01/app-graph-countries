import React, { FormEvent } from "react";
import searchImage from "./images/search.png";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface State {
  countryName: string;
}

class Search extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { countryName: "" };
    this.submitSearch = this.submitSearch.bind(this);
  }

  private submitSearch(event: FormEvent<any>) {
    event.preventDefault();
    const { countryName } = this.state;

    if (countryName !== "") {
      this.props.history.push(`/country/${countryName}`);
    }
  }

  render() {
    return (
      <form onSubmit={this.submitSearch}>
        <input
          type="text"
          placeholder="Procurar por país"
          onChange={(e: any) => this.setState({ countryName: e.target.value })}
        ></input>
        <button type="submit">
          <img src={"/images/search.png"}></img>
        </button>
      </form>
    );
  }
}

export default withRouter(Search);
