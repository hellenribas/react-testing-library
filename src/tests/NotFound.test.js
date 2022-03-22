import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se página contém um heading h2
    com o texto Page requested not found`, () => {
    renderWithRouter(<NotFound />);
    const title = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });
    screen.logTestingPlaygroundURL();
    expect(title).toBeDefined();
  });

  it(`Teste se página mostra a
   imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByRole('img',
        { name: /pikachu crying because the page requested was not found/i });

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
