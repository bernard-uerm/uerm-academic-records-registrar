export default function () {
  return {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    localAPIKey: process.env.LOCAL_API_URL,
    otpStatus: false,
    studentCredentials: null,
    isLoggedIn: null
  }
}
