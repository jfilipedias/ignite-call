import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    username: string
    email: string
    avatar_url: string
  }
}
