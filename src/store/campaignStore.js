import { create } from 'zustand'

export const useCampaignStore = create((set, get) => ({
  campaigns: [],
  selectedCampaign: null,
  proposals: [],
  
  setCampaigns: (campaigns) => set({ campaigns }),
  
  addCampaign: (campaign) => set((state) => ({
    campaigns: [...state.campaigns, { ...campaign, id: Date.now() }]
  })),
  
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
  
  addProposal: (proposal) => set((state) => ({
    proposals: [...state.proposals, { ...proposal, id: Date.now(), status: 'pending' }]
  })),
  
  updateProposalStatus: (proposalId, status) => set((state) => ({
    proposals: state.proposals.map(p => 
      p.id === proposalId ? { ...p, status } : p
    )
  })),
  
  getProposalsForCampaign: (campaignId) => {
    return get().proposals.filter(p => p.campaignId === campaignId)
  }
}))