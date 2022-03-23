import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const historyPok = '/pokemons/25';
  it(`Teste se as informações detalhadas 
  do Pokémon selecionado são mostradas na tela.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(historyPok);
    const title = screen.getByRole('heading', { name: /pikachu details/i });
    const summary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    const paragraph = screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/i);

    expect(title).toBeDefined();
    expect(summary).toBeDefined();
    expect(paragraph).toBeDefined();
  });

  it('Existe na página seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historyPok);
    const text = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    const img = screen.getAllByAltText(/Pikachu location/i);
    const textLocation1 = screen.getByText(/Kanto Viridian Forest/i);
    const textLocation2 = screen.getByText(/Kanto Power Plant/i);
    expect(text).toBeDefined();
    expect(img).toHaveLength(2);
    expect(img[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(textLocation1).toBeDefined();
    expect(textLocation2).toBeDefined();
  });

  it('Usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historyPok);
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favorite);
    const star = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    userEvent.click(favorite);
    expect(star).not.toBeInTheDocument();
    expect(favorite).toBeDefined();
  });
});
