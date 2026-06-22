import { StyleSheet, Text, View, Image } from 'react-native'
import Logo from '../assets/img/logo.png'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />
      <Text style={styles.title}>Easy Livin</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#376EBD',
    alignItems: 'center',

    justifyContent: 'center',
    paddingBottom: 60, 
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: -30,
  },
  img: {
    marginVertical: 0,
  },
})
