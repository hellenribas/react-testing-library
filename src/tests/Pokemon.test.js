import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const historyPok = '/pokemons/25';
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historyPok);
    const namePok = screen.getByTestId(/pokemon-name/i).innerHTML;
    const typePok = screen.getByTestId(/pokemon-type/i).innerHTML;
    const weightPok = screen.getByTestId(/pokemon-weight/i).innerHTML;
    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(namePok).toBe('Pikachu');
    expect(typePok).toBe('Electric');
    expect(weightPok).toBe('Average weight: 6.0 kg');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`O card do Pokémon indicado na Pokédex tem o
    link de navegação para exibir detalhes do Pokémon.
    O link deve possuir a URL /pokemons/<id>`, () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeDefined();
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(historyPok);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historyPok);
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favorite);
    const star = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toBeDefined();
    expect(star.src).toContain('/star-icon.svg');
  });
});
