import React from 'react'
import api from '../api/api'

interface Props {
  onSuccess: () => void
}

const LikeButton: React.FC<Props> = ({ onSuccess }) => {
  const handleLike = async () => {
    try {
      await api.post('/notifications/like', {
        fromUserId: 'user123',
        toUserId: 'user456',
        postId: 'post789',
      })
      // Show custom success toast/message
      const el = document.createElement('div')
      el.className =
        'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50'
      el.innerText = '👍 Liked! Notification sent.'
      document.body.appendChild(el)
      setTimeout(() => document.body.removeChild(el), 2500)

      onSuccess()
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  return (
    <button
      onClick={handleLike}
      className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded shadow transition"
    >
      Like Post
    </button>
  )
}

export default LikeButton
