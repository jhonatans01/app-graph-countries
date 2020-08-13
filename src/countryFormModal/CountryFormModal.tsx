import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import CountriesService from "../services/countriesService";
import { Country } from "../types/country";
import { Flag } from "../countryPage/CountryPage.style";
import Button from "../button/Button";
import { Modal, ModalMain } from "./CountryFormModal.style";

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

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const fieldName = e.target.name;
    if (fieldName === "topLevelDomains") {
      setValues({ ...values, [fieldName]: [{ name: e.target.value }] });
    } else {
      setValues({ ...values, [fieldName]: e.target.value });
    }
  }

  function submitForm(event: FormEvent) {
    event.preventDefault();
    service.save(values);
  }

  return props.show ? (
    <Modal>
      <ModalMain>
        <form onSubmit={submitForm}>
          <Flag>{props.country.flag?.emoji}</Flag>
          <p>
            Name:{" "}
            <input name="name" value={values.name} onChange={onChange}></input>
          </p>
          <p>
            Capital:{" "}
            <input
              name="capital"
              value={values.capital}
              onChange={onChange}
            ></input>
          </p>
          <p>
            Population:{" "}
            <input
              name="population"
              value={values.population}
              onChange={onChange}
              type="number"
            ></input>
          </p>
          <p>
            Area:{" "}
            <input
              name="area"
              value={values.area}
              onChange={onChange}
              type="number"
            ></input>
          </p>
          <p>
            Top level domain:{" "}
            <input
              name="topLevelDomains"
              value={values.topLevelDomains[0].name}
              onChange={onChange}
            ></input>
          </p>
          <Button title={"Submit"} type={"primary"} />
          <Button title={"Cancel"} type={"secondary"} onClick={props.onClose} />
        </form>
      </ModalMain>
    </Modal>
  ) : (
    <></>
  );
}

export default CountryFormModal;
