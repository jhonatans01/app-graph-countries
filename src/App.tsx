import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router";
import "./App.scss";
import CountryCards from "./countryCard/CountryCards";
import { ApolloProvider, ApolloQueryResult } from "@apollo/client";
import { ApiConfigService } from "./services/apiConfigService";
import CountryPage from "./countryPage/CountryPage";
import BasicPageLayout from "./basicPageLayout/BasicPageLayout";
import { createBrowserHistory } from "history";
import CountriesService from "./services/countriesService";
import { countriesVar } from "./repositories/cache";

const apiClient = ApiConfigService.getInstance();
const customHistory = createBrowserHistory();
const service = new CountriesService();

function App() {
  useEffect(() => {
    service.getAll().then((result: ApolloQueryResult<any>) => {
      countriesVar(result.data.Country);
    });
  }, []);
  return (
    <ApolloProvider client={apiClient}>
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
