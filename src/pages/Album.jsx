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
    const { match: { params: { id } } } = this.props; // this.props.match.params.id
    const infoAlbum = await getMusics(id);
    this.setState({ albumFull: infoAlbum });
    // setTimeout(() => console.log(infoAlbum), 1000);
  }

  render() {
    const { albumFull } = this.state;
    console.log(albumFull);
    return (
      <div data-testid="page-album">
        <Header />
        {albumFull.length > 0 && (
          <ul>
            {albumFull.map((e, i) => (
              <li key={ `${e.artistName}${i}` }>
                {i === 0 && (
                  <div>
                    <img src={ e.artworkUrl100 } alt={ e.artistName } />
                    <h2 data-testid="album-name">{e.collectionName}</h2>
                    <p data-testid="artist-name">{e.artistName}</p>
                  </div>
                )}
                {i > 0 && (
                  <>
                    <h3>{e.trackName}</h3>
                    <audio data-testid="audio-component" src={ e.previewUrl } controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                  </>
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

// Posição 0
// {
//   "wrapperType": "collection",
//   "collectionType": "Album",
//   "artistId": 1016633280,
//   "collectionId": 1434345841,
//   "amgArtistId": 3248914,
//   "artistName": "6LACK",
//   "collectionName": "East Atlanta Love Letter",
//   "collectionCensoredName": "East Atlanta Love Letter",
//   "artistViewUrl": "https://music.apple.com/us/artist/6lack/1016633280?uo=4",
//   "collectionViewUrl": "https://music.apple.com/us/album/east-atlanta-love-letter/1434345841?uo=4",
//   "artworkUrl60": "https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/34/af/97/34af9745-a76a-3bc0-4568-eec3030ffe66/18UMGIM53417.rgb.jpg/60x60bb.jpg",
//   "artworkUrl100": "https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/34/af/97/34af9745-a76a-3bc0-4568-eec3030ffe66/18UMGIM53417.rgb.jpg/100x100bb.jpg",
//   "collectionPrice": 9.99,
//   "collectionExplicitness": "explicit",
//   "contentAdvisoryRating": "Explicit",
//   "trackCount": 15,
//   "copyright": "℗ 2018 LVRN/Interscope Records",
//   "country": "USA",
//   "currency": "USD",
//   "releaseDate": "2018-09-14T07:00:00Z",
//   "primaryGenreName": "R&B/Soul"
// }

// {
//   "wrapperType": "track",
//   "kind": "song",
//   "artistId": 1016633280,
//   "collectionId": 1434345841,
//   "trackId": 1434345846,
//   "artistName": "6LACK",
//   "collectionName": "East Atlanta Love Letter",
//   "trackName": "Unfair",
//   "collectionCensoredName": "East Atlanta Love Letter",
//   "trackCensoredName": "Unfair",
//   "artistViewUrl": "https://music.apple.com/us/artist/6lack/1016633280?uo=4",
//   "collectionViewUrl": "https://music.apple.com/us/album/unfair/1434345841?i=1434345846&uo=4",
//   "trackViewUrl": "https://music.apple.com/us/album/unfair/1434345841?i=1434345846&uo=4",
//   "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/77/8a/35/778a35f2-998e-6ff8-5858-e96a87c8ff0d/mzaf_3471150799361310638.plus.aac.p.m4a",
//   "artworkUrl30": "https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/34/af/97/34af9745-a76a-3bc0-4568-eec3030ffe66/18UMGIM53417.rgb.jpg/30x30bb.jpg",
//   "artworkUrl60": "https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/34/af/97/34af9745-a76a-3bc0-4568-eec3030ffe66/18UMGIM53417.rgb.jpg/60x60bb.jpg",
//   "artworkUrl100": "https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/34/af/97/34af9745-a76a-3bc0-4568-eec3030ffe66/18UMGIM53417.rgb.jpg/100x100bb.jpg",
//   "collectionPrice": 9.99,
//   "trackPrice": 1.29,
//   "releaseDate": "2018-09-14T12:00:00Z",
//   "collectionExplicitness": "explicit",
//   "trackExplicitness": "explicit",
//   "discCount": 1,
//   "discNumber": 1,
//   "trackCount": 14,
//   "trackNumber": 1,
//   "trackTimeMillis": 136916,
//   "country": "USA",
//   "currency": "USD",
//   "primaryGenreName": "R&B/Soul",
//   "contentAdvisoryRating": "Explicit",
//   "isStreamable": true
// }
