import React, { Component } from 'react';
import Header from '../../components/Header';

class Edit extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">Edit</div>
      </div>
    );
  }
}

export default Edit;
