<template>
  <div class="row justify-center">
    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-10">
      <q-card square class="shadow-15 q-mb-lg">
        <q-form
          ref="track"
          @submit="trackDocument"
        >
          <q-card-section align="center" class="text-h5 text-weight-thin text-white bg-secondary">
            ACADEMIC RECORDS REQUEST TRACKER
          </q-card-section>
          <q-card-section>
            <q-input
              square
              v-model="tracking.trackingNumber"
              type="text"
              label="Tracking No."
              class="q-mb-md"
              :rules="[ val => val && val.length > 0 || 'Please enter your Tracking #']"
              maxlength="30"
              color="secondary"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="tracking.trackingNumber = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <div class="q-ma-md text-center">
              <q-chip color="secondary" text-color="white" icon="note_add" clickable @click="requestRecord">
                REQUEST FOR UERM ACADEMIC RECORDS
              </q-chip>
            </div>
          </q-card-section>
          <q-card-section class="bg-secondary" align="center">
            <q-btn
              flat
              size="lg"
              icon="plagiarism"
              label="TRACK"
              :class="`full-width full-height text-white`"
              type="submit"
            />
          </q-card-section>
          <q-inner-loading :showing="this.loginLoading">
            <q-spinner-hourglass size="50px" color="secondary" />
          </q-inner-loading>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
// import VueOtpBox from "vue-otp-box";
// import "vue-otp-box/dist/VueOtpBox.css";
export default {
  name: 'Main',
  data () {
    return {
      isEmailAddress: true,
      tracking: {
        trackingNumber: null
      },
      countDown: 55,
      authentication: null,
      disableResend: true,
      message: null,
      loginLoading: false
    }
  },
  methods: {
    inputValue(otp) {
      this.login.otp = otp;
    },
    async trackDocument () {
      console.log('track')
    },
    requestRecord () {
      this.$router.push('/academic-records-application')
    },
    async loginUser () {
      this.loginLoading = true
      const studentInfo = {
        studentNo: this.login.studentNo !== null ? this.login.studentNo.trim() : null,
        email: this.login.email !== null ? this.login.email.trim() : null,
        mobileNumber: this.login.mobileNumber  !== null ? this.login.mobileNumber.trim() : null
      }
      const student = await this.$store.dispatch('students/validateStudent', studentInfo)
      console.log(student)
      if (student.success !== null) {
        this.countDownTimer()
        this.message = null
      } else {
        this.message = student.error
      }
      this.loginLoading = false
    },
    async resendOTP () {
      await this.$store.dispatch('students/generateOTP', this.login)
      this.countDown = 55
      this.disableResend = true
      this.countDownTimer()
    },
    async validateOTP () {
      this.loginLoading = true
      const validated = await this.$store.dispatch('students/validateOTP', this.login)
      if (validated.otpAuth === 'error') {
        this.message = 'OTP entered is not correct'
      }
      // else {
      //   this.$router.push('/students')
      // }
      this.loginLoading = false
    },
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    },
    changeAuth () {
      const auth = !this.isEmailAddress ? true : false
      this.isEmailAddress = auth
    }
  }
}
</script>
