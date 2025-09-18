import { format, subDays, addDays } from 'date-fns'

// Mock user data
export const mockUsers = {
  influencer: {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'influencer',
    bio: 'Fashion and lifestyle influencer passionate about sustainable living and authentic storytelling. Based in NYC.',
    categories: ['Fashion', 'Lifestyle', 'Sustainability'],
    profileCompleted: true,
    platforms: {
      instagram: {
        username: 'sarahjohnson',
        followers: 15420,
        following: 892,
        posts: 156,
        verified: true
      },
      tiktok: {
        username: 'sarahjohnson',
        followers: 8900,
        following: 234,
        posts: 89,
        verified: false
      },
      youtube: {
        username: 'SarahJohnsonVlogs',
        followers: 3400,
        following: 45,
        posts: 23,
        verified: false
      }
    }
  },
  brand: {
    id: 2,
    name: 'Nike Marketing Team',
    email: 'marketing@nike.com',
    role: 'brand',
    company: 'Nike Inc.',
    industry: 'Sports & Fitness',
    profileCompleted: true
  }
}

// Mock Instagram data generator
export const generateInstagramData = (timeRange = '30d') => {
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
  const baseFollowers = 15420
  const baseEngagement = 8.6

  return {
    stats: {
      followers: baseFollowers,
      following: 892,
      posts: 156,
      avgLikes: 1240,
      avgComments: 89,
      engagementRate: baseEngagement,
      recentPosts: [
        {
          id: '1',
          likes: 1340,
          comments: 95,
          shares: 23,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          caption: 'Sustainable fashion haul! 🌱'
        },
        {
          id: '2',
          likes: 1180,
          comments: 78,
          shares: 19,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
          caption: 'Morning routine for a productive day ☀️'
        },
        {
          id: '3',
          likes: 1520,
          comments: 112,
          shares: 31,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
          caption: 'NYC street style inspiration 🏙️'
        }
      ]
    },
    trends: Array.from({ length: days }, (_, i) => ({
      date: format(subDays(new Date(), days - i - 1), 'MMM dd'),
      followers: baseFollowers - (days - i) * 2 + Math.random() * 20 - 10,
      engagement: baseEngagement + Math.random() * 2 - 1,
      posts: Math.floor(Math.random() * 3),
      reach: Math.floor(50000 + Math.random() * 20000)
    })),
    engagement: Array.from({ length: days }, (_, i) => ({
      date: format(subDays(new Date(), days - i - 1), 'MMM dd'),
      likes: Math.floor(1200 + Math.random() * 400),
      comments: Math.floor(80 + Math.random() * 40),
      shares: Math.floor(20 + Math.random() * 15),
      saves: Math.floor(150 + Math.random() * 100)
    }))
  }
}

