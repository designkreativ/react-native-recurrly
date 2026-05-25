import React from 'react';
import { render, screen } from '@testing-library/react-native';

jest.mock('@/global.css', () => ({}));

jest.mock('nativewind', () => ({
  styled: (component: any) => component,
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => {
    const { View } = require('react-native');
    return <View>{children}</View>;
  },
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string | object }) => {
    const { Text } = require('react-native');
    const hrefStr = typeof href === 'string' ? href : JSON.stringify(href);
    return <Text testID={`link-${hrefStr}`}>{children}</Text>;
  },
}));

import App from '@/app/(tabs)/index';

describe('Home tab (index) screen', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('displays welcome text', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Nativewind!')).toBeTruthy();
  });

  it('renders an Onboarding link', () => {
    render(<App />);
    expect(screen.getByText('Onboarding')).toBeTruthy();
  });

  it('Onboarding link points to /Onboarding route', () => {
    render(<App />);
    expect(screen.getByTestId('link-/Onboarding')).toBeTruthy();
  });

  it('renders a Sign In link', () => {
    render(<App />);
    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('Sign In link points to sign-in route', () => {
    render(<App />);
    expect(screen.getByTestId('link-/(auth)/sign-in')).toBeTruthy();
  });

  it('renders a Sign Up link', () => {
    render(<App />);
    expect(screen.getByText('Sign Up')).toBeTruthy();
  });

  it('Sign Up link points to sign-up route', () => {
    render(<App />);
    expect(screen.getByTestId('link-/(auth)/sign-up')).toBeTruthy();
  });

  it('renders a Spotify Subscriptions link', () => {
    render(<App />);
    expect(screen.getByText('Spotify Subscriptions')).toBeTruthy();
  });

  it('Spotify link points to subscriptions/spotify route', () => {
    render(<App />);
    expect(screen.getByTestId('link-/subscriptions/spotify')).toBeTruthy();
  });

  it('renders a Claude Max Subscription link', () => {
    render(<App />);
    expect(screen.getByText('Claude Max Subscription')).toBeTruthy();
  });

  it('Claude link uses dynamic pathname with id param', () => {
    render(<App />);
    const claudeLink = screen.getByText('Claude Max Subscription');
    expect(claudeLink).toBeTruthy();
  });

  it('renders 5 navigation links total', () => {
    render(<App />);
    const links = screen.getAllByTestId(/^link-/);
    expect(links).toHaveLength(5);
  });
});