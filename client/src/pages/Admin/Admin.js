import React, { Component } from "react";
import { Redirect } from "react-router";
import LoginForm from "../../components/LoginForm";
import ControlPanel from "../../components/ControlPanel";
import axios from "axios";

const AuthState = {
  isAuthenticated: false,
  login(cb) {
    console.log("Authorize state: true");
    this.isAuthenticated = true;
    return cb();
  },
  logout(cb) {
    this.isAuthenticated = false;
    return cb();
  }
};

class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleInventorySubmit = this.handleInventorySubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  state = {
    username: "",
    pin: "",
    counter: 0,
    allowInvSubmit: true,
    redirect: false,
    message: ""
  };

  componentDidMount() {
    axios
      .get("/user/")
      .then(res => {
        console.log(res.data.user);
        if (res.data.user) {
          this.login();
        }
      })
      .catch(err => console.log(err));
  }

  cloneInventory = ingredients => {
    const ingrClone = ingredients.map(ingredient => {
      let newObj = Object.assign({}, ingredient);
      newObj.newStock = ingredient.stock;
      return newObj;
    });
    return ingrClone;
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    console.log(this.state.username, this.state.pin);

    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.pin
      })
      .then(res => {
        if (res.data.userInfo) {
          console.log(res);

          this.login();
          this.setState({
            username: "",
            pin: ""
          });
        } else {
          const message = res.data.message;
          console.log(message);
          this.setState({
            message: message
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleInventorySubmit(event) {
    event.preventDefault();

    const inventory = this.props.inventory;

    axios
      .post("/api/inventory", {
        inventory: inventory
      })
      .then(res => {
        console.log(res.data.message);
        if (res.status === 200) {
          this.props.getMenuData(function() {
            console.log("Data update complete");
          });
        }
      })
      .catch(err => console.log(err));
  }

  login = () => {
    console.log("Attempting to authorize");
    AuthState.login(() => {
      this.setState(() => ({
        counter: 1
      }));
    });
  };

  logOut = () => {
    axios
      .post("/user/logout")
      .then(res => {
        AuthState.logout(() => {
          this.setState(() => ({
            redirect: true
          }));
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.redirect === true && <Redirect to="/" />}
        {AuthState.isAuthenticated === false ? (
          <LoginForm
            {...this.state}
            handleInputChange={e => this.handleInputChange(e)}
            handleLoginSubmit={e => this.handleLoginSubmit(e)}
          />
        ) : (
          <ControlPanel
            {...this.props}
            logOut={this.logOut}
            submit={e => this.handleInventorySubmit(e)}
            allowInvSubmit={this.state.allowInvSubmit}
          />
        )}
      </div>
    );
  }
}

export default Admin;