import '../index.css';

import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistNameFiled: '',
      offButton: true,
      artist: [],
      screenLoading: false,
      artistName: '',
      checkListSize: false,
    };

    this.handleFieldSearch = this.handleFieldSearch.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleFieldSearch(event) {
    this.setState({ artistNameFiled: event.target.value }, () => {
      const { artistNameFiled } = this.state;
      const minumumSizeName = 1;
      if (artistNameFiled.length > minumumSizeName) {
        this.setState({ offButton: false });
      } else {
        this.setState({ offButton: true });
      }
    });
  }

  handleClickSearch(artistName) {
    this.setState({
      artistNameFiled: '',
      screenLoading: true,
      artistName,
      checkListSize: true,
    }, async () => {
      const { artistNameFiled } = this.state;
      const SizeName = 1;
      if (artistNameFiled.length > SizeName) {
        this.setState({ offButton: false });
      } else {
        this.setState({ offButton: true });
      }
      const response = await searchAlbumsAPI(artistName);
      this.setState({ artist: response }, () => {
        const time = 1000;
        setTimeout(() => this.setState({ screenLoading: false }), time);
      });
    });
  }

  render() {
    const { artistNameFiled, offButton, artist, screenLoading, artistName,
      checkListSize } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form htmlFor="fieldSearch" className="formSearch">
          {screenLoading
            ? <h3>Carregando...</h3>
            : (
              <>
                <input
                  type="text"
                  name="fieldSearch"
                  id="fieldSearch"
                  placeholder="Banda/Artista"
                  data-testid="search-artist-input"
                  onChange={ this.handleFieldSearch }
                  value={ artistNameFiled }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ offButton }
                  onClick={ () => this.handleClickSearch(artistNameFiled) }
                >
                  Pesquisar
                </button>
              </>
            )}
        </form>
        {artistName !== ''
          ? (
            <h2 className="resultadosPesquisa">
              Resultado de álbuns de:
              {' '}
              {artistName}
              {' '}
              🎶
            </h2>) : ''}
        <ul className="listaAlbuns">
          {checkListSize
            && (artist.length > 0
              ? artist.map((e, i) => (
                <Link
                  to={ `/album/${e.collectionId}` }
                  data-testid={ `link-to-album-${e.collectionId}` }
                  key={ `${e.artistId}${i}` }
                >
                  <li>
                    <img src={ e.artworkUrl100 } alt={ e.artistName } />
                    <h2>{e.artistName}</h2>
                    <p>{e.collectionName}</p>
                  </li>
                </Link>
              ))
              : <h4>Nenhum álbum foi encontrado 😞</h4>)}
        </ul>
      </div>
    );
  }
}

export default Search;
