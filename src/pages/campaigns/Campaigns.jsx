import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCampaignStore } from '../../store/campaignStore'
import { 
  Target, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Users, 
  DollarSign,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react'

const Campaigns = () => {
  const { user } = useAuthStore()
  const { campaigns, setCampaigns } = useCampaignStore()
  const [filteredCampaigns, setFilteredCampaigns] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Mock campaigns data
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 1,
        title: 'Summer Fashion Collection Launch',
        description: 'Promote our new summer collection with authentic lifestyle content',
        budget: 5000,
        status: 'active',
        categories: ['Fashion', 'Lifestyle'],
        platforms: ['Instagram', 'TikTok'],
        brandName: 'StyleCo',
        deadline: '2024-07-15',
        applicants: 12,
        minFollowers: 10000,
        maxFollowers: 100000,
        createdAt: '2024-06-01'
      },
      {
        id: 2,
        title: 'Fitness App Beta Testing',
        description: 'Looking for fitness influencers to test and review our new workout app',
        budget: 3000,
        status: 'active',
        categories: ['Fitness', 'Tech'],
        platforms: ['Instagram', 'YouTube'],
        brandName: 'FitTech',
        deadline: '2024-06-30',
        applicants: 8,
        minFollowers: 5000,
        maxFollowers: 50000,
        createdAt: '2024-05-15'
      },
      {
        id: 3,
        title: 'Organic Skincare Review',
        description: 'Authentic reviews of our new organic skincare line',
        budget: 2500,
        status: 'draft',
        categories: ['Beauty', 'Lifestyle'],
        platforms: ['Instagram', 'YouTube'],
        brandName: 'GreenBeauty',
        deadline: '2024-08-01',
        applicants: 0,
        minFollowers: 15000,
        maxFollowers: 200000,
        createdAt: '2024-06-10'
      }
    ]

    setTimeout(() => {
      setCampaigns(mockCampaigns)
      setIsLoading(false)
    }, 1000)
  }, [setCampaigns])

  // Filter campaigns
  useEffect(() => {
    let filtered = campaigns

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.brandName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(campaign =>
        campaign.categories.includes(categoryFilter)
      )
    }

    setFilteredCampaigns(filtered)
  }, [campaigns, searchTerm, statusFilter, categoryFilter])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.role === 'brand' ? 'My Campaigns' : 'Available Campaigns'}
            </h1>
            <p className="text-gray-600">
              {user?.role === 'brand' 
                ? 'Manage your influencer marketing campaigns'
                : 'Discover and apply to brand campaigns'
              }
            </p>
          </div>
          {user?.role === 'brand' && (
            <Link to="/create-campaign" className="btn-primary flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Campaign</span>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search campaigns..."
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field py-2"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field py-2"
              >
                <option value="all">All Categories</option>
                <option value="Fashion">Fashion</option>
                <option value="Beauty">Beauty</option>
                <option value="Fitness">Fitness</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters'
                : user?.role === 'brand'
                ? 'Create your first campaign to get started'
                : 'No campaigns available at the moment'
              }
            </p>
            {user?.role === 'brand' && (
              <Link to="/create-campaign" className="btn-primary">
                Create Campaign
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="card hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-gray-600">{campaign.brandName}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(campaign.status)}
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {campaign.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {campaign.categories.map((category) => (
                    <span 
                      key={category}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Platforms */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-500">Platforms:</span>
                  <div className="flex space-x-1">
                    {campaign.platforms.map((platform) => (
                      <span 
                        key={platform}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">${campaign.budget}</span>
                    </div>
                    <p className="text-xs text-gray-500">Budget</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{campaign.applicants}</span>
                    </div>
                    <p className="text-xs text-gray-500">Applicants</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">
                        {new Date(campaign.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Deadline</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    {campaign.minFollowers?.toLocaleString()} - {campaign.maxFollowers?.toLocaleString()} followers
                  </div>
                  <Link 
                    to={`/campaigns/${campaign.id}`}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Campaigns