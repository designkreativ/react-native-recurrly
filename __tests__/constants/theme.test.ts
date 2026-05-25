import { colors, components, spacing, theme } from "@/constants/theme";

describe("colors", () => {
  it("has a background color", () => {
    expect(colors.background).toBe("#fff9e3");
  });

  it("has a foreground color", () => {
    expect(colors.foreground).toBe("#081126");
  });

  it("has a primary color matching foreground", () => {
    expect(colors.primary).toBe("#081126");
  });

  it("has an accent color", () => {
    expect(colors.accent).toBe("#ea7a53");
  });

  it("has a success color", () => {
    expect(colors.success).toBe("#16a34a");
  });

  it("has a destructive color", () => {
    expect(colors.destructive).toBe("#dc2626");
  });

  it("has a card color", () => {
    expect(colors.card).toBe("#fff8e7");
  });

  it("has a muted color", () => {
    expect(colors.muted).toBe("#f6eecf");
  });

  it("has a mutedForeground with rgba value", () => {
    expect(colors.mutedForeground).toBe("rgba(0, 0, 0, 0.6)");
  });

  it("has a border with rgba value", () => {
    expect(colors.border).toBe("rgba(0, 0, 0, 0.1)");
  });

  it("has a subscription color", () => {
    expect(colors.subscription).toBe("#8fd1bd");
  });

  it("exports exactly the expected keys", () => {
    const keys = Object.keys(colors);
    expect(keys).toEqual(
      expect.arrayContaining([
        "background",
        "foreground",
        "card",
        "muted",
        "mutedForeground",
        "primary",
        "accent",
        "border",
        "success",
        "destructive",
        "subscription",
      ]),
    );
    expect(keys).toHaveLength(11);
  });
});

describe("spacing", () => {
  it("spacing[0] is 0", () => {
    expect(spacing[0]).toBe(0);
  });

  it("spacing[1] is 4", () => {
    expect(spacing[1]).toBe(4);
  });

  it("spacing[2] is 8", () => {
    expect(spacing[2]).toBe(8);
  });

  it("spacing[4] is 16", () => {
    expect(spacing[4]).toBe(16);
  });

  it("spacing[5] is 20", () => {
    expect(spacing[5]).toBe(20);
  });

  it("spacing[8] is 32", () => {
    expect(spacing[8]).toBe(32);
  });

  it("spacing[12] is 48", () => {
    expect(spacing[12]).toBe(48);
  });

  it("spacing[18] is 72", () => {
    expect(spacing[18]).toBe(72);
  });

  it("spacing[30] is 120", () => {
    expect(spacing[30]).toBe(120);
  });

  it("all spacing values are non-negative numbers", () => {
    Object.values(spacing).forEach((value) => {
      expect(typeof value).toBe("number");
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });

  it("spacing values increase monotonically", () => {
    const entries = Object.entries(spacing)
      .map(([k, v]) => [Number(k), v] as [number, number])
      .sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i][1]).toBeGreaterThan(entries[i - 1][1]);
    }
  });
});

describe("components.tabBar", () => {
  it("height uses spacing[18] (72)", () => {
    expect(components.tabBar.height).toBe(72);
  });

  it("horizontalInset uses spacing[5] (20)", () => {
    expect(components.tabBar.horizontalInset).toBe(20);
  });

  it("radius uses spacing[8] (32)", () => {
    expect(components.tabBar.radius).toBe(32);
  });

  it("iconFrame uses spacing[12] (48)", () => {
    expect(components.tabBar.iconFrame).toBe(48);
  });

  it("itemPaddingVertical uses spacing[2] (8)", () => {
    expect(components.tabBar.itemPaddingVertical).toBe(8);
  });

  it("has all required tabBar properties", () => {
    expect(components.tabBar).toHaveProperty("height");
    expect(components.tabBar).toHaveProperty("horizontalInset");
    expect(components.tabBar).toHaveProperty("radius");
    expect(components.tabBar).toHaveProperty("iconFrame");
    expect(components.tabBar).toHaveProperty("itemPaddingVertical");
  });
});

describe("theme (unified export)", () => {
  it("re-exports colors", () => {
    expect(theme.colors).toBe(colors);
  });

  it("re-exports spacing", () => {
    expect(theme.spacing).toBe(spacing);
  });

  it("re-exports components", () => {
    expect(theme.components).toBe(components);
  });

  it("has exactly three top-level keys", () => {
    expect(Object.keys(theme)).toHaveLength(3);
  });
});
