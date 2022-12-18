import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Carregando from './Carregando';

class Header extends Component {
  state = {
    userProfile: {},
  };

  async componentDidMount() {
    this.setState({ userProfile: await getUser() });
  }

  render() {
    const { userProfile } = this.state;
    return (
      <header data-testid="header-component">
        {userProfile.name === undefined && <Carregando />}
        <p data-testid="header-user-name">{userProfile.name}</p>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/search" data-testid="link-to-search">
            <li>Search</li>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <li>Favorites</li>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <li>Profile</li>
          </Link>
        </ul>
      </header>
    );
  }
}

export default Header;
