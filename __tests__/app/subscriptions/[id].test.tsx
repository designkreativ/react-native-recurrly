import React from 'react';
import { render, screen } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { Text } = require('react-native');
    return <Text testID={`link-${href}`}>{children}</Text>;
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'spotify' })),
}));

import SubscriptionDetails from '@/app/subscriptions/[id]';

function getUseLocalSearchParamsMock() {
  return jest.requireMock('expo-router').useLocalSearchParams as jest.Mock;
}

describe('SubscriptionDetails screen', () => {
  beforeEach(() => {
    getUseLocalSearchParamsMock().mockClear();
    getUseLocalSearchParamsMock().mockReturnValue({ id: 'spotify' });
  });

  it('renders without crashing', () => {
    expect(() => render(<SubscriptionDetails />)).not.toThrow();
  });

  it('displays the subscription id from route params', () => {
    render(<SubscriptionDetails />);
    expect(screen.getByText('SubscriptionDetails: spotify')).toBeTruthy();
  });

  it('displays id "claude" when route param is claude', () => {
    getUseLocalSearchParamsMock().mockReturnValue({ id: 'claude' });
    render(<SubscriptionDetails />);
    expect(screen.getByText('SubscriptionDetails: claude')).toBeTruthy();
  });

  it('renders a Go back link', () => {
    render(<SubscriptionDetails />);
    expect(screen.getByText('Go back')).toBeTruthy();
  });

  it('Go back link points to root route', () => {
    render(<SubscriptionDetails />);
    expect(screen.getByTestId('link-/')).toBeTruthy();
  });

  it('calls useLocalSearchParams to retrieve the id', () => {
    render(<SubscriptionDetails />);
    expect(getUseLocalSearchParamsMock()).toHaveBeenCalled();
  });

  it('displays a numeric-like id string correctly', () => {
    getUseLocalSearchParamsMock().mockReturnValue({ id: '42' });
    render(<SubscriptionDetails />);
    expect(screen.getByText('SubscriptionDetails: 42')).toBeTruthy();
  });

  it('handles id with special characters', () => {
    getUseLocalSearchParamsMock().mockReturnValue({ id: 'my-app_123' });
    render(<SubscriptionDetails />);
    expect(screen.getByText('SubscriptionDetails: my-app_123')).toBeTruthy();
  });

  it('renders exactly one go back link', () => {
    render(<SubscriptionDetails />);
    expect(screen.getAllByText('Go back')).toHaveLength(1);
  });

  it('displays "netflix" id from params', () => {
    getUseLocalSearchParamsMock().mockReturnValue({ id: 'netflix' });
    render(<SubscriptionDetails />);
    expect(screen.getByText('SubscriptionDetails: netflix')).toBeTruthy();
  });
});