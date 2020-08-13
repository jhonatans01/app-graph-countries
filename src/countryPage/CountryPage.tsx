import React from "react";
import CountriesService from "../services/countriesService";
import { ApolloQueryResult } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Country } from "../types/country";
import "./countryPage.scss";
import Button from "../button/Button";
import CountryFormModal from "../countryFormModal/CountryFormModal";

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
    return this.state.country.loading ? (
      <div>loading ...</div>
    ) : (
      this.renderCountry()
    );
  }

  private showModal = () => {
    this.setState({ showEditForm: true });
  };

  private hideModal = () => {
    this.setState({ showEditForm: false });
  };

  private renderCountry() {
    const country: Country[] | undefined = this.state.country.data?.Country;
    return (
      (country && country[0] && (
        <>
          <div>
            <p className={'flag'}>{country[0].flag?.emoji}</p>
            <p>{country[0].name}</p>
            <p>{country[0].capital}</p>
            <p>{country[0].area}</p>
            {country[0].population && <p>{country[0].population}</p>}
            {country[0].topLevelDomains?.map(
              (topLevelDomain, index: number) => (
                <p key={index}>{topLevelDomain.name}</p>
              )
            )}
            <Button
              title={"Edit country"}
              type={"primary"}
              onClick={this.showModal}
            />
          </div>
          <CountryFormModal
            country={country[0]}
            show={this.state.showEditForm}
            onClose={this.hideModal}
          />
        </>
      )) || <></>
    );
  }
}

export default CountryPage;
