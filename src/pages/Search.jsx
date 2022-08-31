import '../index.css';

import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistNameFiled: '',
      offButton: true,
    };

    this.handleFieldSearch = this.handleFieldSearch.bind(this);
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

  render() {
    const { artistNameFiled, offButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form htmlFor="fieldSearch" className="formSearch">
          <input
            type="text"
            name="fieldSearch"
            id="fieldSearch"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.handleFieldSearch }
            value={ artistNameFiled }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ offButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
