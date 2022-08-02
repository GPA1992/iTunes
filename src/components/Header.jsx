import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      onLoading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const getUserAPI = await (getUser());
    const { name } = getUserAPI;
    this.setState({
      user: name,
      onLoading: false,
    });
  }

  render() {
    const { user, onLoading } = this.state;
    this.getUserName();
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <br />
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        <br />
        { onLoading ? (<Loading />
        ) : (
          <span data-testid="header-user-name">
            { user }
          </span>) }
      </header>
    );
  }
}

export default Header;
