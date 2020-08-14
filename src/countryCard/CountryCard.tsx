import React from "react";
import { Country } from "../types/country";
import Button from "../button/Button";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./countryCard.scss";

interface Props {
  countries: Country[];
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
      this.props.countries.map((country: Country, key: number) => (
        <div className={"card"} key={key}>
          <p className={"flag"}>{country.flag?.emoji}</p>
          <p className={"card__text--title"}>{country.name}</p>
          <p className={"card__text"}>{country.capital}</p>
          <Button
            title={"Detalhes"}
            type={"primary"}
            onClick={() => this.goToDetailsPage(country.name)}
          />
        </div>
      )) || <></>
    );
  }
}

export default withRouter(CountryCard);
