import React from "react";
import { Link } from "react-router-dom";

const LoginForm = props => {
  return (
    <div>
      <Link to="/">
        <button type="button" className="btn btn-danger btn-lg m-3">
          Back
        </button>
      </Link>
      <div className="container">
        <div className="row mt-5">
          <div className="jumbotron col-md-6 offset-md-3">
            <h1 className="text-center mb-4">Associate Login</h1>
            <Message message={props.message} />
            <form onSubmit={props.handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={props.username}
                  className="form-control"
                  onChange={props.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="text"
                  name="pin"
                  value={props.pin}
                  className="form-control"
                  onChange={props.handleInputChange}
                />
              </div>
              <LoginButton
                onClick={props.handleLoginSubmit}
                pin={props.pin}
                username={props.username}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginButton = (props) => {
  return props.username === "" || props.pin === "" ? (
    <button type="button" className="btn btn-secondary btn-lg" disabled>
      Submit
    </button>
  ) : (
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  );
};

const Message = props => {
  return props.message !== "" ? (
    <div className="alert alert-danger" role="alert">
      {props.message}
    </div>
  ) : null;
};

export default LoginForm;
