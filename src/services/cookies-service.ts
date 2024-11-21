import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export function obtainTokens() {
  const cookiesStore = cookies()

  const appToken = cookiesStore.get('app_access_token')?.value ?? null
  const userToken = cookiesStore.get('user_token')?.value ?? null

  return {
    appToken,
    userToken,
  }
}

export function checkUserToken() {
  const cookiesStore = cookies()
  return cookiesStore.has('user_token')
}

export async function logOut() {
  "use server"
  const cookiesStore = cookies()

  cookiesStore.delete('user_token')
  cookiesStore.delete('user_refresh_token')
  cookiesStore.delete('user_token_expiry')

  revalidatePath('/dashboard')
  redirect('/dashboard')
}