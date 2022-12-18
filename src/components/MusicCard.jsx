import { React, Component } from 'react';
import { arrayOf } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

import Carregando from './Carregando';

class MusicCard extends Component {
  state = {
    loading: false,
    favoriteList: [],
  };

  async componentDidMount() {
    this.setState({ favoriteList: await getFavoriteSongs() });
  }

  handleFavorite = async (music) => {
    this.setState({
      loading: true,
    }, async () => {
      const list = await getFavoriteSongs();
      if (!list.some((m) => m.trackId === music.trackId)) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      this.setState({ loading: false, favoriteList: await getFavoriteSongs() });
    });
  };

  render() {
    const { loading, favoriteList } = this.state;
    const { selectedAlbum } = this.props;

    if (loading) return <Carregando />;
    return (
      <ul>
        {selectedAlbum.map((music, index) => (
          <li key={ `${music.artistId}-${index}` }>
            {index === 0 && (
              <>
                <img
                  src={ music.artworkUrl100 }
                  alt={ `Nome do álbum: ${music.collectionName}` }
                />
                <h1 data-testid="artist-name">
                  { `Nome banda/artista: ${music.artistName}` }
                </h1>
                <h2 data-testid="album-name">
                  { `Nome do álbum: ${music.collectionName}` }
                </h2>
                <h3>{ `Quantidade de músicas: ${music.trackCount}` }</h3>
                <h4>{ `Preço: USD ${music.collectionPrice}` }</h4>
              </>
            )}
            {index > 0 && (
              <>
                <h6>{music.trackName}</h6>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ `favorita-${index}` }>
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    id={ `favorita-${index}` }
                    onChange={ () => this.handleFavorite(music) }
                    checked={ favoriteList.some((m) => m.trackId === music.trackId) }
                  />
                </label>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  selectedAlbum: arrayOf,
}.isRequired;

export default MusicCard;
