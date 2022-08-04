import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songName, songPreview } = this.props;
    return (
      <div>
        <h3>{ songName }</h3>
        <br />
        <audio data-testid="audio-component" src={ songPreview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songName: PropTypes.string.isRequired,
  songPreview: PropTypes.string.isRequired,
};

export default MusicCard;
