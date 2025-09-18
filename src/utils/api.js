import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth-token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const apiEndpoints = {
  // Authentication
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  
  // Instagram Integration
  instagramStats: (userId) => `/profiles/${userId}/instagram-stats`,
  connectInstagram: '/auth/instagram',
  
  // Messaging
  conversations: '/conversations',
  messages: (conversationId) => `/conversations/${conversationId}/messages`,
  sendMessage: (conversationId) => `/conversations/${conversationId}/messages`,
  
  // Campaigns
  campaigns: '/campaigns',
  campaign: (id) => `/campaigns/${id}`,
  createCampaign: '/campaigns',
  proposals: (campaignId) => `/campaigns/${campaignId}/proposals`,
  
  // Search
  searchInfluencers: '/search/influencers',
  
  // Profile
  profile: (userId) => `/profiles/${userId}`,
  updateProfile: (userId) => `/profiles/${userId}`,
}

// Helper functions for common API calls
export const apiHelpers = {
  // Instagram API calls
  async getInstagramStats(userId, timeRange = '30d') {
    try {
      const response = await api.get(apiEndpoints.instagramStats(userId), {
        params: { timeRange }
      })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Instagram API error:', error)
      return { success: false, error: error.message }
    }
  },

  // Messaging API calls
  async getMessages(conversationId, page = 1, limit = 50) {
    try {
      const response = await api.get(apiEndpoints.messages(conversationId), {
        params: { page, limit }
      })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Messages API error:', error)
      return { success: false, error: error.message }
    }
  },

  async sendMessage(conversationId, message) {
    try {
      const response = await api.post(apiEndpoints.sendMessage(conversationId), {
        text: message,
        timestamp: new Date().toISOString()
      })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Send message API error:', error)
      return { success: false, error: error.message }
    }
  },

  // Campaign API calls
  async getCampaigns(filters = {}) {
    try {
      const response = await api.get(apiEndpoints.campaigns, {
        params: filters
      })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Campaigns API error:', error)
      return { success: false, error: error.message }
    }
  },

  async createCampaign(campaignData) {
    try {
      const response = await api.post(apiEndpoints.createCampaign, campaignData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Create campaign API error:', error)
      return { success: false, error: error.message }
    }
  },

  // Search API calls
  async searchInfluencers(filters = {}) {
    try {
      const response = await api.get(apiEndpoints.searchInfluencers, {
        params: filters
      })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Search API error:', error)
      return { success: false, error: error.message }
    }
  }
}

export default api