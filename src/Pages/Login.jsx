import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const { funcCreateUser, getName, disableEnter, onLoading } = this.props;
    return (
      <div>
        { onLoading ? (<Loading />
        ) : (
          <div data-testid="page-login">
            <input
              data-testid="login-name-input"
              onChange={ getName }
              type="text"
              testid="login-name-input"
              placeholder="Nome"
            />
            <button
              disabled={ disableEnter }
              onClick={ funcCreateUser }
              type="button"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>)}
      </div>
    );
  }
}

Login.propTypes = {
  funcCreateUser: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
  disableEnter: PropTypes.bool.isRequired,
  onLoading: PropTypes.bool.isRequired,
};
export default Login;
