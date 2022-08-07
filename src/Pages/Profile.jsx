import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends Component {
  state = {
    onLoading: false,
    name: '',
    email: '',
    image: '',
    description: '',
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ onLoading: true });
    const getUserAPI = await (getUser());
    const { name, email, image, description } = getUserAPI;
    this.setState({
      name,
      email,
      image,
      description,
      onLoading: false,
    });
  }

  render() {
    const { name, email, image, description, onLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { onLoading ? (<Loading />
        ) : (
          <div>
            <br />
            <div>
              <h3>Foto</h3>
              <img className="foto" data-testid="profile-image" src={ image } alt="" />
            </div>
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <br />
            <div>
              <h3>Nome</h3>
              <span>{ name }</span>
            </div>
            <br />
            <div>
              <h3>E-mail</h3>
              <span>{ email }</span>
            </div>
            <br />
            <div>
              <h3>Descrição</h3>
              <span>{ description }</span>
            </div>
            <br />
          </div>
        )}

      </div>
    );
  }
}

export default Profile;
