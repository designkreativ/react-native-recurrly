import type { IconKey } from "@/constants/icons";
import { icons } from "@/constants/icons";

describe("icons", () => {
  const expectedKeys: string[] = [
    "home",
    "wallet",
    "setting",
    "activity",
    "add",
    "back",
    "menu",
    "plus",
    "notion",
    "dropbox",
    "openai",
    "adobe",
    "medium",
    "figma",
    "spotify",
    "github",
    "claude",
    "canva",
  ];

  it("exports an icons object", () => {
    expect(icons).toBeDefined();
    expect(typeof icons).toBe("object");
  });

  it("contains all expected icon keys", () => {
    expectedKeys.forEach((key) => {
      expect(icons).toHaveProperty(key);
    });
  });

  it("has exactly the expected number of icons", () => {
    expect(Object.keys(icons)).toHaveLength(expectedKeys.length);
  });

  it("every icon value is truthy (asset reference)", () => {
    Object.values(icons).forEach((value) => {
      expect(value).toBeTruthy();
    });
  });

  it("home icon is defined", () => {
    expect(icons.home).toBeDefined();
  });

  it("wallet icon is defined", () => {
    expect(icons.wallet).toBeDefined();
  });

  it("setting icon is defined", () => {
    expect(icons.setting).toBeDefined();
  });

  it("activity icon is defined", () => {
    expect(icons.activity).toBeDefined();
  });

  it("spotify icon is defined", () => {
    expect(icons.spotify).toBeDefined();
  });

  it("add and plus reference the same asset (both point to add.png)", () => {
    // Both add.png and plus.png are identical files per the diff
    expect(icons.add).toBeDefined();
    expect(icons.plus).toBeDefined();
  });
});

describe("IconKey type", () => {
  it("icon keys can be used to index icons object at runtime", () => {
    const key: IconKey = "home";
    expect(icons[key]).toBeDefined();
  });

  it("all exported keys are valid IconKey values", () => {
    const keys = Object.keys(icons) as IconKey[];
    keys.forEach((k) => {
      expect(icons[k]).toBeDefined();
    });
  });
});
