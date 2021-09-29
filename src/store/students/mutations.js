export function setOTP (state, otpStatus) {
  state.otpStatus = otpStatus
}

export function setStudentCredentials (state, studentInfo) {
  state.studentCredentials = studentInfo
}

export function setLoggedIn (state, status) {
  state.isLoggedIn = status
}