import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusic from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      onLoading: false,
      checked: false,
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    const { trackId } = this.props;
    const songVerify = favoriteSongs.some((songID) => songID.trackId === trackId);
    this.setState({ checked: songVerify });
  }

  addFavoriteSong = async (event) => {
    event.preventDefault();
    const { id, checked } = event.target;
    this.setState({ onLoading: true });
    const songs = await getMusic(id);
    if (checked) {
      await addSong(songs[0]);
      this.setState({
        onLoading: false,
        checked: true,
      });
    }
    if (!checked) {
      await removeSong(songs[0]);
      this.setState({
        onLoading: false,
        checked: false,
      });
    }
  }

  render() {
    const { songPreview, trackId, trackName } = this.props;
    const { onLoading, checked } = this.state;
    return (
      <div>
        <div>
          { onLoading && (<Loading />)}
          <h3>{ trackName }</h3>
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
              onChange={ this.addFavoriteSong }
              id={ trackId }
              type="checkbox"
              name={ trackName }
              checked={ checked }
            />
          </label>
          <hr />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songPreview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
