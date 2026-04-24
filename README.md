# ApeTracker 🦍📈

A React Native mobile app built with Expo that displays real-time stock and cryptocurrency sentiment data by tracking mentions across popular discussion boards.

## Features

- 📊 **Real-time Data**: View the most mentioned stocks and cryptocurrencies across Reddit and 4Chan
- 🔄 **Pull to Refresh**: Easily refresh data with a pull-down gesture
- 🎯 **Filter Options**: Switch between Stocks, Crypto, or All
- 📈 **Rank Tracking**: See how rankings have changed in the last 24 hours
- 💬 **Mention Counts**: Track mention volume and changes
- 👍 **Upvote Counts**: See community engagement
- 🌓 **Dark Mode**: Automatically adapts to your device's theme

## Getting Started

### Prerequisites

- Node.js installed
- Expo Go app on your mobile device (iOS or Android)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Data Sources

This app tracks mentions across popular stock and crypto discussion boards including:

- r/WallStreetBets
- r/stocks
- r/investing
- r/CryptoCurrency
- r/SatoshiStreetBets
- 4chan /biz
- and many more

## Tech Stack

- **Framework**: Expo / React Native
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Data Fetching**: TanStack Query (`@tanstack/react-query`) + native `fetch`
- **Styling**: React Native StyleSheet

## Data Fetching

This app uses **TanStack Query** for API state management and caching.

- Query client is configured in `app/_layout.tsx`
- Tracker data query is implemented in `app/(tabs)/index.tsx`

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint

## License

Private
