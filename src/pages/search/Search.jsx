import { useState, useEffect } from 'react'
import { 
  Search as SearchIcon, 
  Filter, 
  Users, 
  Instagram, 
  Youtube, 
  Twitter, 
  TrendingUp,
  MessageCircle,
  Eye
} from 'lucide-react'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [followersRange, setFollowersRange] = useState({ min: '', max: '' })
  const [influencers, setInfluencers] = useState([])
  const [filteredInfluencers, setFilteredInfluencers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock influencers data
  useEffect(() => {
    const mockInfluencers = [
      {
        id: 1,
        name: 'Sarah Johnson',
        username: '@sarahjohnson',
        bio: 'Fashion & lifestyle content creator passionate about sustainable fashion',
        categories: ['Fashion', 'Lifestyle'],
        platforms: {
          instagram: { followers: 45000, engagement: 8.2 },
          youtube: { followers: 12000, engagement: 6.5 }
        },
        avatar: null,
        location: 'New York, NY',
        engagementRate: 8.2,
        avgLikes: 3200,
        avgComments: 180
      },
      {
        id: 2,
        name: 'Mike Chen',
        username: '@mikefitness',
        bio: 'Certified personal trainer helping people achieve their fitness goals',
        categories: ['Fitness', 'Health'],
        platforms: {
          instagram: { followers: 78000, engagement: 9.1 },
          youtube: { followers: 25000, engagement: 7.8 },
          tiktok: { followers: 120000, engagement: 12.5 }
        },
        avatar: null,
        location: 'Los Angeles, CA',
        engagementRate: 9.1,
        avgLikes: 6800,
        avgComments: 420
      },
      {
        id: 3,
        name: 'Emma Rodriguez',
        username: '@emmabeauty',
        bio: 'Beauty enthusiast sharing honest reviews and makeup tutorials',
        categories: ['Beauty', 'Lifestyle'],
        platforms: {
          instagram: { followers: 92000, engagement: 7.6 },
          youtube: { followers: 35000, engagement: 8.9 }
        },
        avatar: null,
        location: 'Miami, FL',
        engagementRate: 7.6,
        avgLikes: 5200,
        avgComments: 310
      },
      {
        id: 4,
        name: 'Alex Thompson',
        username: '@alextech',
        bio: 'Tech reviewer and gadget enthusiast. Latest tech trends and reviews.',
        categories: ['Tech', 'Gaming'],
        platforms: {
          instagram: { followers: 34000, engagement: 6.8 },
          youtube: { followers: 85000, engagement: 9.2 },
          twitter: { followers: 15000, engagement: 4.5 }
        },
        avatar: null,
        location: 'San Francisco, CA',
        engagementRate: 6.8,
        avgLikes: 2100,
        avgComments: 95
      },
      {
        id: 5,
        name: 'Lisa Park',
        username: '@lisafoodie',
        bio: 'Food blogger exploring cuisines around the world. Recipe creator.',
        categories: ['Food', 'Travel'],
        platforms: {
          instagram: { followers: 67000, engagement: 8.9 },
          youtube: { followers: 18000, engagement: 7.3 }
        },
        avatar: null,
        location: 'Seattle, WA',
        engagementRate: 8.9,
        avgLikes: 4500,
        avgComments: 280
      }
    ]

    setTimeout(() => {
      setInfluencers(mockInfluencers)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter influencers
  useEffect(() => {
    let filtered = influencers

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(influencer =>
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.bio.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(influencer =>
        influencer.categories.includes(categoryFilter)
      )
    }

    // Platform filter
    if (platformFilter !== 'all') {
      filtered = filtered.filter(influencer =>
        influencer.platforms[platformFilter.toLowerCase()]
      )
    }

    // Followers range filter
    if (followersRange.min || followersRange.max) {
      filtered = filtered.filter(influencer => {
        const maxFollowers = Math.max(
          ...Object.values(influencer.platforms).map(p => p.followers)
        )
        const min = followersRange.min ? parseInt(followersRange.min) : 0
        const max = followersRange.max ? parseInt(followersRange.max) : Infinity
        return maxFollowers >= min && maxFollowers <= max
      })
    }

    setFilteredInfluencers(filtered)
  }, [influencers, searchTerm, categoryFilter, platformFilter, followersRange])

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: Instagram,
      youtube: Youtube,
      twitter: Twitter
    }
    return icons[platform] || Users
  }

  const getMaxFollowers = (platforms) => {
    return Math.max(...Object.values(platforms).map(p => p.followers))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Influencers</h1>
          <p className="text-gray-600">Discover and connect with content creators</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search influencers by name, username, or bio..."
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Categories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Tech">Tech</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Platforms</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Twitter">Twitter</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Followers
                </label>
                <input
                  type="number"
                  value={followersRange.min}
                  onChange={(e) => setFollowersRange(prev => ({ ...prev, min: e.target.value }))}
                  className="input-field"
                  placeholder="1000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Followers
                </label>
                <input
                  type="number"
                  value={followersRange.max}
                  onChange={(e) => setFollowersRange(prev => ({ ...prev, max: e.target.value }))}
                  className="input-field"
                  placeholder="100000"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredInfluencers.length} influencer{filteredInfluencers.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Influencers Grid */}
        {filteredInfluencers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No influencers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfluencers.map((influencer) => (
              <div key={influencer.id} className="card hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {influencer.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{influencer.username}</p>
                    <p className="text-xs text-gray-500">{influencer.location}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {influencer.bio}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {influencer.categories.map((category) => (
                    <span 
                      key={category}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Platform Stats */}
                <div className="space-y-3 mb-4">
                  {Object.entries(influencer.platforms).map(([platform, data]) => {
                    const Icon = getPlatformIcon(platform)
                    return (
                      <div key={platform} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm capitalize">{platform}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{data.followers.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{data.engagement}% eng.</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center py-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{getMaxFollowers(influencer.platforms).toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Max Followers</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{influencer.engagementRate}%</p>
                    <p className="text-xs text-gray-500">Avg Engagement</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{influencer.avgLikes.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Avg Likes</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 btn-secondary flex items-center justify-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>View Profile</span>
                  </button>
                  <button className="flex-1 btn-primary flex items-center justify-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search