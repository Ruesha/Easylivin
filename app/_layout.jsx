import { View } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'
import { FavoritesProvider } from '../context/FavoritesContext'
import { ChatProvider } from '../context/ChatContext'

const RootLayout = () => {
  return (
    <FavoritesProvider>
      <ChatProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      </ChatProvider>
    </FavoritesProvider>
  )
}

export default RootLayout