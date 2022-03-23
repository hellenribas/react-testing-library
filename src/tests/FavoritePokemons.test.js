import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a 
  mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeDefined();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favorite = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favorite);
    const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFav);
    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();
  });
});
