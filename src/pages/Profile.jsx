import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Carregando from '../components/Carregando';
import Header from '../components/Header';

class Profile extends Component {
  state = {
    userProfile: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userProfile: user });
  }

  render() {
    const { userProfile } = this.state;

    return (
      <>
        <Header />
        <main data-testid="page-profile">
          {!userProfile.name && <Carregando />}
          <section>
            <h4>Perfil</h4>
            <img
              src={ userProfile.image }
              alt={ `Foto do usúario: ${userProfile.name}` }
              data-testid="profile-image"
            />
            <p data-testid="header-user-name">{userProfile.name}</p>
            <p>{userProfile.email}</p>
            <p>{userProfile.description}</p>
            <Link to="/profile/edit">
              <button type="button">
                Editar perfil
              </button>
            </Link>
          </section>
        </main>
      </>
    );
  }
}

export default Profile;
