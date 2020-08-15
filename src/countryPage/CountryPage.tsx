import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Country } from "../types/country";
import "./countryPage.scss";
import Button from "../button/Button";
import CountryFormModal from "../countryFormModal/CountryFormModal";
import Card from "../card/Card";

const query = gql`
  query GetCountry($name: String!) {
    Country(name: $name) @client
  }
`;

function CountryPage(props: RouteComponentProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  const params: any = props.match.params;
  const { loading, error, data } = useQuery(query, {
    variables: { name: params.name },
  });

  function showModal() {
    setShowEditForm(true);
  }

  function hideModal(newValues?: any) {
    setShowEditForm(false);
    if (newValues.name) {
      props.history.push(`/country/${newValues.name}`);
    }
  }

  function renderCountry() {
    const country: Country | undefined = data.Country;
    return (
      (country && (
        <Card className={"country-page__card"}>
          <p className={"flag"}>{country.flag?.emoji}</p>
          <div className={"card__row"}>
            <span>País</span>
            <span>{country.name}</span>
          </div>

          <div className={"card__row"}>
            <span>Capital</span>
            <span>{country.capital}</span>
          </div>

          <div className={"card__row"}>
            <span>Área</span>
            <span>{country.area}</span>
          </div>

          <div className={"card__row"}>
            <span>População</span>
            <span>{country.population}</span>
          </div>

          <div className={"card__row"}>
            <span>Domínio de topo</span>
            <span>
              {country.topLevelDomains?.find((name, i) => i === 0)?.name}
            </span>
          </div>

          <Button title={"Editar país"} type={"primary"} onClick={showModal} />
          <CountryFormModal
            country={country}
            show={showEditForm}
            onClose={hideModal}
          />
        </Card>
      )) || <>Country not found</>
    );
  }

  if (loading || !data) return <div>loading ...</div>;
  if (error) return <div>error</div>;

  return renderCountry();
}

export default CountryPage;
