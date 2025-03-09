# Priorities

A minimalist todo app that helps you focus on what truly matters.

## Overview

Priorities is a simple, focused todo app that enforces a maximum of 5 tasks. Unlike traditional todo apps that encourage endless lists, Priorities helps you identify and focus on your most important tasks.

## Features

- **Minimalist Design**: Clean, distraction-free interface
- **Focus on What Matters**: Maximum of 5 todos at any time
- **Simple Interactions**: Add and complete tasks with minimal friction
- **Persistence**: Your priorities are saved automatically
- **Animations**: Smooth transitions and feedback

## Technical Details

- Built with Expo and React Native
- Written in TypeScript for type safety
- Styled with TailwindCSS (via NativeWind)
- Local storage with AsyncStorage

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open the app in Expo Go on your device or simulator

## Project Structure

- `/app`: Main application screens
- `/components`: Reusable UI components
- `/types`: TypeScript interfaces
- `/hooks`: Custom React hooks (if needed)
- `/constants`: App constants and configuration

## Implementation Details

The app follows a simple architecture:

- **Data Model**: Todo items with id, text, completion status, and creation timestamp
- **Components**: Modular components for todo items, list, and input
- **State Management**: React's useState for local state
- **Storage**: AsyncStorage for persistence
- **Styling**: TailwindCSS via NativeWind

## License

MIT
