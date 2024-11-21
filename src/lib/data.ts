
export async function obtainProfilePhoto(userToken: string | null) {
  const defaultAvatar = "/default-avatar.png"

  if(!userToken) return defaultAvatar

  try{
    const response = await fetch('https://api.twitch.tv/helix/users',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID!
      }
    })
    const result = await response.json()
    if(!result.data) {
      console.error("Error obtaining profile photo: "+ result.message)
      return defaultAvatar
    }
    return result.data[0].profile_image_url
    
  } catch(error) {
    console.error('Error fetching profile photo: ', error)
    return defaultAvatar;
  }
}

