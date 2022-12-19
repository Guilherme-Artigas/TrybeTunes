import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Carregando from '../components/Carregando';

import '../styles/Search.css';

class Search extends Component {
  state = {
    nameArtist: '',
    artistNameBackUp: '',
    searchResult: [],
    disableButton: true,
    loading: false,
    searchStarted: false,
  };

  handleArtist = ({ target: { value } }) => {
    this.setState({
      nameArtist: value,
      artistNameBackUp: value,
    }, this.handleButton);
  };

  handleButton = () => {
    const { nameArtist } = this.state;
    if (nameArtist.length > 1) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  searchArtists = async () => {
    const { nameArtist } = this.state;
    this.setState({ loading: true, searchStarted: true });
    const albumList = await searchAlbumsAPI(nameArtist);
    this.setState({
      searchResult: albumList,
      loading: false,
      nameArtist: '',
      disableButton: true,
    });
  };

  render() {
    const {
      nameArtist,
      disableButton,
      loading,
      searchResult,
      artistNameBackUp,
      searchStarted,
    } = this.state;

    return (
      <>
        <Header />
        <form data-testid="page-search">
          {loading ? (
            <Carregando />
          ) : (
            <>
              <label htmlFor="searchArtist">
                <input
                  type="text"
                  name="searchArtist"
                  id="searchArtist"
                  data-testid="search-artist-input"
                  onChange={ this.handleArtist }
                  value={ nameArtist }
                  placeholder="Nome Artista/Álbum"
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ disableButton }
                className="button-search-artist"
                onClick={ this.searchArtists }
              >
                Pesquisar
              </button>
            </>
          )}
        </form>
        <main>
          {searchResult.length > 0 && (
            <ul>
              <h2>{`Resultado de álbuns de: ${artistNameBackUp}`}</h2>
              {searchResult.map((album) => (
                <Link to={ `/album/${album.collectionId}` } key={ album.collectionId }>
                  <li data-testid={ `link-to-album-${album.collectionId}` }>
                    <img
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                    />
                    <p>{`Album: ${album.collectionName}`}</p>
                    <p>{`Artista: ${album.artistName}`}</p>
                    <p>{`Preço: ${album.collectionPrice}`}</p>
                    <p>{`Quantidade de músicas: ${album.trackCount}`}</p>
                  </li>
                </Link>
              ))}
            </ul>
          )}
          {searchStarted && !loading && searchResult.length < 1 && (
            <h2>Nenhum álbum foi encontrado 😥</h2>
          )}
        </main>
      </>
    );
  }
}

export default Search;