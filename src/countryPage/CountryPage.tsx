import React, { useState, useEffect } from "react";
import CountriesService from "../services/countriesService";
import { ApolloQueryResult } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Country } from "../types/country";
import "./countryPage.scss";
import Button from "../button/Button";
import CountryFormModal from "../countryFormModal/CountryFormModal";
import Card from "../card/Card";

function CountryPage(props: RouteComponentProps) {
  const service = new CountriesService();
  const [state, setState] = useState({
    country: { loading: true, networkStatus: 1 } as ApolloQueryResult<any>,
    showEditForm: false,
    error: undefined,
  });

  useEffect(() => {
    const params = props.match.params as any;
    service
      .get(params.name || "")
      .then((result: ApolloQueryResult<any>) =>
        setState({ ...state, country: result })
      );
  }, []);

  function showModal() {
    setState({ ...state, showEditForm: true });
  }

  function hideModal() {
    setState({ ...state, showEditForm: false });
  }

  function renderCountry() {
    const country: Country[] | undefined = state.country.data.Country;
    return (
      (country && country[0] && (
        <Card className={"country-page__card"}>
          <p className={"flag"}>{country[0].flag?.emoji}</p>
          <div className={"card__row"}>
            <span>País</span>
            <span>{country[0].name}</span>
          </div>

          <div className={"card__row"}>
            <span>Capital</span>
            <span>{country[0].capital}</span>
          </div>

          <div className={"card__row"}>
            <span>Área</span>
            <span>{country[0].area}</span>
          </div>

          <div className={"card__row"}>
            <span>População</span>
            <span>{country[0].population}</span>
          </div>

          <div className={"card__row"}>
            <span>Domínio de topo</span>
            <span>
              {country[0].topLevelDomains?.find((name, i) => i === 0)?.name}
            </span>
          </div>

          <Button title={"Editar país"} type={"primary"} onClick={showModal} />
          <CountryFormModal
            country={country[0]}
            show={state.showEditForm}
            onClose={hideModal}
          />
        </Card>
      )) || <>country not found</>
    );
  }

  const { country } = state;

  if (country.loading) return <div>loading ...</div>;
  if (country.error) return <div>error</div>;

  return renderCountry();
}

export default CountryPage;
