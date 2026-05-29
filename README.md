<div align="center">
  <h1>Recurrly</h1>
  <p>
    A powerful, universal React Native application built with modern web technologies.
  </p>
  <p>
    <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

<br />

## 🚀 Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 🛠️ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/installation)
- iOS Simulator (for macOS) or Android Emulator

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd recurrly
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Running the App

Start the development server:

```bash
pnpm start
```

From the terminal, you can then:
- Press `i` to open in the **iOS Simulator**
- Press `a` to open in the **Android Emulator**
- Press `w` to open in a **Web Browser**
- Scan the QR code with the **Expo Go** app on a physical device

## 📂 Project Structure

```text
recurrly/
├── app/               # File-based routing layout and screens
│   ├── _layout.tsx    # Global layout structure
│   └── index.tsx      # Main application entry point
├── assets/            # Static assets (images, fonts, etc.)
├── components/        # Reusable UI components
├── constants/         # Theming, design tokens, and configuration
├── lib/               # Utility functions and helper methods
├── global.css         # Global Tailwind/NativeWind stylesheets
└── package.json       # Project metadata and dependencies
```

## 🧹 Resetting the Project

To remove the default Expo boilerplate and start with a fresh slate, run:

```bash
pnpm run reset-project
```
*This command will move the default starter code into an `app-example` directory and set up a blank `app` directory for your own code.*

## 📚 Resources

To learn more about the tools used in this project:
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/v4/overview)
- [React Native Docs](https://reactnative.dev/docs/getting-started)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
