import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { PROPERTIES, FACILITY_ICONS } from '../../data/properties'
import { useFavorites } from '../../context/FavoritesContext'
import { useChat } from '../../context/ChatContext'

const { width } = Dimensions.get('window')
const NAVY = '#16263A'
const ACCENT = '#3B6FE0'

const PropertyDetail = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const { isFavorite, toggleFavorite } = useFavorites()
const { getOrCreateConversation } = useChat()
  const property = PROPERTIES.find((p) => p.id === id)

  if (!property) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ padding: 20 }}>Property not found.</Text>
      </SafeAreaView>
    )
  }

  const favorited = isFavorite(property.id)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main image with overlay controls */}
        <View>
          <Image
            source={{ uri: property.images[activeImage] }}
            style={styles.mainImage}
          />

          <View style={styles.topRow}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} color={NAVY} />
            </TouchableOpacity>

            <View style={styles.topRowRight}>
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="share-2" size={18} color={NAVY} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => toggleFavorite(property.id)}
              >
                <Feather name="heart" size={18} color={favorited ? '#D4537E' : NAVY} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {activeImage + 1} / {property.images.length}
            </Text>
          </View>
        </View>

        {/* Thumbnail row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbRow}
        >
          {property.images.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => setActiveImage(index)}>
              <Image
                source={{ uri: img }}
                style={[styles.thumb, activeImage === index && styles.thumbActive]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.content}>
          <Text style={styles.title}>{property.name}</Text>

          <View style={styles.addressRow}>
            <Feather name="map-pin" size={14} color="#8A94A6" />
            <Text style={styles.address}>
              {property.fullAddress || property.address}
            </Text>
          </View>

          {/* Highlighted price card */}
          <View style={styles.priceCard}>
            <Text style={styles.nairaSign}>₦</Text>
            <Text style={styles.price}>{property.price}</Text>
            <Text style={styles.perMonth}>per month</Text>
          </View>

          {property.description ? (
            <>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.description}>{property.description}</Text>
            </>
          ) : null}

          {property.facilities ? (
            <>
              <Text style={styles.sectionTitle}>Facilities</Text>
              <View style={styles.facilitiesGrid}>
                {property.facilities.map((facility, index) => (
                  <View key={index} style={styles.facilityCard}>
                    <Feather name={FACILITY_ICONS[facility] || 'check'} size={16} color={NAVY} />
                    <Text style={styles.facilityText}>{facility}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.contactButton}
        onPress={() =>{
          const conversationId = getOrCreateConversation(property.id)
          router.push(`/chat/${conversationId}`)
        }}>
          <Text style={styles.contactButtonText}>Contact Agent</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  mainImage: { width, height: 320 },
  topRow: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRowRight: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCounterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  thumbRow: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 10,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    opacity: 0.6,
  },
  thumbActive: {
    opacity: 1,
    borderWidth: 2,
    borderColor: ACCENT,
  },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: '700', color: NAVY, marginBottom: 8 },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  address: { fontSize: 14, color: '#8A94A6' },
  priceCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    backgroundColor: '#EEF3FC',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  nairaSign: { fontSize: 16, fontWeight: '700', color: '#185FA5' },
  price: { fontSize: 20, fontWeight: '700', color: '#042C53' },
  perMonth: { fontSize: 13, color: '#185FA5', marginLeft: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginTop: 16,
    marginBottom: 10,
  },
  description: { fontSize: 14, color: '#5C6779', lineHeight: 20 },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  facilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F3F8',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    width: '47%',
  },
  facilityText: { fontSize: 12, color: NAVY, fontWeight: '500' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
  },
  contactButton: {
    backgroundColor: NAVY,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  contactButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
})

export default PropertyDetail