# Pilot-Frontend: Influencer Collaboration Platform

A modern React-based frontend application for connecting brands with influencers. Built with Vite, TailwindCSS, and comprehensive features for campaign management, messaging, and analytics.

## 🚀 Features

### ✅ Completed Features

- **Authentication System**
  - Login/Register with role selection (Brand/Influencer)
  - Protected routing and role-based access control
  - Persistent authentication state with Zustand

- **Profile Management**
  - Influencer Profile Wizard (bio, categories, follower counts, social platforms)
  - Brand Dashboard with company information
  - Profile completion flow and validation

- **Campaign Management**
  - Create, list, and view campaigns
  - Campaign detail pages with comprehensive information
  - Proposal system (influencers apply, brands accept/reject)
  - Campaign status tracking and management

- **Search & Discovery**
  - Advanced search and filtering for influencers
  - Filter by category, followers, platform
  - Responsive search interface

- **Messaging System**
  - Real-time messaging between brands and influencers
  - Polling-based message updates (3-second intervals)
  - Optimistic UI for instant message display
  - Message history with infinite scroll capability
  - Offline handling with retry functionality
  - Conversation management and unread message tracking

- **Analytics & Trends**
  - Instagram API integration structure
  - Interactive charts using Recharts
  - Followers growth tracking (line charts)
  - Engagement analytics (bar charts)
  - Time-range selectors (7d, 30d, 90d)
  - Summary cards with key metrics
  - Chart export functionality (PNG)
  - Loading skeletons and fallback UI

- **Instagram Integration**
  - Backend API integration structure
  - Fallback to mock data when API unavailable
  - Connection status indicators
  - Refresh and reconnection capabilities
  - "Not connected" state handling

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM v6
- **State Management**: Zustand
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **Real-time**: Socket.io Client (ready for WebSocket implementation)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1234-ad/pilot-frontend-influencer-platform.git
   cd pilot-frontend-influencer-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🏗 Project Structure

```
src/
├── components/
│   └── layout/
│       └── Navbar.jsx          # Navigation component
├── pages/
│   ├── auth/
│   │   ├── Login.jsx           # Login page
│   │   └── Register.jsx        # Registration page
│   ├── brand/
│   │   └── BrandDashboard.jsx  # Brand dashboard
│   ├── campaigns/
│   │   ├── Campaigns.jsx       # Campaign listing
│   │   ├── CampaignDetail.jsx  # Campaign details & proposals
│   │   └── CreateCampaign.jsx  # Campaign creation
│   ├── influencer/
│   │   ├── InfluencerProfile.jsx        # Influencer dashboard
│   │   └── InfluencerProfileWizard.jsx  # Profile setup
│   ├── messages/
│   │   └── Messages.jsx        # Messaging interface
│   └── search/
│       └── Search.jsx          # Search & discovery
├── store/
│   ├── authStore.js           # Authentication state
│   └── campaignStore.js       # Campaign management state
├── App.jsx                    # Main app component
├── main.jsx                   # App entry point
└── index.css                  # Global styles
```

## 🎯 Key Features Breakdown

### Authentication Flow
- Role-based registration (Brand/Influencer)
- JWT token management
- Protected route handling
- Automatic redirects based on authentication state

### Messaging System
- **Polling Implementation**: Messages refresh every 3 seconds
- **Optimistic UI**: Messages appear instantly while sending
- **Error Handling**: Failed messages show retry option
- **Conversation Management**: Multiple chat threads
- **Real-time Indicators**: Online status and message delivery

### Instagram Integration
- **API Structure**: Ready for backend integration
- **Fallback System**: Mock data when API unavailable
- **Connection Status**: Visual indicators for connection state
- **Data Display**: Followers, engagement, posts metrics
- **Refresh Capability**: Manual data refresh option

### Analytics Dashboard
- **Interactive Charts**: Line and bar charts with Recharts
- **Time Range Selection**: 7d, 30d, 90d options
- **Export Functionality**: PNG export capability
- **Loading States**: Skeleton screens during data fetch
- **Responsive Design**: Mobile-friendly chart layouts

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_INSTAGRAM_CLIENT_ID=your_instagram_client_id
VITE_SOCKET_URL=ws://localhost:3001
```

### API Endpoints Expected
The frontend expects these backend endpoints:

```
GET  /api/profiles/:id/instagram-stats    # Instagram analytics
GET  /api/chats/:id/messages              # Message history
POST /api/chats/:id/messages              # Send message
GET  /api/campaigns                       # Campaign listing
POST /api/campaigns                       # Create campaign
GET  /api/campaigns/:id                   # Campaign details
POST /api/campaigns/:id/proposals         # Submit proposal
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)

### Components
- **Cards**: Consistent padding and shadows
- **Buttons**: Primary, secondary, and ghost variants
- **Forms**: Consistent styling with validation states
- **Charts**: Responsive with consistent color schemes

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: CSS Grid and Flexbox for layouts
- **Touch Friendly**: Appropriate touch targets and spacing

## 🧪 Development Guidelines

### Code Style
- **ESLint**: Configured for React best practices
- **Prettier**: Consistent code formatting
- **Component Structure**: Functional components with hooks
- **State Management**: Zustand for global state

### Performance
- **Lazy Loading**: Route-based code splitting ready
- **Optimistic UI**: Immediate feedback for user actions
- **Efficient Rendering**: Proper dependency arrays in useEffect
- **Image Optimization**: Placeholder avatars and loading states

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Platforms
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting option

## 🔮 Future Enhancements

### Phase 2 Features (Planned)
- **WebSocket Integration**: Real-time messaging upgrade
- **File Uploads**: Image and document sharing
- **Video Calls**: Integrated video conferencing
- **Advanced Analytics**: More detailed metrics and insights
- **Mobile App**: React Native version
- **Push Notifications**: Real-time alerts

### Technical Improvements
- **Testing**: Jest and React Testing Library setup
- **TypeScript**: Migration to TypeScript
- **PWA**: Progressive Web App capabilities
- **Offline Support**: Service worker implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 📊 Demo Credentials

For testing purposes, you can use these demo accounts:

**Influencer Account:**
- Email: influencer@demo.com
- Password: demo123

**Brand Account:**
- Email: brand@demo.com
- Password: demo123

---

**Built with ❤️ for the creator economy**