import '../index.css';

import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageLoading: false,
      songsSaved: '',
    };

    this.favoring = this.favoring.bind(this);
    this.handleClickCheck = this.handleClickCheck.bind(this);
  }

  handleClickCheck(/* event */) {
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      messageLoading: true,
    }, () => {
      const time = 1000;
      setTimeout(() => this.setState({ messageLoading: false }), time);
    });
  }

  async favoring(album) {
    const returnAPI = await addSong(album);
    if (returnAPI === 'OK') this.setState({ songsSaved: returnAPI });
  }

  render() {
    const { albumFull } = this.props;
    const { messageLoading, songsSaved } = this.state;
    return (
      <div>
        {messageLoading && <Loading />}
        {songsSaved === 'OK' && 'Graças a deus!'}
        <section>
          {albumFull.length > 0 && (
            <ul className="listaMusicasPai">
              {albumFull.map((e, i) => (
                <li key={ `${e.artistName}-${i}` }>
                  {i === 0 && (
                    <div className="album">
                      <img src={ e.artworkUrl100 } alt={ e.artistName } />
                      <h2 data-testid="album-name">{e.collectionName}</h2>
                      <p data-testid="artist-name">{e.artistName}</p>
                    </div>
                  )}
                  {i > 0 && (
                    <div>
                      <h3>{e.trackName}</h3>
                      <audio
                        data-testid="audio-component"
                        src={ e.previewUrl }
                        controls
                      >
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        {' '}
                        {' '}
                        <code>audio</code>
                        .
                      </audio>
                      <label htmlFor="fieldFavorite">
                        {/* Favorita */}
                        <input
                          type="checkbox"
                          id="fieldFavorite"
                          data-testid={ `checkbox-music-${e.trackId}` }
                          onClick={ () => this.favoring(e) }
                          onChange={ this.handleClickCheck }
                          className="favoriteSong"
                        />
                      </label>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumFull: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MusicCard;
