# Daheim - Home Automation Dashboard

A beautiful iOS 26 "Liquid Glass" inspired home automation dashboard built with React and Vite.

**Live Demo:** https://thorsten.vercel.app/

## Features

- 🏠 Monitor multiple properties at a glance
- 🕐 Live local time per property (with timezone support)
- 📍 Location display (City, State, Country)
- 🔒 Door lock status indicators
- 🌡️ Temperature monitoring
- 🪟 Shade/blind status
- 💡 Lighting overview
- 🌤️ Weather display per location
- 🎨 Seasonal themes (spring, summer, autumn, winter, Christmas!)
- ✨ iOS 26 "Liquid Glass" glassmorphism design

## Properties

| Property | Location | Timezone |
|----------|----------|----------|
| Adlerbastei | Ulm, BW Germany | Europe/Berlin |
| Adlerbastei 1.OG | Ulm, BW Germany | Europe/Berlin |
| Kranzegg | Kranzegg, BY Germany | Europe/Berlin |
| Park Avenue | New York, NY USA | America/New_York |
| Ski Shores | Austin, TX USA | America/Chicago |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

Opens at http://localhost:5173

### 3. Build for production

```bash
npm run build
```

## House Images

Images are stored in `public/images/` with `.jpeg` extension:
- `adlerbastei.jpeg`
- `adlerbastei-1og.jpeg`
- `kranzegg.jpeg`
- `park-avenue.jpeg`
- `ski-shores.jpeg`

## Customization

### Modify house data

Edit the `housesData` array in `src/App.jsx`:

```jsx
{
  id: 1,
  name: 'Adlerbastei',
  timezone: 'Europe/Berlin',
  location: 'Ulm, BW Germany',
  weather: { condition: 'partlyCloudy', high: 18, low: 12 },
  locks: { total: 2, unlocked: 0 },
  temp: { high: 20.3, low: 17.8 },
  shades: { total: 9, open: 0 },
  lights: { total: 50, on: 0 }
}
```

### Seasonal themes

Modify the `seasonalThemes` object to customize gradients and particles for each season.

## Deployment

This repo auto-deploys to Vercel when pushing to the `main` branch.

```bash
git add -A
git commit -m "Your changes"
git push
```

## Tech Stack

- React 18
- Vite
- Pure CSS (with `backdrop-filter` for glass effects)
- Vercel (hosting)

## License

MIT
