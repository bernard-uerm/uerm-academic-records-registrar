import { LocalStorage } from 'quasar'
// import { Cookies } from 'quasar'

export async function checkAuthentication (state) {
  if (LocalStorage.getItem('sid') === null) {
    return false
  } else {
    return true
  }
}

export async function authenticateAPI (state) {
  try {
    const credentials = {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    }
    const responseToken = await fetch(
      `${process.env.API_URL}auth/authenticate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      }
    ).then((response) => response.json())
    LocalStorage.set('sid', responseToken.token)
    return {
      message: responseToken,
      error: null
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function validateToken (state, token) {
  try {
    const token = LocalStorage.getItem('sid')
    const responseToken = await fetch(
      `${process.env.API_URL}auth/validate-token`,
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((response) => response.json())
    // console.log(responseToken)
    // if (responseToken.message === 'error') {
    //   state.dispatch('authenticateAPI')
    // }
    return responseToken
  } catch (error) {
    console.log(error)
    return error
  }
}