import { io } from 'socket.io-client'

class WebSocketManager {
  constructor() {
    this.socket = null
    this.isConnected = false
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000
    this.messageHandlers = new Map()
    this.connectionHandlers = []
  }

  connect(userId, token) {
    if (this.socket) {
      this.disconnect()
    }

    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'ws://localhost:3001'
    
    this.socket = io(socketUrl, {
      auth: {
        token,
        userId
      },
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    })

    this.setupEventHandlers()
  }

  setupEventHandlers() {
    if (!this.socket) return

    this.socket.on('connect', () => {
      console.log('WebSocket connected')
      this.isConnected = true
      this.reconnectAttempts = 0
      this.notifyConnectionHandlers('connected')
    })

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason)
      this.isConnected = false
      this.notifyConnectionHandlers('disconnected')
      
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, don't reconnect
        return
      }
      
      this.handleReconnection()
    })

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
      this.isConnected = false
      this.notifyConnectionHandlers('error', error)
      this.handleReconnection()
    })

    // Message events
    this.socket.on('new_message', (data) => {
      this.handleMessage('new_message', data)
    })

    this.socket.on('message_delivered', (data) => {
      this.handleMessage('message_delivered', data)
    })

    this.socket.on('message_read', (data) => {
      this.handleMessage('message_read', data)
    })

    this.socket.on('user_typing', (data) => {
      this.handleMessage('user_typing', data)
    })

    this.socket.on('user_online', (data) => {
      this.handleMessage('user_online', data)
    })

    this.socket.on('user_offline', (data) => {
      this.handleMessage('user_offline', data)
    })
  }

  handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      this.notifyConnectionHandlers('max_reconnect_attempts')
      return
    }

    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`)
    
    setTimeout(() => {
      if (this.socket) {
        this.socket.connect()
      }
    }, delay)
  }

  handleMessage(event, data) {
    const handlers = this.messageHandlers.get(event) || []
    handlers.forEach(handler => {
      try {
        handler(data)
      } catch (error) {
        console.error(`Error in message handler for ${event}:`, error)
      }
    })
  }

  notifyConnectionHandlers(status, data = null) {
    this.connectionHandlers.forEach(handler => {
      try {
        handler(status, data)
      } catch (error) {
        console.error('Error in connection handler:', error)
      }
    })
  }

  // Public methods
  sendMessage(conversationId, message) {
    if (!this.isConnected || !this.socket) {
      throw new Error('WebSocket not connected')
    }

    return new Promise((resolve, reject) => {
      this.socket.emit('send_message', {
        conversationId,
        text: message,
        timestamp: new Date().toISOString()
      }, (response) => {
        if (response.success) {
          resolve(response.data)
        } else {
          reject(new Error(response.error))
        }
      })
    })
  }

  joinConversation(conversationId) {
    if (!this.isConnected || !this.socket) {
      console.warn('Cannot join conversation: WebSocket not connected')
      return
    }

    this.socket.emit('join_conversation', { conversationId })
  }

  leaveConversation(conversationId) {
    if (!this.isConnected || !this.socket) {
      return
    }

    this.socket.emit('leave_conversation', { conversationId })
  }

  markMessageAsRead(messageId) {
    if (!this.isConnected || !this.socket) {
      return
    }

    this.socket.emit('mark_read', { messageId })
  }

  sendTypingIndicator(conversationId, isTyping) {
    if (!this.isConnected || !this.socket) {
      return
    }

    this.socket.emit('typing', { conversationId, isTyping })
  }

  // Event subscription methods
  onMessage(event, handler) {
    if (!this.messageHandlers.has(event)) {
      this.messageHandlers.set(event, [])
    }
    this.messageHandlers.get(event).push(handler)

    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(event) || []
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  onConnection(handler) {
    this.connectionHandlers.push(handler)

    // Return unsubscribe function
    return () => {
      const index = this.connectionHandlers.indexOf(handler)
      if (index > -1) {
        this.connectionHandlers.splice(index, 1)
      }
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
    this.isConnected = false
    this.reconnectAttempts = 0
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      socket: this.socket
    }
  }
}

// Create singleton instance
const websocketManager = new WebSocketManager()

export default websocketManager

// React hook for using WebSocket in components
export const useWebSocket = () => {
  return websocketManager
}