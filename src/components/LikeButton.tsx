import React, { useState } from 'react'
import api from '../api/api'

interface Props {
  onSuccess: () => void
}

const LikeButton: React.FC<Props> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false)

  const handleLike = async () => {
    try {
      setLoading(true)

      await api.post('/notifications/like', {
        fromUserId: 'user123',
        toUserId: 'user456',
        postId: 'post789',
      })

      // Custom Toast
      const el = document.createElement('div')
      el.className =
        'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50'
      el.innerText = '👍 Liked! Notification sent.'
      document.body.appendChild(el)
      setTimeout(() => document.body.removeChild(el), 2500)

      onSuccess()
    } catch (error) {
      console.error('Error liking post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded shadow transition ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {loading ? 'Sending...' : 'Like Post'}
    </button>
  )
}

export default LikeButton
