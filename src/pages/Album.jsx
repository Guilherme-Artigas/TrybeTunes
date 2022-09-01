import '../index.css';

import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumFull: [],
    };

    this.fullAlbumInfo = this.fullAlbumInfo.bind(this);
  }

  componentDidMount() {
    this.fullAlbumInfo();
  }

  async fullAlbumInfo() {
    const { match: { params: { id } } } = this.props;
    const infoAlbum = await getMusics(id);
    this.setState({ albumFull: infoAlbum });
  }

  render() {
    const { albumFull } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {albumFull.length > 0 && (
          <ul className="listaMusicasPai">
            {albumFull.map((e, i) => (
              <li key={ `${e.artistName}${i}` }>
                {i === 0 && (
                  <div className="album">
                    <img src={ e.artworkUrl100 } alt={ e.artistName } />
                    <h2 data-testid="album-name">{e.collectionName}</h2>
                    <p data-testid="artist-name">{e.artistName}</p>
                  </div>
                )}
                {i > 0 && (
                  <div className="">
                    <h3>{e.trackName}</h3>
                    <audio data-testid="audio-component" src={ e.previewUrl } controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