// Mock campaigns data
export const mockCampaigns = [
  {
    id: 1,
    title: 'Summer Fitness Collection Launch',
    brand: 'Nike',
    description: 'Promote our new summer fitness collection with authentic workout content and lifestyle posts.',
    budget: '$5,000 - $10,000',
    category: 'Fitness',
    requirements: [
      'Minimum 10K Instagram followers',
      'Fitness/lifestyle content focus',
      '3 posts + 5 stories',
      'Must include #NikeSummer hashtag'
    ],
    deadline: addDays(new Date(), 30),
    status: 'active',
    applicants: 23,
    image: null,
    tags: ['Fitness', 'Lifestyle', 'Summer'],
    deliverables: [
      '1 Instagram feed post',
      '2 Instagram Reels',
      '5 Instagram Stories',
      '1 TikTok video'
    ],
    timeline: '2 weeks',
    targetAudience: 'Women 18-35 interested in fitness and wellness'
  },
  {
    id: 2,
    title: 'Sustainable Fashion Awareness',
    brand: 'Patagonia',
    description: 'Create content around sustainable fashion practices and environmental consciousness.',
    budget: '$3,000 - $7,000',
    category: 'Fashion',
    requirements: [
      'Minimum 5K followers',
      'Sustainability focus',
      'Authentic storytelling',
      'Must align with brand values'
    ],
    deadline: addDays(new Date(), 45),
    status: 'active',
    applicants: 18,
    image: null,
    tags: ['Sustainability', 'Fashion', 'Environment'],
    deliverables: [
      '2 Instagram feed posts',
      '1 IGTV video',
      '3 Instagram Stories',
      'Blog post (optional)'
    ],
    timeline: '3 weeks',
    targetAudience: 'Environmentally conscious consumers 25-45'
  },
  {
    id: 3,
    title: 'Tech Product Review Campaign',
    brand: 'Apple',
    description: 'Review and showcase the latest iPhone features through creative content.',
    budget: '$8,000 - $15,000',
    category: 'Technology',
    requirements: [
      'Minimum 50K followers',
      'Tech content experience',
      'High-quality video production',
      'Professional photography'
    ],
    deadline: addDays(new Date(), 21),
    status: 'active',
    applicants: 45,
    image: null,
    tags: ['Technology', 'Review', 'iPhone'],
    deliverables: [
      '1 Unboxing video',
      '1 Feature review video',
      '3 Instagram posts',
      '10 Instagram Stories'
    ],
    timeline: '10 days',
    targetAudience: 'Tech enthusiasts and early adopters'
  }
]

// Mock proposals data
export const mockProposals = [
  {
    id: 1,
    campaignId: 1,
    influencerId: 1,
    influencerName: 'Sarah Johnson',
    message: 'I\'d love to collaborate on this campaign! My audience is very engaged with fitness content and I have experience with similar brand partnerships.',
    proposedRate: '$7,500',
    status: 'pending',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    portfolio: [
      {
        type: 'instagram_post',
        url: 'https://instagram.com/p/example1',
        metrics: { likes: 1340, comments: 95 }
      },
      {
        type: 'instagram_reel',
        url: 'https://instagram.com/reel/example1',
        metrics: { likes: 2100, comments: 156, shares: 89 }
      }
    ]
  },
  {
    id: 2,
    campaignId: 1,
    influencerId: 3,
    influencerName: 'Mike Chen',
    message: 'This campaign aligns perfectly with my fitness journey content. I can provide high-quality workout videos and authentic testimonials.',
    proposedRate: '$6,000',
    status: 'accepted',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    portfolio: [
      {
        type: 'youtube_video',
        url: 'https://youtube.com/watch?v=example1',
        metrics: { views: 15000, likes: 890, comments: 234 }
      }
    ]
  }
]

// Mock conversations data
export const mockConversations = [
  {
    id: 1,
    participant: {
      id: 2,
      name: 'Nike Brand Team',
      role: 'brand',
      avatar: null,
      lastSeen: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isOnline: true
    },
    lastMessage: {
      text: 'Looking forward to seeing your creative ideas for the campaign!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      senderId: 2
    },
    unreadCount: 2,
    campaignId: 1
  },
  {
    id: 2,
    participant: {
      id: 4,
      name: 'Patagonia Marketing',
      role: 'brand',
      avatar: null,
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isOnline: false
    },
    lastMessage: {
      text: 'Can we schedule a call to discuss the sustainability angle?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      senderId: 4
    },
    unreadCount: 0,
    campaignId: 2
  }
]

