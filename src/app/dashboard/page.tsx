import { cookies } from "next/headers"
export default async function Dashboard() {
  const cookiesStore = cookies()
  const appToken = cookiesStore.get('app_access_token')
  return (
    <div>
      <h1>DASHBOARD</h1>
    </div>
  )
}
