import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Navbar from './components/layout/Navbar'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import InfluencerProfile from './pages/influencer/InfluencerProfile'
import BrandDashboard from './pages/brand/BrandDashboard'
import Campaigns from './pages/campaigns/Campaigns'
import CampaignDetail from './pages/campaigns/CampaignDetail'
import CreateCampaign from './pages/campaigns/CreateCampaign'
import Search from './pages/search/Search'
import Messages from './pages/messages/Messages'
import InfluencerProfileWizard from './pages/influencer/InfluencerProfileWizard'

function App() {
  const { user, isAuthenticated } = useAuthStore()

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar />}
        
        <main className={isAuthenticated ? 'pt-16' : ''}>
          <Routes>
            {/* Public routes */}
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} 
            />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? (
                  user?.role === 'influencer' ? <InfluencerProfile /> : <BrandDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            
            <Route 
              path="/profile-wizard" 
              element={
                isAuthenticated && user?.role === 'influencer' ? 
                <InfluencerProfileWizard /> : 
                <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/campaigns" 
              element={isAuthenticated ? <Campaigns /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/campaigns/:id" 
              element={isAuthenticated ? <CampaignDetail /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/create-campaign" 
              element={
                isAuthenticated && user?.role === 'brand' ? 
                <CreateCampaign /> : 
                <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/search" 
              element={isAuthenticated ? <Search /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/messages" 
              element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} 
            />
            
            {/* Default redirect */}
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App