import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { 
  User, 
  Instagram, 
  Youtube, 
  Twitter, 
  Users, 
  Heart, 
  MessageCircle,
  TrendingUp,
  Calendar,
  Download,
  AlertCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { format, subDays } from 'date-fns'
import axios from 'axios'

const InfluencerProfile = () => {
  const { user } = useAuthStore()
  const [timeRange, setTimeRange] = useState('30d')
  const [instagramData, setInstagramData] = useState(null)
  const [trendsData, setTrendsData] = useState([])
  const [engagementData, setEngagementData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [instagramConnected, setInstagramConnected] = useState(false)
  const [instagramError, setInstagramError] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchInstagramData()
  }, [timeRange])

  const fetchInstagramData = async () => {
    setIsLoading(true)
    setInstagramError(null)
    
    try {
      // Try to fetch real Instagram data from backend
      const response = await axios.get(`/api/profiles/${user.id}/instagram-stats`, {
        params: { timeRange }
      })
      
      if (response.data.success) {
        setInstagramData(response.data.data.stats)
        setTrendsData(response.data.data.trends)
        setEngagementData(response.data.data.engagement)
        setInstagramConnected(true)
      }
    } catch (error) {
      console.log('Instagram API not available, using mock data')
      setInstagramError('Instagram data unavailable')
      
      // Fallback to mock data for development
      const mockInstagramData = {
        followers: 15420,
        following: 892,
        posts: 156,
        avgLikes: 1240,
        avgComments: 89,
        engagementRate: 8.6,
        recentPosts: [
          {
            id: '1',
            likes: 1340,
            comments: 95,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
          },
          {
            id: '2',
            likes: 1180,
            comments: 78,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
          }
        ]
      }
      
      // Generate mock trends data
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
      const mockTrendsData = Array.from({ length: days }, (_, i) => ({
        date: format(subDays(new Date(), days - i - 1), 'MMM dd'),
        followers: 15420 - (days - i) * 2 + Math.random() * 10,
        engagement: 8.6 + Math.random() * 2 - 1
      }))
      
      const mockEngagementData = Array.from({ length: days }, (_, i) => ({
        date: format(subDays(new Date(), days - i - 1), 'MMM dd'),
        likes: 1200 + Math.random() * 400,
        comments: 80 + Math.random() * 40,
        shares: 20 + Math.random() * 15
      }))
      
      setTimeout(() => {
        setInstagramData(mockInstagramData)
        setTrendsData(mockTrendsData)
        setEngagementData(mockEngagementData)
        setInstagramConnected(false) // Mark as not connected since using mock data
      }, 1000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefreshInstagram = async () => {
    setIsRefreshing(true)
    await fetchInstagramData()
    setIsRefreshing(false)
  }

  const connectInstagram = () => {
    // In a real app, this would redirect to Instagram OAuth
    window.open('/api/auth/instagram', '_blank')
  }

  const exportChart = (chartType) => {
    // Export chart as PNG (placeholder implementation)
    console.log(`Exporting ${chartType} chart as PNG`)
    // In a real implementation, you would use a library like html2canvas
    alert(`${chartType} chart export feature coming soon!`)
  }

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: Instagram,
      youtube: Youtube,
      twitter: Twitter,
      tiktok: User
    }
    return icons[platform] || User
  }

  if (!user?.profileCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Complete Your Profile</h2>
          <p className="text-gray-600 mb-4">Please complete your profile to access the dashboard</p>
          <a href="/profile-wizard" className="btn-primary">
            Complete Profile
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's your influencer dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Bio</h3>
                <p className="text-gray-600 text-sm">{user.bio}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {user.categories?.map((category) => (
                    <span 
                      key={category}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Social Platforms</h3>
              <div className="space-y-3">
                {user.platforms && Object.entries(user.platforms).map(([platform, data]) => {
                  const IconComponent = getPlatformIcon(platform)
                  return (
                    <div key={platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{platform}</p>
                          <p className="text-sm text-gray-600">@{data.username}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{data.followers?.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">followers</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Instagram Connection Status */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Instagram Integration</h3>
                <button
                  onClick={handleRefreshInstagram}
                  disabled={isRefreshing}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              {!instagramConnected ? (
                <div className="text-center py-4">
                  <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-3">
                    {instagramError || 'Instagram not connected'}
                  </p>
                  <button
                    onClick={connectInstagram}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Connect Instagram
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center text-green-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Connected & syncing</span>
                </div>
              )}
            </div>
          </div>

          {/* Analytics & Trends */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instagram Stats */}
            {instagramData && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Instagram Analytics</h3>
                  {!instagramConnected && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      Demo Data
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{instagramData.followers?.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <Heart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{instagramData.avgLikes?.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Avg Likes</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{instagramData.avgComments}</p>
                    <p className="text-sm text-gray-600">Avg Comments</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{instagramData.engagementRate}%</p>
                    <p className="text-sm text-gray-600">Engagement Rate</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{instagramData.posts}</p>
                    <p className="text-sm text-gray-600">Total Posts</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg">
                    <Users className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{instagramData.following?.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Following</p>
                  </div>
                </div>
              </div>
            )}

            {/* Trends Section */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Growth Trends</h3>
                <div className="flex items-center space-x-4">
                  {/* Time Range Selector */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['7d', '30d', '90d'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                          timeRange === range
                            ? 'bg-white text-primary-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => exportChart('followers')}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    title="Export chart"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading trends...</p>
                  </div>
                </div>
              ) : trendsData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="followers" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No trend data available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Engagement Trends */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Engagement Trends</h3>
                <button
                  onClick={() => exportChart('engagement')}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  title="Export chart"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : engagementData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="likes" fill="#EF4444" />
                      <Bar dataKey="comments" fill="#10B981" />
                      <Bar dataKey="shares" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No engagement data available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-lg font-semibold text-gray-900">
                  {instagramData?.followers?.toLocaleString() || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">Current Followers</p>
              </div>
              
              <div className="card text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-semibold text-gray-900">
                  {instagramData?.engagementRate || 'N/A'}%
                </p>
                <p className="text-sm text-gray-600">Avg Engagement Rate</p>
              </div>
              
              <div className="card text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-lg font-semibold text-gray-900">
                  {instagramData?.posts || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">Posts in Last 30 Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfluencerProfile