export const APP_NAME = 'Password Locker'

export const SESSION_TIMEOUT = '1h'

export const CORS_OPTIONS = {
  origin: process.env.CLIENT_URL,
  credentials: true,
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  maxAge: 60 * 60 * 1000, // 1 hour
}

export const DEFAULT_MASTER_PASSWORD = 'hello@passwordlocker'
