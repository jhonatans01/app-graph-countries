import React, { useState, useEffect } from "react";
import { Country } from "../types/country";
import "./countryFormModal.scss";
import Button from "../button/Button";
import Form from "../form/Form";
import FormInput from "../formInput/FormInput";
import { gql, useMutation } from "@apollo/client";

interface Props {
  readonly country: Country;
  readonly show: boolean;
  readonly onClose: (newValues?: any) => void;
}

const updateCountryQuery = gql`
  mutation UpdateCountry(
    $name: String
    $capital: String!
    $alpha2Code: String!
    $population: Int!
    $area: Int!
    $flag: Flag!
    $topLevelDomains: [TopLevelDomain]!
  ) {
    updateCountry(
      name: $name
      capital: $capital
      alpha2Code: $alpha2Code
      area: $area
      flag: $flag
      population: $population
      topLevelDomains: $topLevelDomains
    ) @client {
      name
      capital
      alpha2Code
      area
      flag
      topLevelDomains
    }
  }
`;

const initialValues = {
  name: "",
  capital: "",
  population: 0,
  area: 0,
  topLevelDomains: [
    {
      name: "",
    },
  ],
};

function CountryFormModal(props: Props) {
  const [values, setValues] = useState(initialValues);
  const [updateCountry] = useMutation(updateCountryQuery);

  useEffect(() => {
    const { name, capital, area, population, topLevelDomains } = props.country;
    setValues({
      name: name,
      capital: capital,
      area: area || 0,
      population: population || 0,
      topLevelDomains: topLevelDomains || [{ name: "" }],
    });
  }, [props.country]);

  function submitForm(valuesFromForm: any) {
    if (valuesFromForm.topLevelDomains) {
      valuesFromForm.topLevelDomains = [
        { name: valuesFromForm.topLevelDomains },
      ];
    }

    const { name, capital, population, area, topLevelDomains } = valuesFromForm;

    updateCountry({
      variables: {
        name,
        capital,
        alpha2Code: props.country.alpha2Code,
        population,
        flag: props.country.flag,
        area,
        topLevelDomains,
      },
    });

    props.onClose(valuesFromForm);
  }

  return props.show ? (
    <div className={"modal"}>
      <div className={"modal__content"}>
        <Form onSubmit={submitForm}>
          <p className={"flag"}>{props.country.flag?.emoji}</p>

          <FormInput
            type={"text"}
            name={"name"}
            label={"País"}
            initialValue={values.name}
            required={true}
          />
          <FormInput
            type={"text"}
            name={"capital"}
            label={"Capital"}
            initialValue={values.capital}
          />
          <FormInput
            type={"number"}
            name={"population"}
            label={"População"}
            initialValue={values.population}
          />
          <FormInput
            type={"number"}
            name={"area"}
            label={"Área"}
            initialValue={values.area}
          />
          <FormInput
            type={"text"}
            name={"topLevelDomains"}
            label={"Domínio de topo"}
            initialValue={values.topLevelDomains[0].name}
          />
          <div className={"modal__buttons"}>
            <Button
              title={"Cancelar"}
              type={"secondary"}
              onClick={props.onClose}
            />
            <Button title={"Salvar"} type={"primary"} />
          </div>
        </Form>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default CountryFormModal;
