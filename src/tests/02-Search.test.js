import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as searchAlbumsAPI from '../services/searchAlbumsAPI';
import renderPath from './helpers/renderPath';


describe('Testes direcionados ao comportamento da página Search...', () => {
  it('Existe um botão para navegar até a página de Login da aplicação: ', () => {
    renderPath('/search');

    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
  });

  it('Existe um botão para navegar até a página de buscas de álbuns/artistas: ', () => {
    renderPath('/search');

    const search = screen.getByRole('link', { name: /search/i });
    expect(search).toBeInTheDocument();
  });

  it('Existe um botão para navegar até a página de músicas favoritadas: ', () => {
    renderPath('/search');

    const favorites = screen.getByRole('link', { name: /favorites/i });
    expect(favorites).toBeInTheDocument();
  });

  it('Existe um botão para navegar até a página de Perfil do usuário: ', () => {
    renderPath('/search');

    const profile = screen.getByRole('link', { name: /profile/i });
    expect(profile).toBeInTheDocument();
  });

  it('Existe um campo para pesquisar por álbuns ou artistas: ', () => {
    renderPath('/search');

    const campoBusca = screen.getByRole('textbox');
    expect(campoBusca).toBeInTheDocument();
  });

  it('Existe um botão para iniciar a busca de álbuns ou artistas: ', () => {
    renderPath('/search');

    const botaoPesquisa = screen.getByRole('button', { name: /pesquisar/i });
    expect(botaoPesquisa).toBeInTheDocument();
  });

  it('É possível pesquisar álbum ou artista passando um nome válido: ', async () => {
    const mockAlbums = jest.spyOn(searchAlbumsAPI, 'default');

    renderPath('/search');

    const campoBusca = screen.getByRole('textbox');
    expect(campoBusca).toBeInTheDocument();
    userEvent.type(campoBusca, 'Raimundos');
    expect(campoBusca.value).toBe('Raimundos');

    const botaoPesquisa = screen.getByRole('button', { name: /pesquisar/i });
    expect(botaoPesquisa).toBeInTheDocument()
    userEvent.click(botaoPesquisa);

    await waitFor(() => expect(mockAlbums).toBeCalled(), { timeout: 3000 });
  });
});