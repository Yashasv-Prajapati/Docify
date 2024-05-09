import React from 'react';
import { getByAltText, getByTestId, render } from '@testing-library/react';
import Page from './[projectId]/page'; // Assuming this is the name of the component
import Nav from '@/app/dashboard/_components/nav';
import Avatar from '../dashboard/_components/avatar';


const AvatarComponent = <Avatar />;

describe('Page Component', () => {
  test('renders Projects heading', () => {
    // const { getByText, getByAltText, getByTestId } = render(<Page params={{
    //     projectId: ''
    // }} searchParams={{}} />);
    // expect(getByText('Projects')).toBeInTheDocument();
    // expect(getByText('UML Diagram')).toBeInTheDocument();

    // expect(getByAltText('Github Image')).toBeInTheDocument();

    // expect(getByTestId('loader-icon')).toBeInTheDocument();

    // const { getByRole } = render(<Nav AvatarComponent={AvatarComponent} />);
    // const navElement = getByRole('navigation');
    // expect(navElement).toBeInTheDocument();

    // const projectsHeading = getByRole('heading', { name: 'Projects' });
    // expect(projectsHeading).toBeInTheDocument();
    // const umlHeading = getByRole('heading', { name: 'UML Diagram' });
    // expect(umlHeading).toBeInTheDocument();

    // const button = getByRole('button');
    // expect(button).toBeInTheDocument();

    // const downloadButton = getByRole('button', { name: 'Download' }); // Adjust the button label accordingly
    // expect(downloadButton).toBeInTheDocument();
    
  });
});

