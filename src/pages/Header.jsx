import '../index.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // email: '',
      // image: '',
      // description: '',
    };

    this.userData = this.userData.bind(this);
  }

  componentDidMount() {
    this.userData();
  }

  async userData() {
    const userProfile = await getUser();
    this.setState({
      name: userProfile.name,
      // email: userProfile.email,
      // image: userProfile.image,
      // description: userProfile.description,
    });
  }

  render() {
    const { name } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{name === '' ? <Loading /> : name}</span>
        <ul className="listaHeader">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search" data-testid="link-to-search">Buscar</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
