import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCampaignStore } from '../../store/campaignStore'
import { 
  ArrowLeft, 
  Target, 
  DollarSign, 
  Calendar, 
  Users, 
  Send,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  Eye
} from 'lucide-react'

const CampaignDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { campaigns, addProposal, getProposalsForCampaign, updateProposalStatus } = useCampaignStore()
  
  const [campaign, setCampaign] = useState(null)
  const [proposals, setProposals] = useState([])
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [proposalMessage, setProposalMessage] = useState('')
  const [proposedRate, setProposedRate] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Find campaign by ID
    const foundCampaign = campaigns.find(c => c.id === parseInt(id))
    if (foundCampaign) {
      setCampaign(foundCampaign)
      setProposals(getProposalsForCampaign(foundCampaign.id))
    }
    setIsLoading(false)
  }, [id, campaigns, getProposalsForCampaign])

  const handleProposalSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newProposal = {
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        influencerId: user.id,
        influencerName: user.name,
        message: proposalMessage,
        proposedRate: parseInt(proposedRate),
        createdAt: new Date().toISOString()
      }

      addProposal(newProposal)
      setProposals(prev => [...prev, { ...newProposal, id: Date.now(), status: 'pending' }])
      setShowProposalForm(false)
      setProposalMessage('')
      setProposedRate('')
      setIsSubmitting(false)
    }, 1000)
  }

  const handleProposalAction = (proposalId, action) => {
    updateProposalStatus(proposalId, action)
    setProposals(prev => 
      prev.map(p => p.id === proposalId ? { ...p, status: action } : p)
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Campaign not found</h2>
          <button onClick={() => navigate('/campaigns')} className="btn-primary">
            Back to Campaigns
          </button>
        </div>
      </div>
    )
  }

  const userHasApplied = proposals.some(p => p.influencerId === user.id)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/campaigns')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Campaigns</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Info */}
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
                  <p className="text-gray-600">by {campaign.brandName}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  campaign.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : campaign.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{campaign.description}</p>
              </div>

              {/* Categories & Platforms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {campaign.categories.map((category) => (
                      <span 
                        key={category}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {campaign.platforms.map((platform) => (
                      <span 
                        key={platform}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Requirements */}
              {(campaign.deliverables || campaign.requirements) && (
                <div className="mb-6">
                  {campaign.deliverables && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Deliverables</h3>
                      <p className="text-gray-600">{campaign.deliverables}</p>
                    </div>
                  )}
                  
                  {campaign.requirements && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                      <p className="text-gray-600">{campaign.requirements}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Apply Button for Influencers */}
              {user?.role === 'influencer' && campaign.status === 'active' && (
                <div className="pt-6 border-t border-gray-200">
                  {userHasApplied ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">You have applied to this campaign</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowProposalForm(true)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Apply to Campaign</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Proposal Form */}
            {showProposalForm && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Proposal</h3>
                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proposal Message
                    </label>
                    <textarea
                      value={proposalMessage}
                      onChange={(e) => setProposalMessage(e.target.value)}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Tell the brand why you're perfect for this campaign..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proposed Rate ($)
                    </label>
                    <input
                      type="number"
                      value={proposedRate}
                      onChange={(e) => setProposedRate(e.target.value)}
                      className="input-field"
                      placeholder="Your rate for this campaign"
                      min="1"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowProposalForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Campaign Stats */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Campaign Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Budget</span>
                  </div>
                  <span className="font-medium">${campaign.budget.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Deadline</span>
                  </div>
                  <span className="font-medium">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Applicants</span>
                  </div>
                  <span className="font-medium">{campaign.applicants}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Followers Range</span>
                  </div>
                  <span className="font-medium text-sm">
                    {campaign.minFollowers?.toLocaleString()} - {campaign.maxFollowers?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Proposals (for brand users) */}
            {user?.role === 'brand' && proposals.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Proposals ({proposals.length})</h3>
                
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{proposal.influencerName}</h4>
                        <div className="flex items-center space-x-1">
                          {proposal.status === 'pending' && (
                            <Clock className="h-4 w-4 text-yellow-500" />
                          )}
                          {proposal.status === 'accepted' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {proposal.status === 'rejected' && (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            proposal.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : proposal.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {proposal.status}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{proposal.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">${proposal.proposedRate}</span>
                        {proposal.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleProposalAction(proposal.id, 'accepted')}
                              className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleProposalAction(proposal.id, 'rejected')}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Brand */}
            {user?.role === 'influencer' && (
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Brand</h3>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetail