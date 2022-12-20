import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as userAPI from '../services/userAPI';
import renderPath from './helpers/renderPath';

describe('Testes direcionados ao comportamento da página de Login...', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });
  
  it('Campo para digitar nome está na tela: ', async () => {
    renderPath('/TrybeTunes');

    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();
  });

  it('É possível digitar um nome de usuário no campo nome: ', () => {
    renderPath('/TrybeTunes');

    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();

    const USER_NAME = 'Usuario';
    userEvent.type(nomeUsuario, USER_NAME);

    expect(nomeUsuario.value).toBe('Usuario');
  });

  it('Botão Entrar está na tela: ', () => {
    renderPath('/TrybeTunes');

    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).toBeInTheDocument();
  });

  it('Botão de entrar só habilita com um nome válido (sendo maior ou igual 3 caracteres): ', () => {
    renderPath('/TrybeTunes');

    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();
    expect(nomeUsuario.value).toBe('');

    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).toBeInTheDocument();
    expect(botaoLogin).toBeDisabled();

    userEvent.type(nomeUsuario, 'T');
    expect(nomeUsuario.value).toBe('T');
    expect(botaoLogin).toBeDisabled();

    userEvent.type(nomeUsuario, 'e');
    expect(nomeUsuario.value).toBe('Te');
    expect(botaoLogin).toBeDisabled();

    userEvent.type(nomeUsuario, 's');
    expect(nomeUsuario.value).toBe('Tes');
    expect(botaoLogin).toBeEnabled();

    nomeUsuario.setSelectionRange(2, 3);
    userEvent.type(nomeUsuario, '{del}')
    expect(nomeUsuario.value).toBe('Te');
    expect(botaoLogin).toBeDisabled();
  });

  it('Verifica se o nome digitado é salvo na Storage do navegador: ', async () => {
    const criaUsuario = jest.spyOn(userAPI, 'createUser');

    renderPath('/TrybeTunes');

    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).toBeInTheDocument();
    expect(botaoLogin).toBeDisabled();
        
    const nomeUsuario = screen.getByRole('textbox');
    expect(nomeUsuario).toBeInTheDocument();
    userEvent.type(nomeUsuario, 'Usuario');
    expect(nomeUsuario.value).toBe('Usuario')
    
    expect(botaoLogin).toBeEnabled();
    userEvent.click(botaoLogin);

    const { name } = JSON.parse(localStorage.getItem('user'));
    await waitFor(() => expect(name).toBe('Usuario'), { timeout: 3000 });
    expect(criaUsuario).toBeCalled();
  });
});
