import React, { useState } from 'react';
import './App.css';

// Seasonal and holiday detection
const getSeasonAndHoliday = () => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  
  if (month === 11 && day >= 20) return { season: 'christmas', holiday: 'Weihnachten' };
  if (month === 11 && day < 20) return { season: 'winter', holiday: null };
  if (month === 0 && day <= 6) return { season: 'christmas', holiday: 'Neujahr' };
  if (month === 9 && day >= 15 && day <= 31) return { season: 'autumn', holiday: 'Oktoberfest' };
  if (month === 3 && day >= 1 && day <= 21) return { season: 'spring', holiday: 'Ostern' };
  
  if (month >= 2 && month <= 4) return { season: 'spring', holiday: null };
  if (month >= 5 && month <= 7) return { season: 'summer', holiday: null };
  if (month >= 8 && month <= 10) return { season: 'autumn', holiday: null };
  return { season: 'winter', holiday: null };
};

const seasonalThemes = {
  spring: { gradient: 'linear-gradient(145deg, #a8e6cf 0%, #88d8b0 25%, #b8e994 50%, #f6d365 100%)', particles: '🌸' },
  summer: { gradient: 'linear-gradient(145deg, #74b9ff 0%, #a29bfe 30%, #fd79a8 70%, #ffeaa7 100%)', particles: '☀️' },
  autumn: { gradient: 'linear-gradient(145deg, #d35400 0%, #e67e22 25%, #f39c12 50%, #c0392b 100%)', particles: '🍂' },
  winter: { gradient: 'linear-gradient(145deg, #2c3e50 0%, #4a69bd 30%, #6a89cc 60%, #82ccdd 100%)', particles: '❄️' },
  christmas: { gradient: 'linear-gradient(145deg, #1a472a 0%, #2d5a3f 25%, #8b0000 60%, #c41e3a 100%)', particles: '🎄' },
};

// House image mapping - images go in public/images/
const houseImages = {
  'Adlerbastei': '/images/adlerbastei.jpeg',
  'Adlerbastei 1.OG': '/images/adlerbastei-1og.jpeg',
  'Kranzegg': '/images/kranzegg.jpeg',
  'Park Avenue': '/images/park-avenue.jpeg',
  'Ski Shores': '/images/ski-shores.jpeg',
};

