import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusic from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistInfo: {},
      songs: [],
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

  render() {
    const { songs, artistInfo } = this.state;
    const { artistName, collectionName } = artistInfo;
    console.log(songs);
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <h1 data-testid="artist-name">{ artistName }</h1>
          <h2 data-testid="album-name">{ collectionName }</h2>
          { songs.map(({ trackName, previewUrl, trackId }) => (
            <MusicCard
              key={ trackId }
              songName={ trackName }
              songPreview={ previewUrl }
            />
          ))}

        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes
    .shape({ id: PropTypes.string.isRequired }) }).isRequired,
};
export default Album;
