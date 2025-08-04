# Persistent Music Player Implementation

## 🎵 **Overview**

The persistent music player ensures that radio streaming continues uninterrupted when users navigate between pages. The implementation uses React Context and a global layout component to maintain audio state across the entire application.

## 🏗️ **Architecture**

### **1. Global Radio Player Context**
- **File**: `src/contexts/RadioPlayerContext.tsx`
- **Purpose**: Provides global state management for the radio player
- **Features**: 
  - Maintains audio state across page navigation
  - 1-second update interval for real-time track information
  - Centralized player controls

### **2. Persistent Mini Player**
- **File**: `src/components/organisms/media/PersistentMiniPlayer.tsx`
- **Purpose**: Fixed-position player that appears on all pages
- **Features**:
  - Minimizable/expandable interface
  - Volume controls
  - Live status indicators
  - Show/hide functionality

### **3. Show Player Button**
- **File**: `src/components/atoms/ui/ShowPlayerButton.tsx`
- **Purpose**: Floating button to reveal hidden player
- **Usage**: Appears on pages where player is hidden

## 🔧 **Implementation Details**

### **Root Layout Integration**
The `RadioPlayerProvider` is integrated at the root level (`src/app/layout.tsx`):

```typescript
<RadioPlayerProvider
  streamUrl={stationData?.radioConfig?.streamUrl}
  statusApiUrl={stationData?.radioConfig?.statusApiUrl}
  defaultVolume={stationData?.radioConfig?.defaultVolume}
  autoPlay={stationData?.radioConfig?.autoPlay}
>
  <main>{children}</main>
  <PersistentMiniPlayer />
</RadioPlayerProvider>
```

### **Update Frequency**
- **Previous**: 3-second updates (felt like 30 seconds due to caching)
- **Current**: 1-second updates for real-time experience
- **Configurable**: Can be adjusted in the context provider

### **State Management**
The global context manages:
- Audio playback state
- Volume controls
- Track information
- Connection status
- UI state (minimized/expanded, show/hide)

## 🎯 **User Experience**

### **Home Page**
- Full-featured music section with detailed player
- Global player automatically syncs with home page player
- **No bottom mini-player** (avoids duplication)
- Seamless transition when navigating away

### **Other Pages (News, etc.)**
- **Animated mini-player** slides up from bottom with smooth spring animation
- **Show player button** appears with rotating entrance animation when player is hidden
- **Uninterrupted music playback** across all page transitions
- **Smart detection** - only shows on non-home pages

### **Player States**
1. **Expanded**: Full controls and track information visible
2. **Minimized**: Compact view with essential controls
3. **Hidden**: Only show player button visible

## 🔄 **Migration from Local to Global**

### **Before**
- Each page had its own `useRadioPlayer` instance
- Music stopped when navigating between pages
- Track updates were inconsistent

### **After**
- Single global `RadioPlayerContext`
- Continuous playback across all pages
- Real-time track information updates

## 📱 **Responsive Design**

The persistent player is fully responsive:
- **Mobile**: Compact design with essential controls
- **Tablet**: Expanded controls with better spacing
- **Desktop**: Full feature set with detailed information

## 🎛️ **Controls Available**

### **Mini Player**
- Play/Pause toggle
- Volume up/down
- Minimize/Expand
- Show/Hide player
- Live status indicator

### **Expanded Player**
- All mini player controls
- Volume slider
- Connection status
- Listener count
- Streamer information
- Error messages

## 🔧 **Configuration**

### **Update Interval**
```typescript
// In RadioPlayerProvider
updateInterval: 1000 // 1 second for real-time updates
```

### **Auto-play Settings**
Controlled via Sanity CMS radio configuration:
- `autoPlay`: Whether to start playing automatically
- `defaultVolume`: Initial volume level
- `streamUrl`: Radio stream URL
- `statusApiUrl`: API endpoint for track information

## 🎨 **Animation Features**

### **Mini Player Entrance**
- **Spring Animation**: Smooth slide-up from bottom with bounce effect
- **Staggered Elements**: Track info, controls, and indicators animate in sequence
- **Smart Timing**: 0.3s delay on first appearance, instant on subsequent shows
- **Visual Feedback**: Subtle glow effect when music is playing

### **Show Player Button**
- **Rotating Entrance**: Spins in with scale and position animation
- **Hover Effects**: Scale and rotation on interaction
- **Smart Visibility**: Only appears on non-home pages when player is hidden
- **Delayed Appearance**: 1.2s delay to avoid overwhelming users

### **Track Information Updates**
- **Smooth Transitions**: Track title and artist fade in/out when changing
- **Live Indicator**: Pulsing animation with scale and opacity effects
- **Album Art**: Hover scale effect for better interactivity

## 🚀 **Benefits**

1. **Uninterrupted Music**: Stream continues across page navigation
2. **Real-time Updates**: Track information updates every second
3. **Better UX**: Users don't lose their place when browsing
4. **Consistent Interface**: Same player controls everywhere
5. **Performance**: Single audio instance reduces resource usage
6. **Smooth Animations**: Professional feel with Framer Motion animations
7. **Context-Aware**: Smart detection of home vs other pages

## 🔍 **Testing**

### **Test Scenarios**
1. Start music on home page → Navigate to news → Music continues
2. Adjust volume in mini player → Volume persists across pages
3. Hide player → Show player button appears
4. Minimize player → Compact view maintains functionality

### **Browser Compatibility**
- Chrome: ✅ Full support
- Firefox: ✅ Full support  
- Safari: ✅ Full support
- Edge: ✅ Full support

## 🛠️ **Troubleshooting**

### **Music Stops on Navigation**
- Check that `RadioPlayerProvider` is in root layout
- Verify context is properly imported
- Ensure no duplicate audio instances

### **Updates Not Real-time**
- Confirm `updateInterval: 1000` in provider
- Check API response times
- Verify network connectivity

### **Player Not Showing**
- Check `showPlayer` state in context
- Verify `PersistentMiniPlayer` is in layout
- Look for CSS z-index conflicts

## 📈 **Future Enhancements**

### **Potential Improvements**
1. **Keyboard Shortcuts**: Space bar for play/pause
2. **Media Session API**: System media controls integration
3. **Offline Support**: Cache recent tracks for offline viewing
4. **Analytics**: Track listening patterns and engagement
5. **Playlist Support**: Queue management for multiple tracks

### **Performance Optimizations**
1. **Adaptive Updates**: Slower updates when tab is inactive
2. **Error Recovery**: Automatic reconnection on network issues
3. **Memory Management**: Cleanup unused audio resources
4. **Bandwidth Optimization**: Adjust stream quality based on connection

## 📝 **Code Examples**

### **Using Global Player in Components**
```typescript
import { useGlobalRadioPlayer } from '@/contexts/RadioPlayerContext'

function MyComponent() {
  const { isPlaying, togglePlay, currentTrack } = useGlobalRadioPlayer()
  
  return (
    <button onClick={togglePlay}>
      {isPlaying ? 'Pause' : 'Play'} {currentTrack?.title}
    </button>
  )
}
```

### **Adding Show Player Button**
```typescript
import { ShowPlayerButton } from '@/components/atoms/ui/ShowPlayerButton'

function MyPage() {
  return (
    <div>
      {/* Page content */}
      <ShowPlayerButton />
    </div>
  )
}
```

This implementation provides a seamless, professional radio streaming experience that keeps users engaged while browsing your site.
