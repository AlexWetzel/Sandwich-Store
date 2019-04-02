import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/Start";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import PropTypes from "prop-types";
import "./App.css";
import { connect } from 'react-redux';
import { getMenuData } from "./redux/actions";

const mapStateToProps = state => {
  return {
    data: state.data,
  }
}

class App extends Component {
  componentDidMount() {
    this.props.getMenuData();
  }

  menuRender = () => {
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
          <Route exact path="/menu" render={() => this.menuRender()} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  data: PropTypes.shape({
    sandwiches: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        meats: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          quantity: PropTypes.number
        }))
      })
    ),
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        stock: PropTypes.number
      })
    ),
  }),
  getMenuData: PropTypes.func
}

export default connect(mapStateToProps, { getMenuData })(App);
