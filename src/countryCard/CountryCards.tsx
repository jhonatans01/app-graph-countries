import React, { useEffect, useState } from "react";
import CountriesService from "../services/countriesService";
import { ApolloQueryResult } from "@apollo/client";
import { Cards, Card, Flag } from "./CountryCard.style";
import { Country } from "../types/country";
import Button from "../button/Button";

const service = new CountriesService();
const initialState = {
  loading: true,
  networkStatus: 1,
};

function CountryCard({ countries }: any) {
  return (
    countries.data?.Country?.map((country: Country, key: number) => (
      <Card key={key}>
        <Flag>{country.flag?.emoji}</Flag>
        <p>{country.name}</p>
        <p>{country.capital}</p>
        <Button title={"Detalhes"} type={"primary"} />
      </Card>
    )) || <></>
  );
}

function CountryCards() {
  const [countries, setQueryResult] = useState<ApolloQueryResult<any>>(
    initialState
  );

  useEffect(() => {
    service
      .getAll()
      .then((result: ApolloQueryResult<any>) => setQueryResult(result));
  }, []);

  return countries?.loading ? (
    <div>loading ...</div>
  ) : (
    <Cards>
      <CountryCard countries={countries} />
    </Cards>
  );
}

export default CountryCards;
