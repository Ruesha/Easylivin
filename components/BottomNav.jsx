import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter, usePathname } from 'expo-router'

const NAVY = '#16263A'
const ACCENT = '#3B6FE0'

const TABS = [
  { key: 'home', icon: 'home', path: '/home' },
  { key: 'chat', icon: 'message-circle', path: '/chat' },
  { key: 'favorite', icon: 'heart', path: '/favorites' },
  { key: 'map', icon: 'map', path: '/map' },
  { key: 'profile', icon: 'user', path: '/profile' },
]

const BottomNav = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <View style={styles.bottomNav}>
      {TABS.map((tab) => {
        const active = pathname === tab.path
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => router.push(tab.path)}
            style={[styles.navItem, active && styles.navItemActive]}
          >
            <Feather
              name={tab.icon}
              size={20}
              color={active ? '#fff' : 'rgba(255,255,255,0.6)'}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    height: 64,
    borderRadius: 32,
    backgroundColor: NAVY,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  navItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: ACCENT,
  },
})

export default BottomNav