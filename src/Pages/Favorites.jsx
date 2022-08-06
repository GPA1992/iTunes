import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.ifRemoveSong();
  }

  ifRemoveSong = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  ifChangeRemoveSong = async (song) => {
    this.setState({ loading: true });
    await removeSong(song);
    const { favoriteSongs } = this.state;
    const newSongList = favoriteSongs
      .filter((thisSong) => thisSong.trackId !== song.trackId);
    this.setState({
      loading: false,
      favoriteSongs: newSongList,
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          { loading ? (<Loading />
          ) : (
            <div>
              { favoriteSongs.map((song) => (
                <div key={ song.trackId }>
                  <p>{ song.trackName }</p>
                  <audio data-testid="audio-component" src={ song.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    {' '}
                    <code>audio</code>
                  </audio>
                  <label htmlFor={ song.trackId }>
                    Favorita
                    <input
                      data-testid={ `checkbox-music-${song.trackId}` }
                      onChange={ () => this.ifChangeRemoveSong(song) }
                      id={ song.trackId }
                      type="checkbox"
                      defaultChecked
                    />
                  </label>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
