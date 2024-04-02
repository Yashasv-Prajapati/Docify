import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers
import Home from '../page';

// Mocking components used in page.tsx
jest.mock('../components/index', () => ({
  Navbar: jest.fn(() => <div data-testid="navbar">Mocked Navbar</div>),
  Footer: jest.fn(() => <div data-testid="footer">Mocked Footer</div>),
}));

jest.mock('../components/landingPage', () => ({
  Hero: jest.fn(() => <div data-testid="hero">Mocked Hero</div>),
  About: jest.fn(() => <div data-testid="about">Mocked About</div>),
  Explore: jest.fn(() => <div data-testid="explore">Mocked Explore</div>),
  GetStarted: jest.fn(() => <div data-testid="get-started">Mocked GetStarted</div>),
  WhatsNew: jest.fn(() => <div data-testid="whats-new">Mocked WhatsNew</div>),
}));

describe('Home Page Component', () => {
  it('renders all components correctly', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('navbar')).toHaveTextContent('Mocked Navbar');
    expect(getByTestId('footer')).toHaveTextContent('Mocked Footer');
    expect(getByTestId('hero')).toHaveTextContent('Mocked Hero');
    expect(getByTestId('about')).toHaveTextContent('Mocked About');
    expect(getByTestId('explore')).toHaveTextContent('Mocked Explore');
    expect(getByTestId('get-started')).toHaveTextContent('Mocked GetStarted');
    expect(getByTestId('whats-new')).toHaveTextContent('Mocked WhatsNew');
  });
});
