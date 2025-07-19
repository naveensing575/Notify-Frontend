import React, { useState } from 'react'
import LikeButton from './components/LikeButton'
import NotificationsList from './components/NotificationsList'

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center px-4 py-10 gap-8">
      <h1 className="text-3xl font-bold text-center">Notify - POC </h1>
      <LikeButton onSuccess={handleRefresh} />
      <NotificationsList refreshKey={refreshKey} />
    </main>
  )
}

export default App
