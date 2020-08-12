import React from "react";
import { Country } from "../types/country";
import Button from "../button/Button";
import { Card, Flag } from "./CountryCard.style";
import { ApolloQueryResult } from "@apollo/client";
import { RouteComponentProps, withRouter } from "react-router-dom";
interface Props {
  countries: ApolloQueryResult<any>;
}

class CountryCard extends React.Component<Props & RouteComponentProps, {}> {
  constructor(props: Props & RouteComponentProps) {
    super(props);
    this.goToDetailsPage = this.goToDetailsPage.bind(this);
  }

  private goToDetailsPage(countryName: string) {
    this.props.history.push(`/country/${countryName}`);
  }

  render() {
    return (
      this.props.countries.data?.Country?.map(
        (country: Country, key: number) => (
          <Card key={key}>
            <Flag>{country.flag?.emoji}</Flag>
            <p>{country.name}</p>
            <p>{country.capital}</p>
            <Button
              title={"Detalhes"}
              type={"primary"}
              onClick={() => this.goToDetailsPage(country.name)}
            />
          </Card>
        )
      ) || <></>
    );
  }
}

export default withRouter(CountryCard);
