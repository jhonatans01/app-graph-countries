import React from "react";
import { Router, Route, Switch } from "react-router";
import "./App.scss";
import CountryCards from "./countryCard/CountryCards";
import { ApolloProvider } from "@apollo/client";
import { ApiConfigService } from "./services/apiConfigService";
import CountryPage from "./countryPage/CountryPage";
import BasicPageLayout from "./basicPageLayout/BasicPageLayout";
import { createBrowserHistory } from "history";

const apiClient = ApiConfigService.getInstance();
const customHistory = createBrowserHistory();

function App() {
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
