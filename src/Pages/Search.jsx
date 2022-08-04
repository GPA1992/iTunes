import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCards from './AlbumCards';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      enableButton: true,
      searchArtistName: '',
      anySong: [],
      searchResult: false,
      callingAPI: false,
      showResult: false,
      thisArtist: '',
    };
  }

  textCount = ({ target }) => {
    const { value } = target;
    this.setState({
      searchArtistName: value,
    }, () => {
      const minCaractere = 2;
      const text = value.length < minCaractere;
      this.setState({ enableButton: text });
    });
  }

  searchOnApi = async (event) => {
    event.preventDefault();
    const { searchArtistName } = this.state;
    this.setState({ callingAPI: true });
    const search = await searchAlbumsAPI(searchArtistName);
    const resultArray = search.length === 0;
    this.setState({
      anySong: [...search],
      searchResult: resultArray,
      showResult: !resultArray,
      callingAPI: false,
      thisArtist: searchArtistName,
      searchArtistName: '',
    });
  }

  render() {
    const { enableButton, searchArtistName, thisArtist,
      anySong, searchResult, showResult, callingAPI } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form action="">
            <input
              id="search-artist-input"
              onChange={ this.textCount }
              type="text"
              data-testid="search-artist-input"
              value={ searchArtistName }
            />
            <br />
            <br />
            <button
              disabled={ enableButton }
              type="button"
              data-testid="search-artist-button"
              onClick={ this.searchOnApi }
            >
              Pesquisar

            </button>
          </form>
        </div>
        <div>
          {callingAPI && (<Loading />)}
          { searchResult && (<span>Nenhum álbum foi encontrado</span>)}
          { showResult && (
            <h1>
              Resultado de álbuns de:
              {' '}
              { thisArtist }
            </h1>
          )}
          <br />
          { anySong.map((album) => (
            <AlbumCards
              key={ album.collectionId }
              collectionId={ album.collectionId }
              albumImage={ album.artworkUrl100 }
              albumName={ album.collectionName }
              artistName={ album.artistName }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
