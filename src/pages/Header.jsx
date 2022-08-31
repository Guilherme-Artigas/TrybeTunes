import React from 'react';
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
        <h1 data-testid="header-user-name">{name === '' ? <Loading /> : name}</h1>
      </header>
    );
  }
}

export default Header;
