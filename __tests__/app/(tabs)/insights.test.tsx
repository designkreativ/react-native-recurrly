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

import Insights from '@/app/(tabs)/insights';

describe('Insights screen', () => {
  it('renders without crashing', () => {
    expect(() => render(<Insights />)).not.toThrow();
  });

  it('displays "Insights" text', () => {
    render(<Insights />);
    expect(screen.getByText('Insights')).toBeTruthy();
  });

  it('renders exactly one Insights label', () => {
    render(<Insights />);
    expect(screen.getAllByText('Insights')).toHaveLength(1);
  });
});