import React from 'react';
import { render, screen } from '@testing-library/react-native';

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

import Subscriptions from '@/app/(tabs)/subscriptions';

describe('Subscriptions tab screen', () => {
  it('renders without crashing', () => {
    expect(() => render(<Subscriptions />)).not.toThrow();
  });

  it('displays "Subscriptions" text', () => {
    render(<Subscriptions />);
    expect(screen.getByText('Subscriptions')).toBeTruthy();
  });

  it('renders exactly one Subscriptions label', () => {
    render(<Subscriptions />);
    expect(screen.getAllByText('Subscriptions')).toHaveLength(1);
  });
});