import {render, screen} from '@testing-library/react';
import Home from '@/app/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),

}));


describe('Home', () => {
    it('renders the Home component', () => {
    // useRouter.mockImplementationOnce()
      render(<Home />);

      // Check that the Navbar, Hero, About, and GetStarted components are rendered
      // Replace 'Navbar', 'Hero', etc. with actual text or elements that you expect to find in these components
      expect(screen.getByText('Navbar')).toBeInTheDocument();
    //   expect(screen.getByText('Hero')).toBeInTheDocument();
    //   expect(screen.getByText('About')).toBeInTheDocument();
    //   expect(screen.getByText('GetStarted')).toBeInTheDocument();
    });
  });