# Daheim - Home Automation Dashboard

A beautiful iOS-inspired home automation dashboard built with React and Vite.

## Features

- 🏠 Monitor multiple properties at a glance
- 🔒 Door lock status indicators
- 🌡️ Temperature monitoring
- 🪟 Shade/blind status
- 💡 Lighting overview
- 🌤️ Weather display per location
- 🎨 Seasonal themes (spring, summer, autumn, winter, Christmas!)
- ✨ iOS 26 "Liquid Glass" design aesthetic

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your house images

Place your house photos in the `public/images/` folder with these exact names:

- `adlerbastei.jpg`
- `adlerbastei-1og.jpg`
- `kranzegg.jpg`
- `park-avenue.jpg`
- `ski-shores.jpg`

### 3. Run locally

```bash
npm run dev
```

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/home-automation.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy" - Vercel auto-detects Vite!

### Option 2: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

## Customization

### Modify house data

Edit the `housesData` array in `src/App.jsx` to match your properties.

### Change image mappings

Update the `houseImages` object in `src/App.jsx` if you want different filenames.

### Adjust themes

Modify the `seasonalThemes` object to customize colors for each season.

## Tech Stack

- React 18
- Vite
- CSS3 (with backdrop-filter for glass effects)

## License

MIT
