import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusic from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      onLoading: false,
      favoriteSong: [],
      checked: false,
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    const arrayID = [];
    favoriteSongs.forEach((songs) => (
      arrayID.push(songs.trackId)
    ));
    this.setState({ favoriteSong: [...arrayID] });
  }

  addFavoriteSong = async ({ target }) => {
    const { id, checked } = target;
    this.setState({ onLoading: true });
    const songs = await getMusic(id);
    await addSong(songs[0]);
    this.setState({
      onLoading: false,
      checked,
    });
  }

  render() {
    const { songName, songPreview, trackId, trackName } = this.props;
    const { onLoading, favoriteSong, checked } = this.state;
    const songVerify = favoriteSong.some((songID) => songID === trackId);
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
              onChange={ this.addFavoriteSong }
              id={ trackId }
              type="checkbox"
              name={ trackName }
              checked={ songVerify || checked }
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
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
