"use client";

export default function Login() {
  
  function handleTwitchAuth() {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;

    const twitchUrlAuthentication = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=user:read:email`;
    
    window.location.href = twitchUrlAuthentication
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button className="bg-red-400 p-3" onClick={handleTwitchAuth}>
        Login
      </button>
    </div>
  );
}
