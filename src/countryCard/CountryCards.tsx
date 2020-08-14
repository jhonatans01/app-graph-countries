import React, { useEffect, useState } from "react";
import CountriesService from "../services/countriesService";
import { ApolloQueryResult } from "@apollo/client";
import CountryCard from "./CountryCard";
import Search from "../search/Search";
import "./countryCard.scss";

const service = new CountriesService();
const initialState = {
  loading: true,
  networkStatus: 1,
};

function CountryCards() {
  const [countries, setQueryResult] = useState<ApolloQueryResult<any>>(
    initialState
  );

  useEffect(() => {
    service
      .getAll()
      .then((result: ApolloQueryResult<any>) => setQueryResult(result));
  }, []);

  if (countries.loading) return <div>loading ...</div>;
  if (countries.error) return <div>error</div>;

  return (
    <>
      <Search />
      <section className={"cards"}>
        <CountryCard countries={countries.data.Country} />
      </section>
    </>
  );
}

export default CountryCards;
