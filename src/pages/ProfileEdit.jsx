import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';

import Header from '../components/Header';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    disabledButton: true,
  };

  async componentDidMount() {
    const userProfile = await getUser();
    this.setState({
      name: userProfile.name,
      email: userProfile.email,
      description: userProfile.description,
      image: userProfile.image,
      disabledButton: false,
    });
  }

  handleUserProfile = async ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.handleButton);
  };

  handleButton = () => {
    const { name, email, description, image } = this.state;
    const reEmail = /\S+@\S+\.\S+/;
    const validEmail = reEmail.test(email);
    if (name !== '' && description !== '' && image !== '' && validEmail) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  };

  handleUpdateUser = async () => {
    const { name, email, description, image } = this.state;
    await updateUser({ name, email, description, image });
  };

  render() {
    const { name,
      email, description, image, disabledButton } = this.state;

    return (
      <>
        <Header />
        <main data-testid="page-profile-edit">
          <h2>Atualizar Perfil</h2>
          <form>
            <label htmlFor="fieldName">
              Nome:
              <input
                type="text"
                id="fielName"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.handleUserProfile }
                name="name"
              />
            </label>
            <br />
            <label htmlFor="fieldEmail">
              E-mail:
              <input
                type="text"
                id="fielEmail"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.handleUserProfile }
                name="email"
              />
            </label>
            <br />
            <label htmlFor="fieldDescription">
              Descrição:
              <input
                type="text"
                id="fielDescription"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.handleUserProfile }
                name="description"
              />
            </label>
            <br />
            <label htmlFor="fieldImage">
              Mudar Foto:
              <input
                type="text"
                id="fielImage"
                value={ image }
                data-testid="edit-input-image"
                onChange={ this.handleUserProfile }
                name="image"
              />
            </label>
            <br />
            <Link to="/profile">
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabledButton }
                onClick={ this.handleUpdateUser }
              >
                Editar perfil
              </button>
            </Link>
          </form>
        </main>
      </>
    );
  }
}

export default ProfileEdit;