// Mock messages data
export const mockMessages = {
  1: [
    {
      id: 1,
      text: 'Hi! I saw your campaign and I\'m really interested in collaborating.',
      senderId: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'delivered'
    },
    {
      id: 2,
      text: 'That\'s great! Your content style aligns perfectly with our brand values.',
      senderId: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      status: 'delivered'
    },
    {
      id: 3,
      text: 'I have some creative ideas for the campaign. Would you like to hear them?',
      senderId: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
      status: 'delivered'
    },
    {
      id: 4,
      text: 'Absolutely! I\'d love to hear your ideas. Could you share some examples of your previous fitness content?',
      senderId: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21),
      status: 'delivered'
    },
    {
      id: 5,
      text: 'Sure! I\'ll send you some links to my recent workout posts and reels.',
      senderId: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
      status: 'delivered'
    },
    {
      id: 6,
      text: 'Looking forward to seeing them! Also, what\'s your typical timeline for content creation?',
      senderId: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'delivered'
    },
    {
      id: 7,
      text: 'I usually need about 1-2 weeks for high-quality content creation, including planning, shooting, and editing.',
      senderId: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'delivered'
    },
    {
      id: 8,
      text: 'Perfect! That works well with our campaign timeline.',
      senderId: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      status: 'delivered'
    },
    {
      id: 9,
      text: 'Looking forward to collaborating!',
      senderId: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'delivered'
    }
  ],
  2: [
    {
      id: 10,
      text: 'Hello! I\'m interested in your sustainability campaign.',
      senderId: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      status: 'delivered'
    },
    {
      id: 11,
      text: 'Hi Sarah! We\'d love to work with you. Your content really resonates with our values.',
      senderId: 4,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: 'delivered'
    },
    {
      id: 12,
      text: 'Can we schedule a call to discuss the sustainability angle?',
      senderId: 4,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'delivered'
    }
  ]
}

// Mock search results
export const mockInfluencers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    bio: 'Fashion & lifestyle influencer | Sustainable living advocate | NYC',
    followers: 15420,
    engagementRate: 8.6,
    categories: ['Fashion', 'Lifestyle', 'Sustainability'],
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    location: 'New York, NY',
    avatar: null,
    verified: true,
    recentPosts: 3,
    avgLikes: 1240
  },
  {
    id: 3,
    name: 'Mike Chen',
    username: '@mikechen_fit',
    bio: 'Fitness coach | Nutrition expert | Helping you reach your goals 💪',
    followers: 28900,
    engagementRate: 7.2,
    categories: ['Fitness', 'Health', 'Nutrition'],
    platforms: ['Instagram', 'YouTube', 'TikTok'],
    location: 'Los Angeles, CA',
    avatar: null,
    verified: true,
    recentPosts: 5,
    avgLikes: 2100
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    username: '@emmaeats',
    bio: 'Food blogger | Recipe creator | Making healthy eating fun 🥗',
    followers: 45600,
    engagementRate: 9.1,
    categories: ['Food', 'Health', 'Lifestyle'],
    platforms: ['Instagram', 'YouTube', 'Pinterest'],
    location: 'Austin, TX',
    avatar: null,
    verified: true,
    recentPosts: 4,
    avgLikes: 3200
  },
  {
    id: 6,
    name: 'Alex Thompson',
    username: '@alextech',
    bio: 'Tech reviewer | Gadget enthusiast | Latest tech trends & reviews',
    followers: 67800,
    engagementRate: 6.8,
    categories: ['Technology', 'Reviews', 'Gaming'],
    platforms: ['YouTube', 'Instagram', 'Twitter'],
    location: 'San Francisco, CA',
    avatar: null,
    verified: true,
    recentPosts: 2,
    avgLikes: 4500
  }
]

// Categories for filtering
export const categories = [
  'Fashion',
  'Lifestyle',
  'Fitness',
  'Health',
  'Technology',
  'Food',
  'Travel',
  'Beauty',
  'Gaming',
  'Music',
  'Art',
  'Photography',
  'Business',
  'Education',
  'Entertainment',
  'Sports',
  'Sustainability',
  'Parenting',
  'DIY',
  'Home'
]

// Platform options
export const platforms = [
  'Instagram',
  'TikTok',
  'YouTube',
  'Twitter',
  'Pinterest',
  'LinkedIn',
  'Snapchat',
  'Twitch'
]

export default {
  mockUsers,
  generateInstagramData,
  mockCampaigns,
  mockProposals,
  mockConversations,
  mockMessages,
  mockInfluencers,
  categories,
  platforms
}