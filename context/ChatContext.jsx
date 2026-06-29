import { createContext, useContext, useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PROPERTIES } from '../data/properties'

const STORAGE_KEY = 'chat_conversations_v1'
const ChatContext = createContext(null)

const AUTO_REPLIES = [
  "Thanks for reaching out! Yes, it's still available.",
  'I can arrange a viewing this week if you are interested.',
  'The price is slightly negotiable depending on lease length.',
  "I'll send more details shortly.",
]

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([])
  const [loaded, setLoaded] = useState(false)
  const replyTimers = useRef({})

  useEffect(() => {
    ;(async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY)
        if (raw) setConversations(JSON.parse(raw))
      } catch (e) {
        console.log('Failed to load conversations', e)
      } finally {
        setLoaded(true)
      }
    })()
  }, [])

  useEffect(() => {
    if (!loaded) return
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversations)).catch((e) =>
      console.log('Failed to save conversations', e)
    )
  }, [conversations, loaded])

  const getOrCreateConversation = (propertyId) => {
    const existing = conversations.find((c) => c.propertyId === propertyId)
    if (existing) return existing.id

    const property = PROPERTIES.find((p) => p.id === propertyId)
    const newId = `conv_${propertyId}_${Date.now()}`
    const welcomeText = `Hi! Thanks for your interest in ${property?.name || 'this property'}. How can I help?`

    const newConversation = {
      id: newId,
      propertyId,
      agentId: property?.agentId,
      lastMessage: welcomeText,
      lastTimestamp: Date.now(),
      messages: [
        {
          id: `m_${Date.now()}`,
          sender: 'agent',
          text: welcomeText,
          timestamp: Date.now(),
          status: 'delivered', // agent messages are always delivered
        },
      ],
    }

    setConversations((prev) => [newConversation, ...prev])
    return newId
  }

  const sendMessage = (conversationId, text) => {
    if (!text.trim()) return

    const now = Date.now()
    const msgId = `m_${now}`

    // Add message with status 'sent'
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text,
              lastTimestamp: now,
              messages: [
                ...c.messages,
                {
                  id: msgId,
                  sender: 'me',
                  text,
                  timestamp: now,
                  status: 'sent',       // ← single tick
                },
              ],
            }
          : c
      )
    )

    if (replyTimers.current[conversationId]) {
      clearTimeout(replyTimers.current[conversationId])
    }

    // After 600ms flip the sent message to 'delivered'
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === msgId ? { ...m, status: 'delivered' } : m  // ← double tick
                ),
              }
            : c
        )
      )
    }, 600)

    // After 1200ms send the auto-reply
    replyTimers.current[conversationId] = setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]
      const replyTime = Date.now()
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: reply,
                lastTimestamp: replyTime,
                messages: [
                  ...c.messages,
                  {
                    id: `m_${replyTime}`,
                    sender: 'agent',
                    text: reply,
                    timestamp: replyTime,
                    status: 'delivered', // agent messages always delivered
                  },
                ],
              }
            : c
        )
      )
    }, 1200)
  }

  const getConversation = (conversationId) =>
    conversations.find((c) => c.id === conversationId)

  return (
    <ChatContext.Provider
      value={{ conversations, loaded, getOrCreateConversation, sendMessage, getConversation }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}