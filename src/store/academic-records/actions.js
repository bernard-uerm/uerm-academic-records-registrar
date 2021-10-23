import { LocalStorage } from 'quasar'

export async function transactions (state, transactionDetails) {
  try {
    const token = LocalStorage.getItem('sid')
    const response = await fetch(
      `${process.env.API_URL}students/academic-records-transactions?getAll=true`,
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((response) => response.json())
    for (var result of response[0]) {
      console.log(result, 'yeaya')
      const fullName = `${result.FirstName} ${result.LastName}`
      result.fullName = fullName.toUpperCase()
      result.Status = Number(result.Status)
      const formatDate = result.DateTimeCreated.replace(/T/, ' ').replace(/Z/, ' ').substr('0', '16')
      const date = new Date(`${formatDate}`)
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
      const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
      var min = date.getMinutes()
      var hr = date.getHours()
      if (min < 10) {
        min = '0' + min
      }
      var ampm = 'AM'
      if (hr > 12) {
        hr -= 12
        ampm = 'PM'
      }
      const time = `${hr}:${min} ${ampm}`
      result.DateTimeCreated = `${mo} ${da}, ${ye} ${time}`
    }
    state.commit('setTransactionDetails', response[0])
    return response
  } catch (error) {
    
    return error
  }
}
