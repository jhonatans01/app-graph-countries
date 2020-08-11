import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import CountryCards from "./countryCard/CountryCards";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <Route path="/" exact component={CountryCards} />
        </div>
      </Router>
    </div>
  );
}

export default App;
