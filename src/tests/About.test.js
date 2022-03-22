import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(title).toBeDefined();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const textOne = screen.getByText(/This application simulates a Pokédex/i);
    const textTwo = screen.getByText(/One can filter Pokémons by/i);

    expect(textOne).toBeDefined();
    expect(textTwo).toBeDefined();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
