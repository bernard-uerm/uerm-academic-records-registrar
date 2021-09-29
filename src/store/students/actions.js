import { LocalStorage } from 'quasar'
export async function validateStudent (state, studentInfo) {
  try {
    const response = await fetch(
      `${this.state.students.apiUrl}students?auth=${this.state.students.apiKey}&studentNo=${studentInfo.studentNo}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    if (response.length > 0) {
      if (studentInfo.checking) {
        state.commit('setLoggedIn', true)
        state.commit('setStudentCredentials', response[0])
      } else {
        if (studentInfo.email !== null) {
          if (studentInfo.email !== response[0].UERMEmail) {
            return {
              success: null,
              error: 'UERM Email does not match any of our records'
            }
          }
        } else if (studentInfo.mobileNumber !== null) {
          if (studentInfo.mobileNumber !== response[0].TEL_NO) {
            return {
              success: null,
              error: 'UERM registered contact number does not match any of our records'
            }
          }
        }

        const otp = await state.dispatch('generateOTP', studentInfo)
        if (otp.success !== undefined) {
          state.commit('setLoggedIn', true)
          return {
            success: 'Successfully authenticated',
            error: null
          }
        }
      }
    } else {
      return {
        success: null,
        error: 'Error! Please enter valid credentials!'
      }
    }
  } catch (error) {
    return error
  }
}

export async function generateOTP (state, studentInfo) {
  try {
    const responseOTP = await fetch(
      `${this.state.students.apiUrl}otp/get-otp?auth=${this.state.students.apiKey}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    console.log(responseOTP)
    if (responseOTP.otp.length === 6) {
      if (studentInfo.mobileNumber !== null) {
        const smsMessage = {
          messageType: 'sms',
          destination: '09053254071',
          text: `Your OTP is ${responseOTP.otp}`
        }
        const sms = await state.dispatch('sendSMS', smsMessage)
        if (sms.message === 'success') {
          LocalStorage.set('studentID', studentInfo.studentNo)
          state.commit('setOTP', true)
        }
      } else {
        const emailMessage = {
          emailAddress: 'gresolabernard@gmail.com',
          name: 'Bernard Gresola',
          otp: `${responseOTP.otp}`
        }
        const email = await state.dispatch('sendEmail', emailMessage)
        if (email['Messages'][0].Status === 'success') {
          LocalStorage.set('studentID', studentInfo.studentNo)
          state.commit('setOTP', true)
        }
      }
      return { success: 'Successfully generated OTP' }
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function validateOTP (state, otp) {
  try {
    const responseOTP = await fetch(
      `${this.state.students.apiUrl}otp/verify-otp?auth=${this.state.students.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(otp)
      }
    ).then((response) => response.json())
    if (responseOTP.otpAuth === 'success') {
      const studentCredentials = {
        studentNo: LocalStorage.getItem('studentID'),
        checking: true
      }
      await state.dispatch('validateStudent', studentCredentials)
      LocalStorage.set('studentLogin', true)
    } else {
      // state.commit('setOTP', false)
    }
    return responseOTP
  } catch (error) {
    return error
  }
}


export async function sendEmail (state, studentDetails) {
  try {
    const responseEmail = await fetch(
      `${this.state.students.apiUrl}students/send-email-otp?auth=${this.state.students.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentDetails)
      }
    ).then((response) => response.json())
    // if (responseOTP.otpAuth === 'success') {
    //   const studentCredentials = {
    //     studentNo: LocalStorage.getItem('studentID'),
    //     checking: true
    //   }
    //   await state.dispatch('validateStudent', studentCredentials)
    //   LocalStorage.set('studentLogin', true)
    // } else {
    //   // state.commit('setOTP', false)
    // }
    return responseEmail
  } catch (error) {
    return error
  }
}


export async function sendSMS (state, smsMessage) {
  const currentToken = LocalStorage.getItem('smartAccessToken')
  if (currentToken === null) {
    const authToken = await state.dispatch('setTextMessagingAuthentication')
    if (authToken.accessToken.length > 0) {
      await state.dispatch('sendTextMessage', smsMessage)
      return { message: 'success' }
    } else {
      const refreshToken = await state.dispatch('refreshTextToken')
      if (refreshToken.accessToken.length > 0) {
        await state.dispatch('sendTextMessage', smsMessage)
        return { message: 'success' }
      }
    }
  } else {
    const send = await state.dispatch('sendTextMessage', smsMessage)
    if (send.name === 'Error') {
      const refreshToken = await state.dispatch('refreshTextToken')
      await state.dispatch('setTextMessagingAuthentication')
      await state.dispatch('sendTextMessage', smsMessage)
    } else {
      return { message: 'success' }
    }
  }
}

export async function setTextMessagingAuthentication (state) {
  try {
    const responseToken = await fetch(
      `${this.state.students.apiUrl}sms/get-token-bearer?auth=${this.state.students.apiKey}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    LocalStorage.set('smartAccessToken', responseToken.accessToken)
    LocalStorage.set('smartTokenType', responseToken.tokenType)
    LocalStorage.set('smartRefreshToken', responseToken.refreshToken)
    return responseToken
  } catch (error) {
    console.log(response, 'response')
    return error
  }
}

export async function refreshTextToken (state) {
  try {
    const tokenInfo = {
      tokenType: LocalStorage.getItem('smartTokenType'),
      accessToken: LocalStorage.getItem('smartAccessToken'),
      refreshToken: LocalStorage.getItem('smartRefreshToken')
    }
    const responseToken = await fetch(
      `${this.state.students.apiUrl}sms/get-refresh-token-bearer?auth=${this.state.students.apiKey}&accessToken=${tokenInfo.accessToken}&refreshToken=${tokenInfo.refreshToken}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    if (responseToken.name === 'Error') {
      return responseToken
    } else {
      LocalStorage.set('smartAccessToken', responseToken.accessToken)
      return responseToken.accessToken
    }
  } catch (error) {
    console.log(response)
    return error
  }
}

export async function sendTextMessage (state, message) {
  const tokenInfo = {
    tokenType: LocalStorage.getItem('smartTokenType'),
    accessToken: LocalStorage.getItem('smartAccessToken'),
    refreshToken: LocalStorage.getItem('smartRefreshToken')
  }
  try {
    const responseToken = await fetch(
      `${this.state.students.apiUrl}sms/send-text-message?auth=${this.state.students.apiKey}&accessToken=${tokenInfo.accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      }
    ).then((response) => response.json())
    return {
      message: responseToken,
      error: null
    }
  } catch (error) {
    console.log(error)
    return error
  }
}


export async function logout (state) {
  state.commit('setStudentCredentials', [])
  state.commit('setOTP', false)
  LocalStorage.clear()
}