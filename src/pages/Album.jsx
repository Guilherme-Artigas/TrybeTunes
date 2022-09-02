import '../index.css';

import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

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
        <MusicCard albumFull={ albumFull } />
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
