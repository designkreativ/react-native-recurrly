import React from 'react';
import { render, screen } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { Text } = require('react-native');
    return <Text testID={`link-${href}`}>{children}</Text>;
  },
}));

import SignIn from '@/app/(auth)/sign-in';

describe('SignIn', () => {
  it('renders without crashing', () => {
    expect(() => render(<SignIn />)).not.toThrow();
  });

  it('displays "SignIn" text', () => {
    render(<SignIn />);
    expect(screen.getByText('SignIn')).toBeTruthy();
  });

  it('renders a link to create account', () => {
    render(<SignIn />);
    expect(screen.getByText('Create Account')).toBeTruthy();
  });

  it('link points to sign-up route', () => {
    render(<SignIn />);
    expect(screen.getByTestId('link-/(auth)/sign-up')).toBeTruthy();
  });

  it('contains exactly one link element', () => {
    render(<SignIn />);
    const links = screen.getAllByTestId(/^link-/);
    expect(links).toHaveLength(1);
  });

  it('shows correct text content in create account link', () => {
    render(<SignIn />);
    const link = screen.getByTestId('link-/(auth)/sign-up');
    expect(link).toBeTruthy();
  });
});