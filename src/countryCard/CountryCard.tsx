import React from "react";
import { Country } from "../types/country";
import Button from "../button/Button";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./countryCard.scss";
import Card from "../card/Card";

interface Props {
  countries: Country[];
}

function CountryCard(props: Props & RouteComponentProps) {
  function goToDetailsPage(countryName: string) {
    props.history.push(`/country/${countryName}`);
  }

  return (
    (
      <>
        {props.countries.map((country: Country, key: number) => (
          <Card className={"country-card__card"} key={key}>
            <p className={"flag"}>{country.flag?.emoji}</p>
            <p className={"card__text--title"}>{country.name}</p>
            <p className={"card__text"}>{country.capital}</p>
            <Button
              title={"Detalhes"}
              type={"primary"}
              onClick={() => goToDetailsPage(country.name)}
            />
          </Card>
        ))}
      </>
    ) || <></>
  );
}

export default withRouter(CountryCard);
