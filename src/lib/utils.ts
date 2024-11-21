export function obtainExpiryDate (expiresSeconds: number): Date {
  const expiryDate = new Date(Date.now())
  expiryDate.setSeconds(expiryDate.getSeconds() + (expiresSeconds - 10))

  return expiryDate
}