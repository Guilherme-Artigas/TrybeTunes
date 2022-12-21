import { waitFor } from '@testing-library/react';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';

import renderPath from './helpers/renderPath';

describe('Testes direcionados ao comportamento da página de músicas favoritas...', () => {
  it('Existe uma função que recupera as músicas favoritadas: ', async () => {
    const verifyStorage = jest.spyOn(favoriteSongsAPI, 'getFavoriteSongs');
    renderPath('/favorites');

    await waitFor(() => expect(verifyStorage).toBeCalled(), { timeout: 3000 });
  });
});
