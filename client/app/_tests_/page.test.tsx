//test
import {
  cleanup,
  fireEvent,
  Matcher,
  render,
  screen,
} from '@testing-library/react';

import 'intersection-observer';
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers

import Router from 'next/router';

import features from '@/components/LandingPageNew/second-section/page';

import Home from '../page';

// import { JSX, ClassAttributes, ImgHTMLAttributes } from 'react';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

afterEach(cleanup);

describe('Home', () => {
  it('renders a home page', () => {
    render(<Home />);

    // Check if specific elements are rendered using data-testid
    const navbar = screen.getByTestId('navbar');
    const firstSection = screen.getByTestId('firstsection');
    const secondSection = screen.getByTestId('secondsection');

    // Assert that each element is present in the rendered DOM
    expect(navbar).toBeInTheDocument();
    expect(firstSection).toBeInTheDocument();
    expect(secondSection).toBeInTheDocument();

    //tests for Navbar
    // Check if Logo component is rendered within Navbar
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    // Check if NavigationMenuBar component is rendered within Navbar
    expect(screen.getByTestId('navigation-menu-bar')).toBeInTheDocument();

    //tests for FirstSection
    expect(
      screen.getByText('Leverage the power of Docify:')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Streamline your project documentation: Automate analysis, Generate essentials!'
      )
    ).toBeInTheDocument();
    // Check if buttons are rendered
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    // Check if video element is rendered
    expect(screen.getByTestId('video')).toBeInTheDocument();

    //tests for SecondSection
    expect(
      screen.getByText(
        'Streamline your project with docify. Get all the capabilities,'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('without the complexity.')).toBeInTheDocument();
    if (Array.isArray(features)) {
      features.forEach((feature: { name: Matcher; description: Matcher }) => {
        expect(screen.getByText(feature.name)).toBeInTheDocument();
        expect(screen.getByText(feature.description)).toBeInTheDocument();
      });
    }
  });
});
