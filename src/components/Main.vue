<template>
  <q-page class="flex flex-center">
    <div class="row full-width">
      <div class="col-12">
        <q-card square class="shadow-15 q-mb-lg" style="">
          <q-form
            ref="loginForm"
            @submit.prevent="loginEmployee"
          >
            <q-card-section align="center" class="text-h5 text-weight-thin text-white bg-secondary">
              UERM ACADEMIC RECORDS - REGISTRAR
            </q-card-section>
            <q-card-section>
              <q-input
                square
                v-model="login.username"
                type="text"
                label="Employee ID"
                class="q-mb-md"
                :rules="[ val => val && val.length > 0 || 'Please enter your Employee ID']"
                maxlength="30"
                color="secondary"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click="login.username = ''" class="cursor-pointer" />
                </template>
              </q-input>
              <q-input
                square
                v-model="login.password"
                type="password"
                label="Password"
                class="q-mb-md"
                :rules="[ val => val && val.length > 0 || 'Please enter your Password']"
                maxlength="30"
                color="secondary"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click="login.password = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section class="bg-secondary">
              <q-btn
                flat
                size="lg"
                @click="loginEmployee"
                icon="login"
                :class="`full-width full-height text-white`"
                label="Log In"
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
  </q-page>
</template>

<script>
import VueOtpBox from "vue-otp-box";
import "vue-otp-box/dist/VueOtpBox.css";
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      isEmailAddress: true,
      login: {
        username: null,
        password: null,
        checking: false
      },
      countDown: 55,
      authentication: null,
      disableResend: true,
      message: null,
      loginLoading: false
    }
  },
  computed: {
    ...mapGetters({
      employeeInformation: 'employees/employeeInformation'
    })
  },
  watch: {
    isEmailAddress (val) {
      if (val) {
        this.login.mobileNumber = null
      } else {
        this.login.email = null
      }
    },
    countDown (val) {
      if (val === 0) {
        this.disableResend = false
      }
    }
  },
  methods: {
    inputValue(otp) {
      this.login.otp = otp;
    },
    async loginEmployee () {
      this.$refs.loginForm.validate().then(async valid => {
        if (valid) {
          this.loginLoading = true
          await this.$store.dispatch('employees/loginEmployee', this.login)
          this.loginLoading = false
          const checkCookies = this.$q.cookies.has('employee_code')
          if (checkCookies) {
            console.log('hererere')
            this.$router.push('/registrar')
          }
        }
      })
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
