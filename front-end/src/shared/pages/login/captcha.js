const DIGITS = '0123456789'

export function createCaptchaCode(length = 6) {
  const bytes = new Uint32Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (value) => DIGITS[value % DIGITS.length]).join('')
}
