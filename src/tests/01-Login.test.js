import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';
import { createUser } from '../services/userAPI';

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

  it('Botão de entrar só habilita com um nome válido: ', () => {
    renderWithRouter(<Login />);

    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();

    const USER_NAME = 'Usuario';
    userEvent.type(nomeUsuario, USER_NAME);

    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).toBeEnabled();
  });

  it('Verifica se o nome digitado é salvo na Storage do navegador: ', async () => {
    renderWithRouter(<Login />);

    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();

    const USER_NAME = 'Usuario';
    userEvent.type(nomeUsuario, USER_NAME);

    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).toBeEnabled();

    const retorno = await createUser(USER_NAME);
    expect(retorno).toBe('OK');
  });
});
