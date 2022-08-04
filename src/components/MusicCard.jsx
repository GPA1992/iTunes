import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songName, songPreview, trackId, addFavoriteSong } = this.props;
    return (
      <div>
        <div>
          <h3>{ songName }</h3>
          <audio data-testid="audio-component" src={ songPreview } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
          </audio>
          <label
            data-testid={ `checkbox-music-${trackId}` }
            htmlFor="favorite-song"
          >
            Favorita
            <input
              onClick={ addFavoriteSong }
              id="favorite-song"
              type="checkbox"
            />
          </label>
          <hr />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songName: PropTypes.string.isRequired,
  songPreview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  addFavoriteSong: PropTypes.func.isRequired,
};

export default MusicCard;
