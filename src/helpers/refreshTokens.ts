import axios from 'axios'

export const refreshTokens = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh')

    if (!refreshToken) {
      throw new Error('Refresh token not found')
    }

    const response = await axios.post('https://anki-be.vercel.app/token', null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      },
      withCredentials: true
    })

    const { accessToken, refreshToken: newRefreshToken } = response.data

    localStorage.setItem('access', accessToken)
    localStorage.setItem('refresh', newRefreshToken)

    console.log('Tokens refreshed')

    return true
  } catch (error) {
    console.error('Error refreshing tokens:', error)
    throw error
  }
}
