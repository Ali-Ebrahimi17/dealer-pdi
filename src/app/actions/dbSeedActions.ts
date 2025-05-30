'use server'

import User from '@/models/User'
import { userData } from '@/db_seed_data/userData'
import bcrypt from 'bcryptjs'
import socket from '@/lib/socket'

import connectDB from '@/lib/db'

export const seedDB = async () => {
  await connectDB()
  try {
    // ? web socket test start
    console.log('started')
    socket.emit('start', { BUILD: 'JAN123456', bay: 1 })
    // socket.emit('inspectionStart', { bay: '1', build: 'JAN123456' })

    setTimeout(function () {
      console.log('finished')
      socket.emit('dpuUpdating', false)
    }, 3000)

    // ? web socket test end

    // !seed users
    const usersExist = await User.findOne({})
    if (!usersExist) {
      for (const user of userData) {
        const hashedPassword = await bcrypt.hash('password', 10)
        const data = {
          ...user,
          password: hashedPassword,
        }
        await User.create(data)
      }
    }

    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}
