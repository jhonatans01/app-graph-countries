import React from "react";
import CountriesService from "../services/countriesService";
import { ApolloQueryResult } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Country } from "../types/country";
import { Flag } from "./CountryPage.style";

interface State {
  country: ApolloQueryResult<any>;
}

class CountryPage extends React.Component<RouteComponentProps, State> {
  private readonly service: CountriesService;

  constructor(props: RouteComponentProps) {
    super(props);
    this.service = new CountriesService();
    this.state = { country: { loading: true, networkStatus: 1 } };
  }

  componentDidMount() {
    const params = this.props.match.params as any;
    this.service
      .get(params.name || "")
      .then((result: ApolloQueryResult<any>) =>
        this.setState({ country: result })
      );
  }

  render() {
    return this.state.country.loading ? (
      <div>loading ...</div>
    ) : (
      this.renderCountry()
    );
  }

  private renderCountry() {
    const country: Country[] | undefined = this.state.country.data?.Country;
    console.log(country);
    return (
      (country && country[0] && (
        <div>
          <Flag>{country[0].flag.emoji}</Flag>
          <p>{country[0].name}</p>
          <p>{country[0].capital}</p>
          <p>{country[0].area}</p>
          {country[0].population && <p>{country[0].population}</p>}
          {country[0].topLevelDomains?.map((topLevelDomain) => (
            <p>{topLevelDomain.name}</p>
          ))}
        </div>
      )) || <></>
    );
  }
}

export default CountryPage;
