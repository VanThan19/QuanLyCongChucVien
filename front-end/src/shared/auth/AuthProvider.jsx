import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from '@/shared/auth/useAuth'

const STORAGE_KEY = 'ccvc.session'

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function readSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed.username !== 'string' || !parsed.username.trim()) return null
    return {
      username: parsed.username.trim(),
      loggedInAt: typeof parsed.loggedInAt === 'string' ? parsed.loggedInAt : null,
    }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession)

  const login = useCallback(async ({ username }) => {
    await wait(480)
    const session = {
      username: username.trim(),
      loggedInAt: new Date().toISOString(),
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setUser(session)
    return session
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
