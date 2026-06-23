import { StyleSheet, Text, View, ImageBackground, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { useFonts, Borel_400Regular } from '@expo-google-fonts/borel'

const { width, height } = Dimensions.get('window')

const slides = [
  { id: 1, title: "Find homes easily", image: require('../assets/img/screenone.jpeg') },
  { id: 2, title: "Affordable prices", image: require('../assets/img/screentwo.jpeg') },
  { id: 3, title: "Verified landlords", image: require('../assets/img/screenthree.jpeg') },
  { id: 4, title: "Zero agent stress", image: require('../assets/img/screenfour.jpeg') },
  { id: 5, title: "Welcome to Easy Livin", image: require('../assets/img/screenfive.jpeg') },
]

const Scroll = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()
  const flatListRef = useRef(null)

  const [fontsLoaded] = useFonts({ Borel_400Regular })

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#376EBD" />
      </View>
    )
  }

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrentIndex(index)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ImageBackground source={item.image} style={styles.background}>
            <View style={styles.overlay} />

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>

              {item.id === slides.length && (
                <View style={styles.btnContainer}>
                  <TouchableOpacity style={styles.btn} onPress={() => router.push('/signin')}>
                    <Text style={styles.btnText}>Sign In</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.btn, styles.btnLight]} onPress={() => router.push('/signup')}>
                    <Text style={[styles.btnText, { color: '#ffffff' }]}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ImageBackground>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  )
}

export default Scroll

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: { flex: 1 },
  background: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    position: 'absolute',
    top: '20%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Borel_400Regular',
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  btnContainer: {
  marginTop: 500,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
},
  btn: {
    backgroundColor: '#376EBD',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '45%',
    alignItems: 'center',
  },
  btnLight: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    color: 'white',
  },
  btnText: {
    fontWeight: '700',
    color: '#fdfdfd',
    fontSize: 26,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#c0c0c0',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#376EBD',
  },
})