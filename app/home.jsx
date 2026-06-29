import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import profile from '../assets/img/profile.avif'
import { PROPERTIES } from '../data/properties'
import BottomNav from '../components/BottomNav'

const CATEGORIES = ['All', 'House', 'Apartment', 'Manor']

const Home = () => {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('House')

  const filtered =
    activeCategory === 'All'
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.category === activeCategory)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Image source={profile} style={styles.avatar} />
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="search" size={20} color="#1B2B3A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>Hi Doe!</Text>

        {/* Category pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[styles.pill, active && styles.pillActive]}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Property cards */}
        <View style={styles.cardList}>
          {filtered.map((property) => (
            <TouchableOpacity
              key={property.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push(`/property/${property.id}`)}
            >
              <Image source={{ uri: property.images[0] }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{property.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.nairaSign}>₦</Text>
                  <Text style={styles.price}>{property.price}</Text>
                  <Text style={styles.perMonth}> per month</Text>
                </View>
                <View style={styles.addressRow}>
                  <Feather name="map-pin" size={14} color="#8A94A6" />
                  <Text style={styles.address}>{property.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  )
}

const NAVY = '#16263A'
const ACCENT = '#3B6FE0'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7FA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 30,
    fontWeight: '700',
    color: '#16263A',
    marginTop: 18,
    marginBottom: 18,
  },
  categoryRow: {
    gap: 10,
    paddingRight: 8,
    marginBottom: 22,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D7DCE5',
    backgroundColor: '#fff',
  },
  pillActive: {
    backgroundColor: NAVY,
    borderColor: NAVY,
  },
  pillText: {
    color: '#8A94A6',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#fff',
  },
  cardList: {
    gap: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#16263A',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  nairaSign: {
    fontSize: 16,
    fontWeight: '700',
    color: ACCENT,
    marginRight: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#16263A',
  },
  perMonth: {
    fontSize: 14,
    color: '#8A94A6',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  address: {
    fontSize: 13,
    color: '#8A94A6',
  },
})

export default Home