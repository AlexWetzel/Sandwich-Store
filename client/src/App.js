import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/Start";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import "./App.css";
import { connect } from 'react-redux';
import { getMenuData } from "./redux/actions";

const mapStateToProps = state => {
  return {
    data: state.data,
    inventory: state.inventory
  }
}

class App extends Component {
  state = {
    counter: 0
  };

  componentDidMount() {
    this.props.getMenuData();
  }

  menuRender = props => {
    if (this.props.data) {
      return (
        <Menu />
      );
    }
    return <h1>{"Fetching Data..."}</h1>;
  };

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/menu" render={props => this.menuRender(props)} />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, { getMenuData })(App);
