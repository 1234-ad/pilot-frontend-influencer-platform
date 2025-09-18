import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCampaignStore } from '../../store/campaignStore'
import { 
  Target, 
  Users, 
  TrendingUp, 
  MessageCircle,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

const BrandDashboard = () => {
  const { user } = useAuthStore()
  const { campaigns, proposals } = useCampaignStore()
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalProposals: 0,
    acceptedProposals: 0
  })

  useEffect(() => {
    // Calculate stats
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length
    const totalProposals = proposals.length
    const acceptedProposals = proposals.filter(p => p.status === 'accepted').length

    setStats({
      totalCampaigns: campaigns.length,
      activeCampaigns,
      totalProposals,
      acceptedProposals
    })
  }, [campaigns, proposals])

  const recentCampaigns = campaigns.slice(0, 3)
  const recentProposals = proposals.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Brand Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <Link to="/create-campaign" className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Campaign</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
              </div>
              <Target className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeCampaigns}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Proposals</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalProposals}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-purple-600">{stats.acceptedProposals}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Campaigns */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Campaigns</h2>
              <Link to="/campaigns" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </Link>
            </div>

            {recentCampaigns.length === 0 ? (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No campaigns yet</p>
                <Link to="/create-campaign" className="btn-primary">
                  Create Your First Campaign
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{campaign.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Budget: ${campaign.budget}</span>
                      <Link 
                        to={`/campaigns/${campaign.id}`}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Proposals */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Proposals</h2>
              <Link to="/campaigns" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </Link>
            </div>

            {recentProposals.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No proposals yet</p>
                <p className="text-sm text-gray-400">Proposals will appear here when influencers apply to your campaigns</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProposals.map((proposal) => (
                  <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{proposal.influencerName}</p>
                          <p className="text-sm text-gray-500">{proposal.campaignTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {proposal.status === 'pending' && (
                          <>
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-xs text-yellow-600">Pending</span>
                          </>
                        )}
                        {proposal.status === 'accepted' && (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-600">Accepted</span>
                          </>
                        )}
                        {proposal.status === 'rejected' && (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-xs text-red-600">Rejected</span>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{proposal.message}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Proposed rate: ${proposal.proposedRate}</span>
                      {proposal.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button className="text-green-600 hover:text-green-700 font-medium">
                            Accept
                          </button>
                          <button className="text-red-600 hover:text-red-700 font-medium">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/create-campaign" className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Create Campaign</h3>
                <p className="text-sm text-gray-600">Launch a new influencer campaign</p>
              </div>
            </div>
          </Link>

          <Link to="/search" className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Find Influencers</h3>
                <p className="text-sm text-gray-600">Discover and connect with creators</p>
              </div>
            </div>
          </Link>

          <Link to="/messages" className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Messages</h3>
                <p className="text-sm text-gray-600">Chat with influencers</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BrandDashboard