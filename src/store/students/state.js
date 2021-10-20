export default function () {
  return {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    localAPIURL: process.env.LOCAL_API_URL,
    localPCAPIURL: process.env.LOCAL_PC_API_URL,
    localAPIKey: process.env.LOCAL_API_URL,
    otpStatus: false,
    studentCredentials: null,
    isLoggedIn: null,
    transactionDetails: []
  }
}
