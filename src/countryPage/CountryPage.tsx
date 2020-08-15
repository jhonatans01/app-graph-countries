import React from "react";
import CountriesService from "../services/countriesService";
import { ApolloQueryResult } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Country } from "../types/country";
import "./countryPage.scss";
import Button from "../button/Button";
import CountryFormModal from "../countryFormModal/CountryFormModal";
import Card from "../card/Card";

interface State {
  country: ApolloQueryResult<any>;
  showEditForm: boolean;
}

class CountryPage extends React.Component<RouteComponentProps, State> {
  private readonly service: CountriesService;

  constructor(props: RouteComponentProps) {
    super(props);
    this.service = new CountriesService();
    this.state = {
      country: { loading: true, networkStatus: 1 },
      showEditForm: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    const params = this.props.match.params as any;
    this.service
      .get(params.name || "")
      .then((result: ApolloQueryResult<any>) =>
        this.setState({ country: result })
      );
  }

  render() {
    const { country } = this.state;

    if (country.loading) return <div>loading ...</div>;
    if (country.error) return <div>error</div>;

    return this.renderCountry();
  }

  private showModal = () => {
    this.setState({ showEditForm: true });
  };

  private hideModal = () => {
    this.setState({ showEditForm: false });
  };

  private renderCountry() {
    const country: Country[] | undefined = this.state.country.data.Country;
    return (
      (country && country[0] && (
        <Card>
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

          <Button
            title={"Editar país"}
            type={"primary"}
            onClick={this.showModal}
          />
          <CountryFormModal
            country={country[0]}
            show={this.state.showEditForm}
            onClose={this.hideModal}
          />
        </Card>
      )) || <>country not found</>
    );
  }
}

export default CountryPage;