// SVG Icons
const LockIcon = ({ color = 'white', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const UnlockedIcon = ({ color = 'white', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

const ThermometerIcon = ({ color = 'white', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>
);

const ShadesClosedIcon = ({ color = 'white', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="8" x2="21" y2="8"/>
    <line x1="3" y1="13" x2="21" y2="13"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const ShadesOpenIcon = ({ color = 'white', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="8" x2="21" y2="8"/>
    <path d="M8 14 L12 18 L16 14" />
  </svg>
);

const LightbulbIcon = ({ color = 'white', size = 24, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);

const WeatherIcon = ({ condition, size = 18 }) => {
  const icons = {
    sunny: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    cloudy: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    partlyCloudy: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41"/>
        <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/>
        <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>
      </svg>
    ),
  };
  return icons[condition] || icons.sunny;
};

const SettingsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

// House background component using real images
const HouseBackground = ({ houseName }) => (
  <img
    src={houseImages[houseName]}
    alt={houseName}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
);

// Helper to get local time in 24hr format for a timezone
const getLocalTime = (timezone) => {
  return new Date().toLocaleTimeString('de-DE', { 
    timeZone: timezone, 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

const housesData = [
  { id: 1, name: 'Adlerbastei', timezone: 'Europe/Berlin', location: 'Ulm, BW Germany', weather: { condition: 'partlyCloudy', high: 18, low: 12 }, locks: { total: 2, unlocked: 0 }, temp: { high: 20.3, low: 17.8 }, shades: { total: 9, open: 0 }, lights: { total: 50, on: 0 } },
  { id: 2, name: 'Adlerbastei 1.OG', timezone: 'Europe/Berlin', location: 'Ulm, BW Germany', weather: { condition: 'partlyCloudy', high: 18, low: 12 }, locks: { total: 2, unlocked: 0 }, temp: { high: 20.7, low: 17.0 }, shades: { total: 9, open: 0 }, lights: { total: 32, on: 0 } },
  { id: 3, name: 'Kranzegg', timezone: 'Europe/Berlin', location: 'Kranzegg, BY Germany', weather: { condition: 'cloudy', high: 15, low: 8 }, locks: { total: 7, unlocked: 2 }, temp: { high: 16.0, low: 14.8 }, shades: { total: 19, open: 0 }, lights: { total: 76, on: 3 } },
  { id: 4, name: 'Park Avenue', timezone: 'America/New_York', location: 'New York, NY USA', weather: { condition: 'sunny', high: 24, low: 18 }, locks: { total: 1, unlocked: 0 }, temp: { high: 22.7, low: 21.3 }, shades: { total: 5, open: 0 }, lights: { total: 37, on: 0 } },
  { id: 5, name: 'Ski Shores', timezone: 'America/Chicago', location: 'Austin, TX USA', weather: { condition: 'sunny', high: 26, low: 19 }, locks: { total: 4, unlocked: 0 }, temp: { high: 24.1, low: 22.8 }, shades: { total: 12, open: 2 }, lights: { total: 33, on: 0 } },
];

// Grid/Expand toggle icon
const GridIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const ListIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="6" rx="1"/>
    <rect x="3" y="11" width="18" height="6" rx="1"/>
  </svg>
);

export default function App() {
  const [houses] = useState(housesData);
  const [activeTab, setActiveTab] = useState('home');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const { season, holiday } = getSeasonAndHoliday();
  const theme = seasonalThemes[season];

  const StatusIndicator = ({ value, total, type, isActive }) => {
    const activeColor = { locks: '#ef4444', temp: '#f59e0b', shades: '#fbbf24', lights: '#facc15' }[type];
    const color = isActive ? activeColor : 'rgba(255,255,255,0.95)';

    const renderIcon = () => {
      switch(type) {
        case 'locks': return isActive ? <UnlockedIcon color={color} size={22} /> : <LockIcon color={color} size={22} />;
        case 'temp': return <ThermometerIcon color={color} size={22} />;
        case 'shades': return isActive ? <ShadesOpenIcon color={color} size={22} /> : <ShadesClosedIcon color={color} size={22} />;
        case 'lights': return <LightbulbIcon color={color} size={22} filled={isActive} />;
        default: return null;
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
        <div style={{ filter: isActive ? `drop-shadow(0 0 10px ${activeColor})` : 'none', transition: 'filter 0.3s ease' }}>
          {renderIcon()}
        </div>
        <div style={{ 
          textAlign: 'center', color: isActive ? activeColor : 'rgba(255,255,255,0.95)',
          fontWeight: '600', fontSize: '12px', fontVariantNumeric: 'tabular-nums',
          textShadow: isActive ? `0 0 10px ${activeColor}` : '0 2px 4px rgba(0,0,0,0.5)',
        }}>
          {type === 'temp' ? <span>{value}°</span> : <span>{value}<span style={{ opacity: 0.6, fontWeight: '400' }}>/{total}</span></span>}
        </div>
      </div>
    );
  };

  const HouseCard = ({ house }) => {
    const hasUnlockedDoors = house.locks.unlocked > 0;
    const hasLightsOn = house.lights.on > 0;
    const hasShadesOpen = house.shades.open > 0;
    const isSecure = !hasUnlockedDoors && !hasLightsOn;

    return (
      <div style={{
        position: 'relative',
        borderRadius: '28px',
        overflow: 'hidden',
        height: '280px',
        flexShrink: 0,
        border: isSecure ? '2px solid rgba(74, 222, 128, 0.5)' : '2px solid rgba(251, 191, 36, 0.5)',
        boxShadow: `0 12px 40px rgba(0,0,0,0.35), ${isSecure ? '0 0 25px rgba(74, 222, 128, 0.2)' : '0 0 25px rgba(251, 191, 36, 0.2)'}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}>
        <HouseBackground houseName={house.name} />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)',
        }} />

        <div style={{
          position: 'relative',
          height: '100%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ 
                  color: 'white', fontSize: '26px', fontWeight: '700', margin: 0,
                  textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                  letterSpacing: '-0.3px',
                  lineHeight: '1.1',
                }}>
                  {house.name}
                </h3>
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: isSecure ? '#4ade80' : '#fbbf24',
                  boxShadow: isSecure ? '0 0 14px rgba(74, 222, 128, 0.9)' : '0 0 14px rgba(251, 191, 36, 0.9)',
                }} />
              </div>
              <span style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '14px',
                fontWeight: '500',
                textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                lineHeight: '1.2',
              }}>
                {getLocalTime(house.timezone)} • {house.location}
              </span>
            </div>
            
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px', padding: '10px 16px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <WeatherIcon condition={house.weather.condition} size={20} />
              <span style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>
                {house.weather.low}°/{house.weather.high}°
              </span>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)',
            backdropFilter: 'blur(30px) saturate(150%)', WebkitBackdropFilter: 'blur(30px) saturate(150%)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.35), 0 8px 32px rgba(0,0,0,0.25)',
            padding: '10px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <StatusIndicator value={house.locks.unlocked} total={house.locks.total} type="locks" isActive={hasUnlockedDoors} />
            <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.25)' }} />
            <StatusIndicator value={house.temp.low.toFixed(1)} total={house.temp.high.toFixed(1)} type="temp" isActive={false} />
            <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.25)' }} />
            <StatusIndicator value={house.shades.open} total={house.shades.total} type="shades" isActive={hasShadesOpen} />
            <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.25)' }} />
            <StatusIndicator value={house.lights.on} total={house.lights.total} type="lights" isActive={hasLightsOn} />
          </div>
        </div>
      </div>
    );
  };

  // Compact horizontal card for grid view
  const CompactCard = ({ house }) => {
    const hasUnlockedDoors = house.locks.unlocked > 0;
    const hasLightsOn = house.lights.on > 0;
    const hasShadesOpen = house.shades.open > 0;
    const isSecure = !hasUnlockedDoors && !hasLightsOn;
    
    const activeColor = { locks: '#ef4444', temp: '#f59e0b', shades: '#fbbf24', lights: '#facc15' };

    const MiniStatus = ({ value, total, type, isActive }) => {
      const color = isActive ? activeColor[type] : 'rgba(255,255,255,0.9)';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ filter: isActive ? `drop-shadow(0 0 6px ${activeColor[type]})` : 'none' }}>
            {type === 'locks' && (isActive ? <UnlockedIcon color={color} size={16} /> : <LockIcon color={color} size={16} />)}
            {type === 'temp' && <ThermometerIcon color={color} size={16} />}
            {type === 'shades' && (isActive ? <ShadesOpenIcon color={color} size={16} /> : <ShadesClosedIcon color={color} size={16} />)}
            {type === 'lights' && <LightbulbIcon color={color} size={16} filled={isActive} />}
          </div>
          <span style={{ 
            color: color, 
            fontSize: '9px', 
            fontWeight: '600',
            textShadow: isActive ? `0 0 8px ${activeColor[type]}` : '0 1px 2px rgba(0,0,0,0.5)',
          }}>
            {type === 'temp' ? `${value}°` : `${value}/${total}`}
          </span>
        </div>
      );
    };

    return (
      <div style={{
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        height: '100%',
        border: isSecure ? '2px solid rgba(74, 222, 128, 0.4)' : '2px solid rgba(251, 191, 36, 0.4)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}>
        <HouseBackground houseName={house.name} />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.6) 100%)',
        }} />

        <div style={{
          position: 'relative',
          height: '100%',
          padding: '10px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Left: House info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                color: 'white', 
                fontSize: '16px', 
                fontWeight: '700',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}>
                {house.name}
              </span>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: isSecure ? '#4ade80' : '#fbbf24',
                boxShadow: isSecure ? '0 0 10px rgba(74, 222, 128, 0.8)' : '0 0 10px rgba(251, 191, 36, 0.8)',
              }} />
            </div>
            <span style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '11px',
              fontWeight: '500',
              textShadow: '0 1px 3px rgba(0,0,0,0.6)',
            }}>
              {getLocalTime(house.timezone)} • {house.location.split(',')[0]}
            </span>
          </div>

          {/* Right: Status indicators */}
          <div style={{
            display: 'flex',
            gap: '8px',
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '12px',
            padding: '6px 10px',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <MiniStatus value={house.locks.unlocked} total={house.locks.total} type="locks" isActive={hasUnlockedDoors} />
            <MiniStatus value={house.temp.low.toFixed(0)} total={house.temp.high.toFixed(0)} type="temp" isActive={false} />
            <MiniStatus value={house.shades.open} total={house.shades.total} type="shades" isActive={hasShadesOpen} />
            <MiniStatus value={house.lights.on} total={house.lights.total} type="lights" isActive={hasLightsOn} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container" style={{ background: theme.gradient }}>
      {/* Particles */}
      <div className="particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${10 + i * 15}%`,
            animationDuration: `${10 + i * 2}s`,
            animationDelay: `${i * 0.8}s`,
          }}>{theme.particles}</div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <span>14:17</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px' }}>
          <span>5G</span><span>📶</span><span>🔋 68%</span>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <h1>{holiday ? `Daheim 🎉` : 'Daheim'}</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="settings-btn"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            style={{ color: 'white' }}
          >
            {viewMode === 'grid' ? <ListIcon /> : <GridIcon />}
          </button>
          <button className="settings-btn"><SettingsIcon /></button>
        </div>
      </div>

      {viewMode === 'list' ? (
        /* Scrollable List View */
        <div className="scrollable-content">
          <div className="houses-list">
            {houses.map(house => <HouseCard key={house.id} house={house} />)}
            <div style={{ height: '100px', flexShrink: 0 }} />
          </div>
        </div>
      ) : (
        /* Compact Grid View - 5 horizontal cards stacked */
        <div style={{
          flex: 1,
          padding: '0 12px',
          paddingBottom: '90px', // Space for tab bar
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}>
          {houses.map(house => (
            <div key={house.id} style={{ flex: 1, minHeight: 0 }}>
              <CompactCard house={house} />
            </div>
          ))}
        </div>
      )}

      {/* Tab Bar */}
      <div className="tab-bar-container">
        <div className="tab-bar">
          {[
            { id: 'home', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
            { id: 'stats', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg> },
            { id: 'alerts', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
            { id: 'profile', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  );
}
