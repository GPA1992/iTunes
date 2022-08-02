import React, { Component } from 'react';
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
