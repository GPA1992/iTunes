import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading';

class Edit extends Component {
    state = {
      name: '',
      email: '',
      image: '',
      description: '',
      onLoading: false,
      disableEnter: true,
    }

    async componentDidMount() {
      this.setState({ onLoading: true });
      const getUserAPI = await (getUser());
      const { name, email, image, description } = getUserAPI;
      this.setState({
        name,
        email,
        image,
        description,
        onLoading: false,
      }, this.checkAllForm);
    }

    checkAllForm = () => {
      const { name, email, image, description } = this.state;
      const errors = [
        !name.length,
        !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email),
        !email.length,
        !image.length,
        !description.length,
      ];
      const checkErrors = errors.every((error) => error === false);
      this.setState({ disableEnter: !checkErrors });
    }

    getInfo = ({ target }) => {
      const { value, name } = target;
      this.setState({
        [name]: value,
      }, this.checkAllForm);
    }

    funcUpdateUser = async () => {
      const { name, email, image, description } = this.state;
      this.setState({ onLoading: true });
      await updateUser({ name, email, image, description });
      this.setState({
        onLoading: false,
      });
      const { history } = this.props;
      history.push('/profile');
    }

    render() {
      const { onLoading, disableEnter, name,
        email, description, image } = this.state;
      return (
        <div>
          <Header />
          <div data-testid="page-profile-edit">
            { onLoading ? (<Loading />
            ) : (
              <div>
                <div>
                  <h3>Nome</h3>
                  <input
                    onChange={ this.getInfo }
                    name="name"
                    data-testid="edit-input-name"
                    type="text"
                    placeholder="nome"
                    value={ name }
                  />
                  <br />
                  <h3>email</h3>
                  <input
                    onChange={ this.getInfo }
                    name="email"
                    data-testid="edit-input-email"
                    type="email"
                    placeholder="email"
                    value={ email }
                  />
                  <br />
                  <h3>description</h3>
                  <textarea
                    onChange={ this.getInfo }
                    name="description"
                    data-testid="edit-input-description"
                    type="text"
                    cols="30"
                    rows="10"
                    placeholder="descrição"
                    value={ description }
                  />
                  <br />
                  <h3>image</h3>
                  <input
                    onChange={ this.getInfo }
                    name="image"
                    data-testid="edit-input-image"
                    type="text"
                    placeholder="URL da Imagem"
                    value={ image }
                  />
                  <br />
                  <button
                    disabled={ disableEnter }
                    onClick={ this.funcUpdateUser }
                    type="submit"
                    data-testid="edit-button-save"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
}
Edit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Edit;
