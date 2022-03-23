import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(title).toBeDefined();
  });

  it('Testando dataTestId', () => {
    renderWithRouter(<App />);
    const dataId = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    expect(dataId).toBeDefined();
    expect(type).toBeDefined();
    expect(weight).toBeDefined();
  });

  it(`Teste se é exibido o próximo Pokémon da lista
   quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pokemon1 = screen.getByText(/pikachu/i);
    expect(pokemon1).toBeInTheDocument();
    userEvent.click(button);
    const pokemon2 = screen.getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();
  });

  it(`Teste se é mostrado apenas um Pokémon por vez.
  `, () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonFilter = screen
      .getAllByTestId(/pokemon-type-button/i);
    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    const numberFilter = 7;
    userEvent.click(buttonFire);
    const text = screen.getByTestId('pokemon-type', { name: /fire/i });
    expect(buttonFire).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(buttonFilter).toHaveLength(numberFilter);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    const text = screen.getByTestId('pokemon-name', { name: /pikachu/i });
    expect(buttonAll).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
