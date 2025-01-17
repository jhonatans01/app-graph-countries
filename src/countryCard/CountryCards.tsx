import React from "react";
import { gql, useQuery } from "@apollo/client";
import CountryCard from "./CountryCard";
import Search from "../search/Search";
import "./countryCard.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";

const query = gql`
  query {
    Country @client
  }
`;

function isInitialValue(data: any) {
  return data.Country && data.Country[0] && data.Country[0].name === undefined;
}

function CountryCards(props: RouteComponentProps) {
  const { loading, data, error } = useQuery(query);

  if (loading || isInitialValue(data)) return <div>loading ...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Search />
      <section className={"cards"}>
        <CountryCard countries={data.Country} {...props} />
      </section>
    </>
  );
}

export default withRouter(CountryCards);
