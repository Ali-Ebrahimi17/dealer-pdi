'use client'

import { useActiveUser } from '@/hooks/useActiveUser'
import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const Providers = ({ children }: { children: ReactNode }) => {
  useActiveUser()
  return (
    <NextUIProvider>
      <Toaster />
      {children}
    </NextUIProvider>
  )
}

export default Providers
