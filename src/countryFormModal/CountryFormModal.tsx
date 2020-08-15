import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import CountriesService from "../services/countriesService";
import { Country } from "../types/country";
import "./countryFormModal.scss";
import Button from "../button/Button";
import { countries } from "../repositories/countryRepository";
import Form from "../form/Form";
import FormInput from "../formInput/FormInput";

interface Props {
  readonly country: Country;
  readonly show: boolean;
  readonly onClose: () => void;
}

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

const service = new CountriesService();

function CountryFormModal(props: Props) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    const { name, capital, area, population, topLevelDomains } = props.country;
    setValues({
      name: name,
      capital: capital,
      area: area || 0,
      population: population || 0,
      topLevelDomains: topLevelDomains || [{ name: "" }],
    });
  }, []);

  function submitForm(values: any) {
    if (values.topLevelDomains) {
      values.topLevelDomains = [{ name: values.topLevelDomains }];
    }
    console.log(values);
    props.onClose();
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
