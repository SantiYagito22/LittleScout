import { cookies } from "next/headers"
export default async function Dashboard() {
  const cookiesStore = cookies()
  const appToken = cookiesStore.get('app_access_token')
  console.log(appToken)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>DASHBOARD</h1>
    </div>
  )
}
//wx05ky7if0az4j9yf8oi6l154l1073
//wx05ky7if0az4j9yf8oi6l154l1073
