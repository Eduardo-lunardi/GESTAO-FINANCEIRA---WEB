import React from "react";
import { Switch, Route } from "react-router-dom";
import loadable from "react-loadable";
import Loading from "./components/Loading";
import Menu from './components/Menu';

const cadastrarUser = loadable({
  loader: () => import("./views/user/CadastroUser"),
  loading: Loading
});

const dash = loadable({
  loader: () => import("./views/dash"),
  loading: Loading
});

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Menu />
        <div className={"container"}>
          <Switch>
            <Route exact path="/cadastrar/user" component={cadastrarUser}></Route>
            <Route exact path="/" component={dash}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
