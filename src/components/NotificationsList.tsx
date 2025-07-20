import React, { useEffect, useState } from 'react'
import api from '../api/api'

interface Notification {
  _id: string
  fromUserId: string
  postId: string
  type: string
  createdAt: string
}

interface Props {
  refreshKey: number
}

const NotificationsList: React.FC<Props> = ({ refreshKey }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/notifications/user456`)
      setNotifications(res.data.notifications)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [refreshKey])

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">🔔 Notifications</h2>

      <div
        className="bg-gray-900 border border-gray-700 rounded-lg p-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
        style={{ minHeight: '150px' }}
      >
        {loading ? (
          <div className="text-center text-sm text-gray-400 flex items-center justify-center py-10">
            <span className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mr-2"></span>
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-sm text-gray-400">No notifications yet</div>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n._id}
                className="bg-gray-800 border border-gray-600 p-4 rounded text-sm text-left"
              >
                <p>
                  <strong>{n.fromUserId}</strong> liked your post <em>({n.postId})</em>
                </p>
                <p className="text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default NotificationsList
