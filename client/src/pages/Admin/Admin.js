import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import LoginForm from "../../components/LoginForm";
import ControlPanel from "../../components/ControlPanel";
import { IngredientTable, IngredientTableRow } from "../../components/IngredientTable";
import { connect } from "react-redux";
import { getMenuData, sendInventoryUpdate } from "../../redux/actions";
import axios from "axios";

const matchStateToProps = state => {
  return {
    inventory: state.inventory
  }
}

const AuthState = {
  isAuthenticated: false,
  login(cb) {
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
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  state = {
    username: "",
    pin: "",
    counter: 0,
    allowInvSubmit: true,
    redirect: false,
    message: "",
    inventoryForm: []
  };

  componentDidMount() {
    // MUST HAVE DATA BEFORE THIS IS CALLED
    this.ingredientFormFields();
  }

  ingredientFormFields() {
    console.log("inventory:", this.props.inventory);
    const inventory = this.props.inventory.map( ingredient => {
        return { ...ingredient, newStock: ingredient.stock }
      }   
    );

    this.setState({ inventoryForm: inventory });
  }

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

    const inventory = this.state.inventoryForm;
    this.props.sendInventoryUpdate(inventory);
  }

  handleInventoryChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const inventory = this.state.inventoryForm;

    const newInventory = inventory.map(ingredient => {
      if (ingredient.name === name) {
        return { ...ingredient, newStock: value };
      } else {
        return ingredient;
      }
    });

    this.setState({
      inventoryForm: newInventory
    });
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

  mapFormToRow = ingrName => {

  }

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
          >
            <IngredientTable
              inventory={this.state.inventoryForm}
              allowInvSubmit={this.state.allowInvSubmit}              
              submit={e => this.handleInventorySubmit(e)}
            >
              {this.props.inventory.map((ingredient, index) => {
                return <IngredientTableRow
                  name={ingredient.name}
                  key={ingredient.name}
                  type={ingredient.type}
                  stock={ingredient.stock}
                  newStock={this.state.inventoryForm[index].newStock}
                  handleInventoryChange={e => this.handleInventoryChange(e)}
                />
              })}
            </IngredientTable>
          </ControlPanel>
        )}
      </div>
    );
  }
}

Admin.propTypes = {
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      stock: PropTypes.number
    })
  ),
  sendInventoryUpdate: PropTypes.func,
  getMenuData: PropTypes.func
}

export default connect(matchStateToProps, { sendInventoryUpdate, getMenuData })(Admin);