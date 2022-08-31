import React from 'react';
import { Redirect, BrowserRouter, Route } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldNameValue: '',
      offButton: true,
      isLoaded: false,
      screenLoading: false,
    };

    this.handleNameUser = this.handleNameUser.bind(this);
    this.identifyUser = this.identifyUser.bind(this);
  }

  handleNameUser(event) {
    this.setState({ fieldNameValue: event.target.value }, () => {
      const { fieldNameValue } = this.state;
      const minimumSizeName = 2;
      if (fieldNameValue.length > minimumSizeName) {
        this.setState({ offButton: false });
      } else {
        this.setState({ offButton: true });
      }
    });
  }

  identifyUser(name) {
    this.setState({
      fieldNameValue: '',
      screenLoading: true,
    }, async () => {
      const { fieldNameValue } = this.state;
      const SizeName = 2;
      if (fieldNameValue.length > SizeName) {
        this.setState({ offButton: false });
      } else {
        this.setState({ offButton: true });
      }
      const response = await createUser(name);
      if (response === 'OK') {
        this.setState({ isLoaded: true });
      }
    });
  }

  render() {
    const { offButton, fieldNameValue, isLoaded, screenLoading } = this.state;
    if (screenLoading) {
      return (
        <BrowserRouter>
          <Route path="/">
            {isLoaded ? <Redirect to="/search" /> : <Loading />}
          </Route>
        </BrowserRouter>
      );
    }
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <label htmlFor="fieldName">
            Nome:
            <input
              type="text"
              name="username"
              value={ fieldNameValue }
              data-testid="login-name-input"
              id="fieldName"
              onChange={ this.handleNameUser }
            />
          </label>

          <br />

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ offButton }
            onClick={ () => this.identifyUser({ name: fieldNameValue }) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
