import React from 'react';
import { render, screen } from '@testing-library/react';
import 'intersection-observer';
import '@testing-library/jest-dom';
import Signup from '../auth/signup/page';
// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

describe('Signup Page', () => {
  test('renders signup page correctly', () => {
    render(<Signup />);
    
    // Check if the main title is rendered
    const mainTitle = screen.getByText(/Let's build something new/i);
    expect(mainTitle).toBeInTheDocument();
 
    // Check if the description text is rendered
    const descriptionText = screen.getByText(/To get the insights, import an existing Git Repository./i);
    expect(descriptionText).toBeInTheDocument();

    // Check if the "Sign in with Github" button is rendered
    const githubButton = screen.getByText(/Sign in with Github/i);
    expect(githubButton).toBeInTheDocument();

    // Check if the GitHub button has the correct link
    const githubButtonLink = screen.getByRole('link', { name: /Sign in with Github/i });
    expect(githubButtonLink).toHaveAttribute('href', expect.stringContaining('github.com/login/oauth/authorize'));
  });
});
