import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../../store/authStore'
import { 
  Send, 
  User, 
  Search, 
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile
} from 'lucide-react'
import { format } from 'date-fns'

const Messages = () => {
  const { user } = useAuthStore()
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)
  const pollingInterval = useRef(null)

  // Mock conversations data
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        participant: {
          id: 2,
          name: user?.role === 'influencer' ? 'Nike Brand Team' : 'Sarah Johnson',
          role: user?.role === 'influencer' ? 'brand' : 'influencer',
          avatar: null,
          lastSeen: new Date()
        },
        lastMessage: {
          text: 'Looking forward to collaborating!',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          senderId: 2
        },
        unreadCount: 2
      },
      {
        id: 2,
        participant: {
          id: 3,
          name: user?.role === 'influencer' ? 'Adidas Marketing' : 'Mike Chen',
          role: user?.role === 'influencer' ? 'brand' : 'influencer',
          avatar: null,
          lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2)
        },
        lastMessage: {
          text: 'Can we discuss the campaign details?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          senderId: 3
        },
        unreadCount: 0
      }
    ]

    setTimeout(() => {
      setConversations(mockConversations)
      setActiveConversation(mockConversations[0])
      setIsLoading(false)
    }, 500)
  }, [user?.role])

  // Load messages for active conversation
  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation.id)
      startPolling(activeConversation.id)
    }

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    }
  }, [activeConversation])

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async (conversationId) => {
    // Mock messages data
    const mockMessages = [
      {
        id: 1,
        text: 'Hi! I saw your campaign and I\'m really interested in collaborating.',
        senderId: user?.role === 'influencer' ? user.id : activeConversation.participant.id,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: 'delivered'
      },
      {
        id: 2,
        text: 'That\'s great! Your content style aligns perfectly with our brand values.',
        senderId: user?.role === 'influencer' ? activeConversation.participant.id : user.id,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
        status: 'delivered'
      },
      {
        id: 3,
        text: 'I have some creative ideas for the campaign. Would you like to hear them?',
        senderId: user?.role === 'influencer' ? user.id : activeConversation.participant.id,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
        status: 'delivered'
      },
      {
        id: 4,
        text: 'Absolutely! I\'d love to hear your ideas.',
        senderId: user?.role === 'influencer' ? activeConversation.participant.id : user.id,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21),
        status: 'delivered'
      },
      {
        id: 5,
        text: 'Looking forward to collaborating!',
        senderId: user?.role === 'influencer' ? activeConversation.participant.id : user.id,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: 'delivered'
      }
    ]

    setMessages(mockMessages)
  }

  const startPolling = (conversationId) => {
    // Poll for new messages every 3 seconds
    pollingInterval.current = setInterval(() => {
      // In a real app, this would make an API call
      // GET /chats/:id/messages
      console.log(`Polling for new messages in conversation ${conversationId}`)
    }, 3000)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    const messageText = newMessage.trim()
    setIsSending(true)

    // Optimistic UI - show message immediately
    const optimisticMessage = {
      id: Date.now(),
      text: messageText,
      senderId: user.id,
      timestamp: new Date(),
      status: 'sending'
    }

    setMessages(prev => [...prev, optimisticMessage])
    setNewMessage('')

    try {
      // Simulate API call - POST /chats/:id/messages
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update message status to delivered
      setMessages(prev => 
        prev.map(msg => 
          msg.id === optimisticMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      )

      // Update last message in conversation
      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversation.id
            ? {
                ...conv,
                lastMessage: {
                  text: messageText,
                  timestamp: new Date(),
                  senderId: user.id
                }
              }
            : conv
        )
      )
    } catch (error) {
      // Handle error - mark message as failed
      setMessages(prev =>
        prev.map(msg =>
          msg.id === optimisticMessage.id
            ? { ...msg, status: 'failed' }
            : msg
        )
      )
    } finally {
      setIsSending(false)
    }
  }

  const retryMessage = (messageId) => {
    // Retry failed message
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, status: 'sending' }
          : msg
      )
    )
    // Simulate retry logic here
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Conversations Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setActiveConversation(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  activeConversation?.id === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    {conversation.participant.lastSeen > new Date(Date.now() - 1000 * 60 * 5) && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.participant.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(conversation.lastMessage.timestamp, 'HH:mm')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage.text}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {activeConversation.participant.name}
                      </h2>
                      <p className="text-sm text-gray-500 capitalize">
                        {activeConversation.participant.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${
                          message.senderId === user.id ? 'text-primary-200' : 'text-gray-500'
                        }`}>
                          {format(message.timestamp, 'HH:mm')}
                        </p>
                        {message.senderId === user.id && (
                          <span className={`text-xs ml-2 ${
                            message.status === 'sending' ? 'text-primary-200' :
                            message.status === 'delivered' ? 'text-primary-200' :
                            'text-red-300'
                          }`}>
                            {message.status === 'sending' ? '⏳' :
                             message.status === 'delivered' ? '✓' :
                             message.status === 'failed' ? (
                               <button onClick={() => retryMessage(message.id)} className="hover:underline">
                                 ❌ Retry
                               </button>
                             ) : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={isSending}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Smile className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || isSending}
                    className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages