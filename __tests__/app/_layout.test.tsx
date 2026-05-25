import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  Stack: jest.fn(() => null),
}));

jest.mock('@/global.css', () => ({}));

import RootLayout from '@/app/_layout';

describe('Root Layout', () => {
  let mockStack: jest.Mock;

  beforeEach(() => {
    const expoRouter = jest.requireMock('expo-router');
    mockStack = expoRouter.Stack as jest.Mock;
    mockStack.mockClear();
  });

  it('renders without crashing', () => {
    expect(() => render(<RootLayout />)).not.toThrow();
  });

  it('renders a Stack navigator', () => {
    render(<RootLayout />);
    expect(mockStack).toHaveBeenCalled();
  });

  it('passes headerShown: false in screenOptions', () => {
    render(<RootLayout />);
    const props = mockStack.mock.calls[0][0];
    expect(props.screenOptions).toEqual({ headerShown: false });
  });

  it('does not show any headers', () => {
    render(<RootLayout />);
    const props = mockStack.mock.calls[0][0];
    expect(props.screenOptions.headerShown).toBe(false);
  });
});