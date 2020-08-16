import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router";
import "./App.scss";
import CountryCards from "./countryCard/CountryCards";
import {
  ApolloClient,
  ApolloProvider,
  ApolloQueryResult,
} from "@apollo/client";
import { ApiConfigService } from "./services/apiConfigService";
import CountryPage from "./countryPage/CountryPage";
import BasicPageLayout from "./basicPageLayout/BasicPageLayout";
import { createBrowserHistory } from "history";
import CountriesService from "./services/countriesService";

interface Props {
  apiClient?: ApolloClient<any>;
}

function apiClient() {
  return ApiConfigService.getInstance();
}

const customHistory = createBrowserHistory();
const service = new CountriesService();

function App(props: Props) {
  useEffect(() => {
    service.getAll().then((result: ApolloQueryResult<any>) => {
      service.setValuesToVar(result);
    });
  }, []);
  return (
    <ApolloProvider client={props.apiClient ? props.apiClient : apiClient()}>
      <div className="App">
        <Router history={customHistory}>
          <BasicPageLayout>
            <Switch>
              <Route path="/" exact component={CountryCards} />
              <Route path="/country/:name" exact component={CountryPage} />
            </Switch>
          </BasicPageLayout>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
