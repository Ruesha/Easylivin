import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([])

  const isFavorite = (id) => favoriteIds.includes(id)

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}