import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import 'intersection-observer';
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers
import Home from '../page';
import Router from 'next/router';
import { JSX, ClassAttributes, ImgHTMLAttributes } from 'react';

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));
// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

// Mock framer-motion if your Navbar or other components use animations
// jest.mock('framer-motion', () => ({
//   motion: {
//     nav: (props: any) => <nav {...props} />,
//     div: (props: any) => <div {...props} />
//   }
// }));
afterEach(cleanup);

describe('Home', () => {
  it('renders a home page', () => {
    render(<Home />);

    // Check if specific elements are rendered using data-testid
    const navbarElement = screen.getByTestId('navbar');
    const footerElement = screen.getByTestId('footer');
    const heroElement = screen.getByTestId('hero');
    const aboutElement = screen.getByTestId('about');
    const exploreElement = screen.getByTestId('explore');
    const getStartedElement = screen.getByTestId('get-started');
    const whatsNewElement = screen.getByTestId('whats-new');

    // Assert that each element is present in the rendered DOM
    expect(navbarElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
    expect(heroElement).toBeInTheDocument();
    expect(aboutElement).toBeInTheDocument();
    expect(exploreElement).toBeInTheDocument();
    expect(getStartedElement).toBeInTheDocument();
    expect(whatsNewElement).toBeInTheDocument();
  });
});