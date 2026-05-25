import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  Stack: jest.fn(() => null),
}));

jest.mock('@/global.css', () => ({}));

import AuthLayout from '@/app/(auth)/_layout';

describe('Auth Layout', () => {
  let mockStack: jest.Mock;

  beforeEach(() => {
    const expoRouter = jest.requireMock('expo-router');
    mockStack = expoRouter.Stack as jest.Mock;
    mockStack.mockClear();
  });

  it('renders without crashing', () => {
    expect(() => render(<AuthLayout />)).not.toThrow();
  });

  it('renders a Stack navigator', () => {
    render(<AuthLayout />);
    expect(mockStack).toHaveBeenCalled();
  });

  it('passes headerShown: false in screenOptions', () => {
    render(<AuthLayout />);
    const props = mockStack.mock.calls[0][0];
    expect(props.screenOptions).toEqual({ headerShown: false });
  });
});