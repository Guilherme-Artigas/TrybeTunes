import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Carregando from '../components/Carregando';
import Header from '../components/Header';

class Profile extends Component {
  state = {
    userProfile: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ userProfile: user, loading: false });
  }

  render() {
    const { userProfile, loading } = this.state;

    // if (loading) return <Carregando />;

    return (
      <>
        <Header />
        {loading && <Carregando />}
        <main data-testid="page-profile">
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
