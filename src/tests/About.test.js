import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it(
    'Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });
      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(homeLink).toBeDefined();
      expect(aboutLink).toBeDefined();
      expect(favoriteLink).toBeDefined();
    },
  );

  it(
    'É redirecionada p/ página inicial, na URL / ao clicar no link Home da navegação',
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      userEvent.click(homeLink);
      const text = screen.getByRole('heading', { name: /Encountered pokémons/i });
      const { pathname } = history.location;

      expect(pathname).toBe('/');
      expect(text).toBeDefined();
    },
  );

  it(
    'É redirecionada p/ página About, na URL /about ao clicar no link About da navegação',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /about/i });
      userEvent.click(aboutLink);
      const { pathname } = history.location;
      const text = screen.getByRole('heading', { name: /About Pokédex/i });
      expect(pathname).toBe('/about');
      expect(text).toBeDefined();
    },
  );

  it(
    `É redirecionada p/ página Pokémons,
    na URL /favorites ao clicar no link Favorite da navegação`,
    () => {
      const { history } = renderWithRouter(<App />);
      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(favoriteLink);
      const { pathname } = history.location;
      screen.logTestingPlaygroundURL();
      const text = screen.getByRole('heading', { name: /Favorite pokémons/i });

      expect(pathname).toBe('/favorites');
      expect(text).toBeDefined();
    },
  );

  it(
    `É redirecionada p/ a página Not Found
    ao entrar em uma URL desconhecida.`,
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/rota-nao-existe');
      const notFoundText = screen
        .getByRole('heading', { name: /Page requested not found/i });
      expect(notFoundText).toBeDefined();
    },
  );
});
