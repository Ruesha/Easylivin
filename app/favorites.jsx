import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { PROPERTIES } from '../data/properties'
import { useFavorites } from '../context/FavoritesContext'
import BottomNav from '../components/BottomNav'

const NAVY = '#16263A'
const ACCENT = '#3B6FE0'

const Favorites = () => {
  const router = useRouter()
  const { favoriteIds, toggleFavorite } = useFavorites()

  const favoriteProperties = PROPERTIES.filter((p) => favoriteIds.includes(p.id))

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={22} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 38 }} />
      </View>

      {favoriteProperties.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="heart" size={40} color="#D7DCE5" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart icon on any property to save it here.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {favoriteProperties.map((property) => (
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
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => toggleFavorite(property.id)}
              >
                <Feather name="heart" size={18} color="#D4537E" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F7FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    marginTop: 30,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: NAVY },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40, gap: 18 },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 10,
  },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: NAVY, marginTop: 8 },
  emptyText: { fontSize: 13, color: '#8A94A6', textAlign: 'center', lineHeight: 19 },
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
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: NAVY, marginBottom: 10 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  nairaSign: { fontSize: 16, fontWeight: '700', color: ACCENT, marginRight: 4 },
  price: { fontSize: 18, fontWeight: '700', color: NAVY },
  perMonth: { fontSize: 14, color: '#8A94A6' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  address: { fontSize: 13, color: '#8A94A6' },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Favorites