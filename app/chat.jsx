import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useChat } from '../context/ChatContext'
import { AGENTS } from '../data/agents'
import { PROPERTIES } from '../data/properties'
import BottomNav from '../components/BottomNav'

const NAVY = '#16263A'

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const ChatList = () => {
  const router = useRouter()
  const { conversations, loaded } = useChat()
  const [searchQuery, setSearchQuery] = useState('')

  const sorted = [...conversations].sort((a, b) => b.lastTimestamp - a.lastTimestamp)

  const filtered = searchQuery.trim()
    ? sorted.filter((conv) => {
        const agent = AGENTS.find((a) => a.id === conv.agentId)
        const property = PROPERTIES.find((p) => p.id === conv.propertyId)
        const q = searchQuery.toLowerCase()
        return (
          agent?.name?.toLowerCase().includes(q) ||
          property?.name?.toLowerCase().includes(q) ||
          conv.lastMessage?.toLowerCase().includes(q)
        )
      })
    : sorted

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* ── SEARCH BAR ── */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={16} color="#8A94A6" style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search conversations…"
          placeholderTextColor="#8A94A6"
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={16} color="#8A94A6" />
          </TouchableOpacity>
        )}
      </View>

      {/* ── LIST / EMPTY STATES ── */}
      {loaded && sorted.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="message-circle" size={40} color="#D7DCE5" />
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptyText}>
            Tap "Contact Agent" on a property to start chatting.
          </Text>
        </View>
      ) : loaded && filtered.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="search" size={40} color="#D7DCE5" />
          <Text style={styles.emptyTitle}>No results</Text>
          <Text style={styles.emptyText}>
            No conversations match "{searchQuery}"
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map((conv) => {
            const agent = AGENTS.find((a) => a.id === conv.agentId)
            const property = PROPERTIES.find((p) => p.id === conv.propertyId)
            return (
              <TouchableOpacity
                key={conv.id}
                style={styles.row}
                activeOpacity={0.7}
                onPress={() => router.push(`/chat/${conv.id}`)}
              >
                <Image source={{ uri: agent?.avatar }} style={styles.avatar} />
                <View style={styles.rowBody}>
                  <View style={styles.rowTop}>
                    <Text style={styles.agentName}>{agent?.name || 'Agent'}</Text>
                    <Text style={styles.time}>{formatTime(conv.lastTimestamp)}</Text>
                  </View>
                  <Text style={styles.propertyName}>{property?.name}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {conv.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      )}

      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F7FA' },

  header: {
     paddingHorizontal: 20,
      paddingTop: 12, 
      paddingBottom: 8 ,
      marginTop: 30
    },
  headerTitle: { fontSize: 26, fontWeight: '700', color: NAVY },

  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: { marginRight: 2 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: NAVY,
    paddingVertical: 0,
  },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 110, paddingTop: 8 },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 10,
  },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: NAVY, marginTop: 8 },
  emptyText: { fontSize: 13, color: '#8A94A6', textAlign: 'center', lineHeight: 19 },

  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  rowBody: { flex: 1, justifyContent: 'center' },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  agentName: { fontSize: 15, fontWeight: '700', color: NAVY },
  time: { fontSize: 12, color: '#8A94A6' },
  propertyName: { fontSize: 13, color: '#3B6FE0', marginBottom: 2 },
  lastMessage: { fontSize: 13, color: '#8A94A6' },
})

export default ChatList