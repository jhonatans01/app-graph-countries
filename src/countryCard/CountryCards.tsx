import React, { useEffect, useState } from "react";
import CountriesService from "../services/countriesService";
import { ApolloQueryResult } from "@apollo/client";
import { Cards } from "./CountryCard.style";
import CountryCard from "./CountryCard";

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

  return countries?.loading ? (
    <div>loading ...</div>
  ) : (
    <Cards>
      <CountryCard countries={countries} />
    </Cards>
  );
}

export default CountryCards;
