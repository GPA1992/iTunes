import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusic from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
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

  ifChangeRemoveSong = async ({ target }) => {
    const { id } = target;
    this.setState({ loading: true });
    const songs = await getMusic(id);
    await removeSong(songs[0]);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs,
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
              { favoriteSongs.map(({ trackName, previewUrl, trackId, artworkUrl100 }) => (
                <div
                  onChange={ this.ifChangeRemoveSong }
                  name={ trackName }
                  key={ trackId }
                  id={ trackId }
                >
                  <img src={ artworkUrl100 } alt="" />
                  <MusicCard
                    songPreview={ previewUrl }
                    albumImage={ artworkUrl100 }
                    trackId={ trackId }
                    trackName={ trackName }
                  />
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
