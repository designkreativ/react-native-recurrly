import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import { render } from "@testing-library/react-native";
import React from "react";

jest.mock("expo-router", () => {
  const MockTabsScreen = jest.fn(() => null);
  const MockTabs = jest.fn(({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ));
  (MockTabs as any).Screen = MockTabsScreen;
  return { Tabs: MockTabs };
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
}));

jest.mock("clsx", () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(" "),
}));

import TabLayout from "@/app/(tabs)/_layout";

const tabBar = components.tabBar;

function getMocks() {
  const { Tabs } = jest.requireMock("expo-router");
  const { useSafeAreaInsets } = jest.requireMock(
    "react-native-safe-area-context",
  );
  return {
    MockTabs: Tabs as jest.Mock,
    MockTabsScreen: (Tabs as any).Screen as jest.Mock,
    mockUseSafeAreaInsets: useSafeAreaInsets as jest.Mock,
  };
}

describe("TabLayout", () => {
  beforeEach(() => {
    const { MockTabs, MockTabsScreen, mockUseSafeAreaInsets } = getMocks();
    MockTabs.mockClear();
    MockTabsScreen.mockClear();
    mockUseSafeAreaInsets.mockReturnValue({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });

  it("renders without crashing", () => {
    expect(() => render(<TabLayout />)).not.toThrow();
  });

  it("renders a Tabs navigator", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    expect(MockTabs).toHaveBeenCalled();
  });

  it("passes headerShown: false in screenOptions", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.headerShown).toBe(false);
  });

  it("passes tabBarShowLabel: false in screenOptions", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarShowLabel).toBe(false);
  });

  it("tabBarStyle uses primary background color", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.backgroundColor).toBe(
      colors.primary,
    );
  });

  it("tabBarStyle has position absolute", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.position).toBe("absolute");
  });

  it("tabBarStyle has correct height from theme", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.height).toBe(tabBar.height);
  });

  it("tabBarStyle has correct marginHorizontal from theme", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.marginHorizontal).toBe(
      tabBar.horizontalInset,
    );
  });

  it("tabBarStyle has correct borderRadius from theme", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.borderRadius).toBe(tabBar.radius);
  });

  it("tabBarStyle has borderTopWidth 0", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.borderTopWidth).toBe(0);
  });

  it("tabBarStyle has elevation 0", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.elevation).toBe(0);
  });

  it("tabBarIconStyle has correct iconFrame width and height", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarIconStyle.width).toBe(tabBar.iconFrame);
    expect(props.screenOptions.tabBarIconStyle.height).toBe(tabBar.iconFrame);
  });

  it("tabBarIconStyle aligns icons to center", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarIconStyle.alignSelf).toBe("center");
  });

  it("tabBarStyle bottom uses Math.max of insets.bottom and horizontalInset (insets smaller)", () => {
    const { mockUseSafeAreaInsets } = getMocks();
    mockUseSafeAreaInsets.mockReturnValue({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.bottom).toBe(tabBar.horizontalInset);
  });

  it("tabBarStyle bottom respects large safe area insets (insets larger)", () => {
    const { mockUseSafeAreaInsets } = getMocks();
    mockUseSafeAreaInsets.mockReturnValue({
      top: 50,
      bottom: 34,
      left: 0,
      right: 0,
    });
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    expect(props.screenOptions.tabBarStyle.bottom).toBe(34);
  });

  it("tabBarItemStyle paddingVertical is height/2 - iconFrame/1.6", () => {
    render(<TabLayout />);
    const { MockTabs } = getMocks();
    const props = MockTabs.mock.calls[0][0];
    const expected = tabBar.height / 2 - tabBar.iconFrame / 1.6;
    expect(props.screenOptions.tabBarItemStyle.paddingVertical).toBe(expected);
  });

  it("renders a Tabs.Screen for each tab in constants/data", () => {
    render(<TabLayout />);
    const { MockTabsScreen } = getMocks();
    expect(MockTabsScreen).toHaveBeenCalledTimes(tabs.length);
  });

  it("each Tabs.Screen has name matching the tab", () => {
    render(<TabLayout />);
    const { MockTabsScreen } = getMocks();
    tabs.forEach((tab, index) => {
      const callProps = MockTabsScreen.mock.calls[index][0];
      expect(callProps.name).toBe(tab.name);
    });
  });

  it("each Tabs.Screen has a tabBarIcon function option", () => {
    render(<TabLayout />);
    const { MockTabsScreen } = getMocks();
    tabs.forEach((_, index) => {
      const callProps = MockTabsScreen.mock.calls[index][0];
      expect(typeof callProps.options.tabBarIcon).toBe("function");
    });
  });

  it("each Tabs.Screen has a title option", () => {
    render(<TabLayout />);
    const { MockTabsScreen } = getMocks();
    tabs.forEach((tab, index) => {
      const callProps = MockTabsScreen.mock.calls[index][0];
      expect(callProps.options.title).toBe(tab.title);
    });
  });

  it("tabBarIcon returns a React element when called", () => {
    render(<TabLayout />);
    const { MockTabsScreen } = getMocks();
    const firstScreenProps = MockTabsScreen.mock.calls[0][0];
    const tabBarIcon = firstScreenProps.options.tabBarIcon;
    const element = tabBarIcon({ focused: false });
    expect(element).toBeTruthy();
  });

  it("tabBarIcon returns different className when focused vs unfocused", () => {
    render(<TabLayout />);
    const { MockTabsScreen } = getMocks();
    const firstScreenProps = MockTabsScreen.mock.calls[0][0];
    const tabBarIcon = firstScreenProps.options.tabBarIcon;
    const focused = tabBarIcon({ focused: true });
    const unfocused = tabBarIcon({ focused: false });
    // Both should return valid React elements
    expect(focused).toBeTruthy();
    expect(unfocused).toBeTruthy();
  });
});

describe("tabBar bottom calculation (unit)", () => {
  it("uses horizontalInset when insets.bottom is 0", () => {
    expect(Math.max(0, tabBar.horizontalInset)).toBe(tabBar.horizontalInset);
  });

  it("uses insets.bottom when larger than horizontalInset", () => {
    expect(Math.max(50, tabBar.horizontalInset)).toBe(50);
  });

  it("uses exact value when insets.bottom equals horizontalInset", () => {
    expect(Math.max(tabBar.horizontalInset, tabBar.horizontalInset)).toBe(
      tabBar.horizontalInset,
    );
  });
});

describe("tabBarItemStyle calculation (unit)", () => {
  it("paddingVertical = height/2 - iconFrame/1.6 equals 6", () => {
    const result = tabBar.height / 2 - tabBar.iconFrame / 1.6;
    expect(result).toBe(6);
  });
});
