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
  Download
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

const InfluencerProfile = () => {
  const { user } = useAuthStore()
  const [timeRange, setTimeRange] = useState('30d')
  const [instagramData, setInstagramData] = useState(null)
  const [trendsData, setTrendsData] = useState([])
  const [engagementData, setEngagementData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API calls for Instagram data and trends
    const fetchData = async () => {
      setIsLoading(true)
      
      // Mock Instagram data
      const mockInstagramData = {
        followers: 15420,
        following: 892,
        posts: 156,
        avgLikes: 1240,
        avgComments: 89,
        engagementRate: 8.6
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
        setIsLoading(false)
      }, 1000)
    }
    
    fetchData()
  }, [timeRange])

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
                  if (!data.username) return null
                  const Icon = getPlatformIcon(platform)
                  return (
                    <div key={platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium capitalize">{platform}</p>
                          <p className="text-sm text-gray-600">@{data.username}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{data.followers?.toLocaleString() || 0}</p>
                        <p className="text-xs text-gray-500">followers</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Instagram Stats */}
            {instagramData && (
              <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                  <Instagram className="h-5 w-5 text-pink-600" />
                  <h3 className="font-semibold text-gray-900">Instagram Stats</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-lg font-semibold">{instagramData.followers.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Heart className="h-5 w-5 text-red-500 mx-auto mb-1" />
                    <p className="text-lg font-semibold">{instagramData.avgLikes}</p>
                    <p className="text-xs text-gray-500">Avg Likes</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-lg font-semibold">{instagramData.avgComments}</p>
                    <p className="text-xs text-gray-500">Avg Comments</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p className="text-lg font-semibold">{instagramData.engagementRate}%</p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trends Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Time Range Selector */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Analytics & Trends</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['7d', '30d', '90d'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          timeRange === range
                            ? 'bg-white text-primary-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Export</span>
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Current Followers</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {instagramData?.followers.toLocaleString()}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Avg Engagement</p>
                      <p className="text-2xl font-bold text-green-900">
                        {instagramData?.engagementRate}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Posts (30d)</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {instagramData?.posts}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Followers Chart */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Followers Over Time</h3>
                {isLoading ? (
                  <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
                ) : (
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
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Engagement Chart */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Metrics</h3>
                {isLoading ? (
                  <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="likes" fill="#ef4444" />
                        <Bar dataKey="comments" fill="#3b82f6" />
                        <Bar dataKey="shares" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfluencerProfile