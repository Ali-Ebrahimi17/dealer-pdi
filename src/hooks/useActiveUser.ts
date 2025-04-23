import { useEffect } from 'react'

import socket from '@/lib/socket'

import { useCurrentUser } from './use-session'

export const useActiveUser = () => {
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (!currentUser) return

    let data = {
      userId: currentUser.id,
      socketId: socket.id,
    }

    // console.log(data)

    socket.emit('active', data)
  }, [socket, currentUser])
}
