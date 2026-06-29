import { useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useChat } from '../../context/ChatContext'
import { AGENTS } from '../../data/agents'
import { PROPERTIES } from '../../data/properties'

const NAVY = '#16263A'
const ACCENT = '#3B6FE0'

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const d = new Date(timestamp)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

const Ticks = ({ status }) => {
  if (status === 'delivered') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="checkmark" size={13} color="rgba(255,255,255,0.75)" />
        <Ionicons name="checkmark" size={13} color="rgba(255,255,255,0.75)" style={{ marginLeft: -6 }} />
      </View>
    )
  }
  return <Ionicons name="checkmark" size={13} color="rgba(255,255,255,0.75)" />
}

const ChatThread = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { getConversation, sendMessage } = useChat()
  const [text, setText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const scrollRef = useRef(null)

  const conversation = getConversation(id)

  if (!conversation) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ padding: 20 }}>Conversation not found.</Text>
      </SafeAreaView>
    )
  }

  const agent = AGENTS.find((a) => a.id === conversation.agentId)
  const property = PROPERTIES.find((p) => p.id === conversation.propertyId)

  const handleSend = () => {
    if (!text.trim()) return
    sendMessage(conversation.id, text.trim())
    setText('')
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
  }

  const filteredMessages = searchQuery.trim()
    ? conversation.messages.filter((m) =>
        m.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversation.messages

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── HEADER ── */}
      {searchOpen ? (
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => { setSearchOpen(false); setSearchQuery('') }}
            style={styles.iconButton}
          >
            <Ionicons name="arrow-back" size={22} color={NAVY} />
          </TouchableOpacity>

          <TextInput
            autoFocus
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search messages…"
            placeholderTextColor="#8A94A6"
            style={styles.searchInput}
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.iconButton}>
              <Ionicons name="close" size={20} color={NAVY} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.header}>
          {/* Left: back button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={22} color={NAVY} />
          </TouchableOpacity>

          {/* Avatar */}
          <Image source={{ uri: agent?.avatar }} style={styles.headerAvatar} />

          {/* Middle: name + property — flex:1 pushes search to right */}
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerName} numberOfLines={1}>
              {agent?.name || 'Agent'}
            </Text>
            <Text style={styles.headerProperty} numberOfLines={1}>
              {property?.name}
            </Text>
          </View>

          {/* Right: search icon */}
          <TouchableOpacity
            onPress={() => setSearchOpen(true)}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="search" size={20} color={NAVY} />
          </TouchableOpacity>
        </View>
      )}

      {/* ── SEARCH RESULT COUNT ── */}
      {searchOpen && searchQuery.trim().length > 0 && (
        <View style={styles.searchResultBar}>
          <Text style={styles.searchResultText}>
            {filteredMessages.length} result{filteredMessages.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* ── MESSAGES + INPUT ── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {filteredMessages.map((msg) => {
            const isMe = msg.sender === 'me'
            return (
              <View
                key={msg.id}
                style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleAgent]}
              >
                <Text style={[styles.bubbleText, isMe ? styles.bubbleTextMe : styles.bubbleTextAgent]}>
                  {msg.text}
                </Text>
                <View style={[styles.metaRow, isMe ? styles.metaRowMe : styles.metaRowAgent]}>
                  <Text style={[styles.timestamp, isMe ? styles.timestampMe : styles.timestampAgent]}>
                    {formatTime(msg.timestamp)}
                  </Text>
                  {isMe && <Ticks status={msg.status} />}
                </View>
              </View>
            )
          })}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message"
            placeholderTextColor="#8A94A6"
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Feather name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F4',
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 8,
  },

  // flex:1 here is the key — pushes the search icon to the far right
  headerTextWrap: {
    flex: 1,
    marginRight: 4,
  },

  headerName: { fontSize: 15, fontWeight: '700', color: NAVY },
  headerProperty: { fontSize: 12, color: '#8A94A6' },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: NAVY,
    paddingVertical: 6,
    marginHorizontal: 8,
  },

  searchResultBar: {
    backgroundColor: '#F6F7FA',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F4',
  },
  searchResultText: { fontSize: 12, color: '#8A94A6' },

  messagesContainer: { padding: 16, gap: 10 },

  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 6,
    borderRadius: 16,
  },
  bubbleAgent: {
    backgroundColor: '#F0F3F8',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  bubbleMe: {
    backgroundColor: ACCENT,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  bubbleText: { fontSize: 14, lineHeight: 19 },
  bubbleTextAgent: { color: NAVY },
  bubbleTextMe: { color: '#fff' },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 3,
  },
  metaRowMe: { justifyContent: 'flex-end' },
  metaRowAgent: { justifyContent: 'flex-start' },

  timestamp: { fontSize: 10 },
  timestampMe: { color: 'rgba(255,255,255,0.65)' },
  timestampAgent: { color: '#8A94A6' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F1F4',
  },
  input: {
    flex: 1,
    backgroundColor: '#F6F7FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: NAVY,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: NAVY,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ChatThread