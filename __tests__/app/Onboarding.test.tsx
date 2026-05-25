import React from 'react';
import { render, screen } from '@testing-library/react-native';

import Onboarding from '@/app/Onboarding';

describe('Onboarding screen', () => {
  it('renders without crashing', () => {
    expect(() => render(<Onboarding />)).not.toThrow();
  });

  it('displays "Onboarding" text', () => {
    render(<Onboarding />);
    expect(screen.getByText('Onboarding')).toBeTruthy();
  });

  it('renders exactly one Onboarding label', () => {
    render(<Onboarding />);
    expect(screen.getAllByText('Onboarding')).toHaveLength(1);
  });
});