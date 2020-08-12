import React from "react";
import { Link } from "react-router-dom";
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
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                </ul>
              </nav>
              <Switch>
                <Route path="/" exact component={CountryCards} />
                <Route path="/country/:name" exact component={CountryPage} />
              </Switch>
            </div>
          </BasicPageLayout>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
