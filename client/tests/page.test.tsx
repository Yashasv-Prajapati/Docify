import React from 'react';
import { render } from '@testing-library/react';
import Home from '@/app/page'; // Assuming both Navbar and About are used in the Home page
import  Navbar  from '@/components/Navbar'; // Import the Navbar component
import { About,Hero,GetStarted } from '@/components/landingPage'; // Import the About component

describe('Home Page', () => {
  it('renders Navbar component', () => {
    const { getByTestId } = render(<Home />);
    const navbarComponent = getByTestId('navbar'); // Assuming you have a data-testid attribute in Navbar
    expect(navbarComponent).toBeInTheDocument();
  });

  it('renders Hero component', () => {
    const { getByTestId } = render(<Home />);
    const heroComponent = getByTestId('hero'); // Assuming you have a data-testid attribute in Hero
    expect(heroComponent).toBeInTheDocument();
  });

  it('renders About component', () => {
    const { getByTestId } = render(<Home />);
    const aboutComponent = getByTestId('about'); // Assuming you have a data-testid attribute in About
    expect(aboutComponent).toBeInTheDocument();
  });

  it('renders GetStarted component', () => {
    const { getByTestId } = render(<Home />);
    const getStartedComponent = getByTestId('get-started'); // Assuming you have a data-testid attribute in GetStarted
    expect(getStartedComponent).toBeInTheDocument();
  });
  

  it('renders logo image in Navbar', () => {
    const { getByAltText } = render(<Navbar />);
    const logoImage = getByAltText('search');
    expect(logoImage).toBeInTheDocument();
  });

  it('renders dropdown menu with options in Navbar', () => {
    const { getByText } = render(<Navbar />);
    const myProfileOption = getByText('My Profile');
    const repositoriesOption = getByText('Repositories');
    const starsOption = getByText('Stars');
    const logoutOption = getByText('Logout');

    expect(myProfileOption).toBeInTheDocument();
    expect(repositoriesOption).toBeInTheDocument();
    expect(starsOption).toBeInTheDocument();
    expect(logoutOption).toBeInTheDocument();
  });

  it('renders heading in About component', () => {
    const { getByText } = render(<About />);
    const heading = getByText('About Docify');
    expect(heading).toBeInTheDocument();
  });

  it('renders quote in About component', () => {
    const { getByText } = render(<About />);
    const quote = getByText(/Revolutionize your project documentation process/i);
    expect(quote).toBeInTheDocument();
  });

  it('renders arrow down image in About component', () => {
    const { getByAltText } = render(<About />);
    const arrowDownImage = getByAltText('arrow down');
    expect(arrowDownImage).toBeInTheDocument();
  });

  // Tests for Hero component
  it('renders heading in Hero component', () => {
    const { getByText } = render(<Hero />);
    const heading = getByText(/Streamline your project documentation/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders "Get Started" button in Hero component', () => {
    const { getByText } = render(<Hero />);
    const getStartedButton = getByText('Get Started');
    expect(getStartedButton).toBeInTheDocument();
  });

  it('renders "Get a Demo" button in Hero component', () => {
    const { getByText } = render(<Hero />);
    const getDemoButton = getByText('Get a Demo');
    expect(getDemoButton).toBeInTheDocument();
  });

  // Tests for GetStarted component
  it('renders heading in GetStarted component', () => {
    const { getByText } = render(<GetStarted />);
    const heading = getByText(/Get started on Docify/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders feature list in GetStarted component', () => {
    const { getByText } = render(<GetStarted />);
    const feature1 = getByText(/Automate analysis/i);
    const feature2 = getByText(/Generate essentials/i);
    // Add assertions for other features as well

    expect(feature1).toBeInTheDocument();
    expect(feature2).toBeInTheDocument();
    // Add assertions for other features as well
  });
});
// // Mock the useRouter hook
// jest.mock('next/router', () => ({
//   __esModule: true,
//   useRouter: jest.fn(),
// }));

// test('renders Navbar and Hero within Home', () => {
//   // Mock the return value of useRouter() with an empty object
//   useRouter.mockReturnValue({});
  
//   const { getByTestId } = render(<Home />);
//   const navbar = getByTestId('navbar');
//   const hero = getByTestId('hero');
//   expect(navbar).toBeInTheDocument();
//   expect(hero).toBeInTheDocument();
// });



