import { compare } from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'

import { fetchUserByEmail } from '@/lib/api-handler/user'

import { loginSchema } from '@/lib/schemas/loginSchema'

export default {
 
  providers: [
    Credentials({
      // name: 'credentials',
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds)
        if (validated.success) {
          const { email, password } = validated.data
          const user = await fetchUserByEmail(email)
          if (!user || !(await compare(password, user.password))) return null

          return { ...user, id: user._id }
          // return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
