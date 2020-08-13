import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import CountriesService from "../services/countriesService";
import { Country } from "../types/country";
import { Flag } from "../countryPage/CountryPage.style";
import Button from "../button/Button";
import {countries} from "../repositories/countryRepository";

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
    const {name, capital, area, population, topLevelDomains} = props.country;
    setValues({
      name: name,
      capital: capital,
      area: area || 0,
      population: population || 0,
      topLevelDomains: topLevelDomains || [{name: ""}],
    });
  }, []);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const fieldName = e.target.name;
    if (fieldName === "topLevelDomains") {
      setValues({...values, [fieldName]: [{name: e.target.value}]});
    } else {
      setValues({...values, [fieldName]: e.target.value});
    }
  }

  function submitForm(event: FormEvent) {
    const cartItems = countries();
    cartItems.push(values as never);
    console.log(cartItems);
    event.preventDefault();
  }

  return props.show ? (
    <section className={'modal'}>
      <main className={'modal--content'}>
        <form onSubmit={submitForm}>
          <p className={'flag'}>{props.country.flag?.emoji}</p>
          <p>
            Name:{" "}
            <input name="name" value={values.name} onChange={onChange}/>
          </p>
          <p>
            Capital:{" "}
            <input
              name="capital"
              value={values.capital}
              onChange={onChange}
            />
          </p>
          <p>
            Population:{" "}
            <input
              name="population"
              value={values.population}
              onChange={onChange}
              type="number"
            />
          </p>
          <p>
            Area:{" "}
            <input
              name="area"
              value={values.area}
              onChange={onChange}
              type="number"
            />
          </p>
          <p>
            Top level domain:{" "}
            <input
              name="topLevelDomains"
              value={values.topLevelDomains[0].name}
              onChange={onChange}
            />
          </p>
          <Button title={"Submit"} type={"primary"}/>
          <Button title={"Cancel"} type={"secondary"} onClick={props.onClose}/>
        </form>
      </main>
    </section>
  ) : (
    <></>
  );
}

export default CountryFormModal;
