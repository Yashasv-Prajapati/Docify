import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Nav from '../dashboard/_components/nav';
import Avatar from '../dashboard/_components/avatar';

const AvatarComponent = <Avatar />;

describe('Dashboard', () => {
  test('testing dashboard', () => {
    render(<Nav AvatarComponent={<div />} />);
    const { getByText } = render(<Nav AvatarComponent={AvatarComponent} />);
    expect(getByText('Docify')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Repositories')).toBeInTheDocument();
    expect(getByText('Settings')).toBeInTheDocument();

    expect(getByText('Toggle user menu')).toBeInTheDocument();

    const button = getByText('Toggle user menu');
    fireEvent.click(button);
    expect(getByText('Your Account')).toBeInTheDocument();

    const logoutMock = jest.fn();
    fireEvent.click(button); // Open dropdown menu
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
  });
});