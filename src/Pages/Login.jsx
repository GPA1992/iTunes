import React, { Component } from 'react';
/* import PropTypes from 'prop-types'; */
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    onLoading: false,
    name: '',
    disableEnter: true,
    loged: false,
  }

  getName = ({ target }) => {
    const { value } = target;
    const minCaractere = 3;
    const enableEnter = value.length < minCaractere;
    this.setState({
      disableEnter: enableEnter,
      name: value,
    });
  }

  funcCreateUser = async () => {
    const { name } = this.state;
    this.setState({ onLoading: true });
    await createUser({ name });
    this.setState({
      loged: true,
      onLoading: false,
    });
  }

  render() {
    const { loged, onLoading, disableEnter } = this.state;
    return (
      <div>
        { loged ? (<Redirect to="/search" />
        ) : (
          <div data-testid="page-login">
            <input
              data-testid="login-name-input"
              onChange={ this.getName }
              type="text"
              testid="login-name-input"
              placeholder="Nome"
            />
            <button
              disabled={ disableEnter }
              onClick={ this.funcCreateUser }
              type="button"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>)}
        { onLoading && (<Loading />)}
      </div>
    );
  }
}

/* Login.propTypes = {
  funcCreateUser: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
  disableEnter: PropTypes.bool.isRequired,
  onLoading: PropTypes.bool.isRequired,
}; */
export default Login;
