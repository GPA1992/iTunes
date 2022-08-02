import React, { Component } from 'react';
import Header from '../components/Header';
class Search extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <div>search</div>
        </div>
      </div>
    );
  }
}

export default Search;
