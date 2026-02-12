 NASA Space Explorer

A stunning real-time space data dashboard powered by NASA's public APIs. Explore astronomy pictures, Mars rover photos, near-Earth asteroids, and active Earth events - all in one beautiful interface.

![NASA Space Explorer](https://via.placeholder.com/1200x600/0B0D1E/FFFFFF?text=NASA+Space+Explorer)

✨ Features

🌌 Astronomy Picture of the Day (APOD)
- Daily stunning space images with detailed explanations
- Date picker to explore historical images
- HD image downloads
- Professional astronomical descriptions

  Mars Rover Photos
- Latest photos from NASA's Curiosity Rover
- Real-time data from Mars
- Multiple camera views
- Sol (Mars day) tracking
- 12+ latest rover images

  Near-Earth Objects (NEO)
- Real-time asteroid tracking
- Potentially hazardous asteroid alerts
- Detailed orbital data
- Velocity and miss distance calculations
- Size estimates

 🌍 Earth Natural Events (EONET)
- Active natural disasters and events
- Wildfires, storms, volcanoes tracking
- Real-time coordinates
- Event categorization
- Direct source links

  Quick Start

 Prerequisites
- Node.js 18+ installed
- NASA API key (already included in the code!)

 Installation

1. Extract the project
```bash
cd nasa-space-explorer
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser
```
http://localhost:3000
```

That's it! No configuration needed - your NASA API key is already set up!

 Project Structure

```
nasa-space-explorer/
├── app/
│   ├── page.tsx              # Main dashboard component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   └── utils.ts              # Utility functions
├── components/               # Reusable components (expandable)
├── public/                   # Static assets
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript config
└── next.config.js            # Next.js config
```

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Fetching**: SWR (stale-while-revalidate)
- **HTTP Client**: Axios

### NASA APIs Used
1. **APOD API** - Astronomy Picture of the Day
2. **Mars Rover Photos API** - Curiosity Rover images
3. **NeoWs API** - Near-Earth Object Web Service
4. **EONET API** - Earth Observatory Natural Event Tracker

## 🌟 Key Features in Detail

### Astronomy Picture of the Day
```typescript
// Fetches daily astronomy pictures
GET https://api.nasa.gov/planetary/apod
Parameters:
- api_key: Your NASA API key
- date: YYYY-MM-DD (optional, defaults to today)
```

**What it shows:**
- High-resolution space images
- Professional descriptions
- Copyright information
- Media type (image or video)
- HD download links

### Mars Rover Photos
```typescript
// Fetches latest Curiosity rover photos
GET https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos
```

**What it shows:**
- 12 latest rover photos
- Camera information
- Sol (Mars day) number
- Earth date
- Mission statistics

### Near-Earth Objects
```typescript
// Fetches asteroid data
GET https://api.nasa.gov/neo/rest/v1/feed
Parameters:
- start_date & end_date: Today's date
```

**What it shows:**
- Total asteroids today
- Potentially hazardous asteroids
- Size estimates
- Velocity data
- Miss distance from Earth

### Earth Events
```typescript
// Fetches natural events
GET https://eonet.gsfc.nasa.gov/api/v3/events
Parameters:
- status: open (active events)
- limit: 10
```

**What it shows:**
- Active natural disasters
- Event categories
- Geographic coordinates
- Event dates
- Source links

## 🎯 For Your Resume

### Project Description
```
NASA Space Explorer - Real-Time Space Data Dashboard
Next.js 14 • TypeScript • Tailwind CSS • NASA APIs

• Built comprehensive space exploration dashboard integrating 
  4 NASA APIs (APOD, Mars Rovers, NeoWs, EONET) with real-time 
  data visualization
• Implemented SWR for optimized data fetching with automatic 
  revalidation and caching
• Designed responsive, animated UI using Framer Motion with 
  glass morphism effects and custom space theme
• Created interactive features including date selection, tab 
  navigation, and HD image downloads
• Achieved 100% type safety with TypeScript and modern React 
  patterns with Next.js 14 App Router

Tech: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, 
SWR, NASA APIs

Live Demo: nasa-explorer.yourname.com
GitHub: github.com/yourname/nasa-space-explorer
```

### Interview Talking Points

**Technical Depth:**
1. "I integrated 4 different NASA APIs into a single dashboard"
2. "Used SWR for intelligent data caching and revalidation"
3. "Implemented TypeScript for full type safety"
4. "Created custom animations with Framer Motion"
5. "Built responsive grid layouts with Tailwind CSS"

**Problem Solving:**
1. "Handled rate limiting with intelligent caching"
2. "Managed different API response formats"
3. "Implemented error boundaries for API failures"
4. "Optimized image loading from NASA servers"
5. "Created smooth state transitions between tabs"

User Experience:
1. "Date picker for historical space data"
2. "Real-time asteroid tracking"
3. "Smooth animations and transitions"
4. "Responsive design for all devices"
5. "Glass morphism for modern aesthetics"

 Deployment

 Deploy to Vercel (Recommended)

1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - NASA Space Explorer"
git push
```

Made with 💜 by [ Saifuddeen Yakubu]

*Exploring the universe, one API call at a time.* 
