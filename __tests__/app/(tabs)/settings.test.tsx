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

import Settings from '@/app/(tabs)/settings';

describe('Settings screen', () => {
  it('renders without crashing', () => {
    expect(() => render(<Settings />)).not.toThrow();
  });

  it('displays "Settings" text', () => {
    render(<Settings />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('renders exactly one Settings label', () => {
    render(<Settings />);
    expect(screen.getAllByText('Settings')).toHaveLength(1);
  });
});