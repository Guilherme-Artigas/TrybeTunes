import { React, Component } from 'react';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

import Carregando from '../components/Carregando';
import Header from '../components/Header';

class Favorites extends Component {
  state = {
    favoriteList: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const list = await getFavoriteSongs();
    this.setState({ loading: false, favoriteList: list });
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

    return (
      <>
        <Header />
        <main data-testid="page-favorites">
          {loading && <Carregando />}
          {favoriteList.length > 0 && (
            favoriteList.map((music, index) => (
              <li key={ `${music.artistId}-${index}` }>
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
              </li>
            ))
          )}
          {favoriteList.length < 1 && <p>Você ainda não favoritou nenhuma música!</p>}
        </main>
      </>
    );
  }
}

export default Favorites;
