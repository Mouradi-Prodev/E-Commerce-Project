'use server'
import { cookies } from 'next/headers'
 
export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  const session = token
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}