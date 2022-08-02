import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state= {
    enableButton: true,
  }

  textCount = ({ target }) => {
    const { value } = target;
    const minCaractere = 2;
    const text = value.length < minCaractere;
    this.setState({ enableButton: text });
  }

  render() {
    const { enableButton } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form action="">
            <input
              onChange={ this.textCount }
              type="text"
              data-testid="search-artist-input"
            />
            <button
              disabled={ enableButton }
              type="submit"
              data-testid="search-artist-button"
            >
              Pesquisar

            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
