import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusic from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistInfo: {},
      songs: [],
      onLoading: false,
    };
  }

  componentDidMount() {
    this.getAnyMusic();
  }

  getAnyMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const getSong = await getMusic(id);
    const tracks = await getSong.filter((song) => song.kind);
    this.setState({
      artistInfo: getSong[0],
      songs: [...tracks],
    });
  };

  addFavoriteSong = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({ onLoading: true });
    await addSong(id);
    this.setState({
      onLoading: false,
    });
  }

  render() {
    const { songs, artistInfo, onLoading } = this.state;
    const { artistName, collectionName, artworkUrl100 } = artistInfo;
    return (
      <div>
        <Header />
        { onLoading ? (<Loading />
        ) : (
          <div data-testid="page-album">
            <br />
            <img src={ artworkUrl100 } alt="" />
            <h1 data-testid="artist-name">{ artistName }</h1>
            <h2 data-testid="album-name">{ collectionName }</h2>
            { songs.map(({ trackName, previewUrl, trackId }) => (
              <MusicCard
                key={ trackId }
                songName={ trackName }
                songPreview={ previewUrl }
                albumImage={ artworkUrl100 }
                trackId={ trackId }
                addFavoriteSong={ this.addFavoriteSong }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes
    .shape({ id: PropTypes.string.isRequired }) }).isRequired,
};
export default Album;
