import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';

describe('Testes direcionados ao comportamento da página de Login...', () => {
  it('Campo para digitar nome está na tela: ', () => {
    renderWithRouter(<Login />);

    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();
  });

  it('É possível digitar um nome de usuário no campo nome: ', () => {
    renderWithRouter(<Login />);

    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();

    const USER_NAME = 'Usuario';
    userEvent.type(nomeUsuario, USER_NAME);

    expect(nomeUsuario.value).toBe('Usuario');
  });

  it('Botão Entrar está na tela: ', () => {
    renderWithRouter(<Login />);

    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).toBeInTheDocument();
  });

  it('Nome de usuário deve ser maior ou igual a três caracteres: ', () => {
    renderWithRouter(<Login />);

    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();

    const USER_NAME = 'Usuario';
    userEvent.type(nomeUsuario, USER_NAME);

    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).toBeEnabled();
  });
});
