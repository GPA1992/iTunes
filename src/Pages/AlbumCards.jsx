import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCards extends Component {
  render() {
    const { albumImage, albumName, collectionId, artistName } = this.props;
    return (
      <div>
        <img src={ albumImage } alt={ albumName } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Album
        </Link>
        <h2>
          { `Album: ${albumName}` }
        </h2>
        <h3>
          { `Artista: ${artistName}`}
        </h3>
      </div>
    );
  }
}

AlbumCards.propTypes = {
  albumImage: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
};
export default AlbumCards;
