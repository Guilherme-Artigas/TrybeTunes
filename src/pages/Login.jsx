import { React, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

import Carregando from '../components/Carregando';

import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    validName: true,
    loading: false,
    loadingReady: false,
  };

  handleName = ({ target: { value } }) => {
    this.setState({ name: value }, this.handleButton);
  };

  handleButton = () => {
    const { name } = this.state;
    if (name.length > 2) {
      this.setState({ validName: false });
    } else {
      this.setState({ validName: true });
    }
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, loadingReady: true });
  };

  render() {
    const { name, validName, loading, loadingReady } = this.state;

    return (
      <>
        {loading && <Carregando />}
        {loadingReady && <Redirect to="/search" />}
        <form data-testid="page-login">
          <label htmlFor="fildName">
            <input
              type="text"
              id="fildName"
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ this.handleName }
              value={ name }
            />
          </label>
          <br />
          <button
            className="button-login"
            type="button"
            data-testid="login-submit-button"
            disabled={ validName }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

export default Login;
