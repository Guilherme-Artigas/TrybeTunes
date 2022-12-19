import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Search from '../pages/Search';

describe('Testes direcionados ao comportamento da página Search...', () => {
  it('Existe um botão para navegar até a página de Login da aplicação: ', () => {
    renderWithRouter(<Search />);

    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
  });

  it('Existe um botão para navegar até a página de buscas de álbuns/artistas: ', () => {
    renderWithRouter(<Search />);

    const search = screen.getByRole('link', { name: /search/i });
    expect(search).toBeInTheDocument();
  });

  it('Existe um botão para navegar até a página de músicas favoritadas: ', () => {
    renderWithRouter(<Search />);

    const favorites = screen.getByRole('link', { name: /favorites/i });
    expect(favorites).toBeInTheDocument();
  });

  it('Existe um botão para navegar até a página de Perfil do usuário: ', () => {
    renderWithRouter(<Search />);

    const profile = screen.getByRole('link', { name: /profile/i });
    expect(profile).toBeInTheDocument();
  });

  it('Existe um campo para pesquisar por álbuns ou artistas: ', () => {
    renderWithRouter(<Search />);

    const campoBusca = screen.getByRole('textbox');
    expect(campoBusca).toBeInTheDocument();
  });

  it('Existe um botão para iniciar a busca de álbuns ou artistas: ', () => {
    renderWithRouter(<Search />);

    const botaoPesquisa = screen.getByRole('button', { name: /pesquisar/i });
    expect(botaoPesquisa).toBeInTheDocument();
  });

  // it('É possível pesquisar álbum ou artista passando um nome válido: ', async () => {
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(results),
  //   });
  //   renderWithRouter(<Search />);

  //   const campoBusca = screen.getByRole('textbox');
  //   const TERM = 'Raimundos';
  //   userEvent.type(campoBusca, TERM);
  //   expect(campoBusca).toBeInTheDocument();

  //   const botaoPesquisa = screen.getByRole('button', { name: /pesquisar/i });
  //   userEvent.click(botaoPesquisa);
  //   expect(botaoPesquisa).toBeInTheDocument();

  //   await searchAlbumsAPI(TERM);
  //   expect(searchAlbumsAPI).toHaveBeenCalled();
  // });
});