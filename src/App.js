import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Fingerprint from "./components/Fingerprint";
import FingerprintList from "./components/FingerprintList";
import AddFingerprint from "./components/AddFigerprint";

function App() {
  return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/fingerprint" className="navbar-brand">
              Hệ thống quản lý máy chấm công
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href={"/fingerprint"} className="nav-link">
                  Máy chấm công
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Thêm mới
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/fingerprint"]} component={FingerprintList} />
              <Route exact path="/add" component={AddFingerprint} />
              <Route path="/fingerprint/:id" component={Fingerprint} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
