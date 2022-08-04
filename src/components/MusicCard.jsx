import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusic from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      onLoading: false,
    };
  }

  addFavoriteSong = async ({ target }) => {
    const { id } = target;
    this.setState({ onLoading: true });
    const songs = await getMusic(id);
    await addSong(songs[0]);
    this.setState({
      onLoading: false,
    });
  }

  render() {
    const { songName, songPreview, trackId } = this.props;
    const { onLoading } = this.state;
    return (
      <div>
        <div>
          { onLoading && (<Loading />)}
          <h3>{ songName }</h3>
          <audio data-testid="audio-component" src={ songPreview } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
          </audio>
          <label
            htmlFor="favorite-song"
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              onClick={ this.addFavoriteSong }
              id={ trackId }
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
/*   songs: PropTypes.string.isRequired, */
};

export default MusicCard;
