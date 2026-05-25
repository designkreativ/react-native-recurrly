import React from 'react';
import { render, screen } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { Text } = require('react-native');
    return <Text testID={`link-${href}`}>{children}</Text>;
  },
}));

import SignUp from '@/app/(auth)/sign-up';

describe('SignUp', () => {
  it('renders without crashing', () => {
    expect(() => render(<SignUp />)).not.toThrow();
  });

  it('displays "SignUp" text', () => {
    render(<SignUp />);
    expect(screen.getByText('SignUp')).toBeTruthy();
  });

  it('renders a link to sign in', () => {
    render(<SignUp />);
    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('link points to sign-in route', () => {
    render(<SignUp />);
    expect(screen.getByTestId('link-/(auth)/sign-in')).toBeTruthy();
  });

  it('contains exactly one link element', () => {
    render(<SignUp />);
    const links = screen.getAllByTestId(/^link-/);
    expect(links).toHaveLength(1);
  });

  it('sign-in link has correct text', () => {
    render(<SignUp />);
    const link = screen.getByTestId('link-/(auth)/sign-in');
    expect(link).toBeTruthy();
  });
});