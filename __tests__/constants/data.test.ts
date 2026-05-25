import { tabs } from '@/constants/data';
import { icons } from '@/constants/icons';

describe('tabs', () => {
  it('exports an array of tabs', () => {
    expect(Array.isArray(tabs)).toBe(true);
  });

  it('has exactly 4 tabs', () => {
    expect(tabs).toHaveLength(4);
  });

  it('first tab is the Home tab', () => {
    expect(tabs[0].name).toBe('index');
    expect(tabs[0].title).toBe('Home ');
    expect(tabs[0].icon).toBe(icons.home);
  });

  it('second tab is the Subscriptions tab', () => {
    expect(tabs[1].name).toBe('subscriptions');
    expect(tabs[1].title).toBe('Subscriptions ');
    expect(tabs[1].icon).toBe(icons.wallet);
  });

  it('third tab is the Insights tab', () => {
    expect(tabs[2].name).toBe('insights');
    expect(tabs[2].title).toBe('Insights');
    expect(tabs[2].icon).toBe(icons.activity);
  });

  it('fourth tab is the Settings tab', () => {
    expect(tabs[3].name).toBe('settings');
    expect(tabs[3].title).toBe('Settings ');
    expect(tabs[3].icon).toBe(icons.setting);
  });

  it('every tab has name, title, and icon properties', () => {
    tabs.forEach((tab) => {
      expect(tab).toHaveProperty('name');
      expect(tab).toHaveProperty('title');
      expect(tab).toHaveProperty('icon');
    });
  });

  it('every tab name is a non-empty string', () => {
    tabs.forEach((tab) => {
      expect(typeof tab.name).toBe('string');
      expect(tab.name.length).toBeGreaterThan(0);
    });
  });

  it('every tab icon is truthy', () => {
    tabs.forEach((tab) => {
      expect(tab.icon).toBeTruthy();
    });
  });

  it('tab names are unique', () => {
    const names = tabs.map((t) => t.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});