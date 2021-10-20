<template>
  <q-page class="flex flex-center">
    <q-card square style="width:800px;max-width:900px;background:linear-gradient(to right, #1976D2 , #26A69A)" class="q-ma-md shadow-15">
      <q-card-section>
        <div class="row q-col-gutter-md justify-center">
          <div class="col-lg-5 col-xl-5 col-md-5 col-sm-12 col-xs-12"  v-if="!otpStatus">
            <q-card square class="shadow-15" style="max-height:900px;height:383px;">
              <q-card-section class="bg-primary text-white text-h5 text-weight-thin" align="center">
                UERM ACADEME
              </q-card-section>
              <q-card-section class="text-body1" style="height:238px;" align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </q-card-section>
              <q-card-section class="bg-primary">
                <q-btn
                  flat
                  size="lg"
                  icon="login"
                  :class="`full-width full-height text-white`"
                  label="REGISTER"
                  to="/register"
                />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-7 col-xl-7 col-md-7 col-sm-12 col-xs-12">
            <q-card square class="shadow-15 q-mb-lg" style="">
              <q-form
                ref="login"
              >
                <q-card-section align="center" class="text-h5 text-weight-thin text-white bg-secondary">
                  STUDENT LOGIN
                </q-card-section>
                <div v-if="!otpStatus">
                  <q-card-section>
                    <q-input
                      square
                      v-model="login.studentNo"
                      type="text"
                      label="Student No."
                      class="q-mb-md"
                      :rules="[ val => val && val.length > 0 || 'Please enter your Student #']"
                      maxlength="30"
                      color="secondary"
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" />
                      </template>
                      <template v-slot:append>
                        <q-icon name="close" @click="login.studentNo = ''" class="cursor-pointer" />
                      </template>
                    </q-input>
                    <div v-if="isEmailAddress">
                      <q-input
                        square
                        v-model="login.email"
                        type="text"
                        label="Email Address"
                        class="q-mt-md"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Email']"
                        suffix="@uerm.edu.ph"
                        maxlength="30"
                        color="secondary"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="login.email = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                    </div>
                    <div v-else>
                      <q-input
                        square
                        v-model="login.mobileNumber"
                        type="text"
                        label="Student Contact Number"
                        class="q-mt-md"
                        color="secondary"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Registered Contact Number']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="login.mobileNumber = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                    </div>
                    <div class="flex flex-center">
                      <q-chip clickable @click="changeAuth" color="secondary" text-color="white" :icon="!this.isEmailAddress ? 'fa fa-at' : 'fa fa-mobile-alt'">
                        LOGIN USING
                        <span v-if="this.isEmailAddress" class="q-pl-xs"> MOBILE NUMBER</span>
                        <span v-if="!this.isEmailAddress" class="q-pl-xs"> EMAIL ADDRESS </span>
                      </q-chip>
                    </div>
                  </q-card-section>
                  <q-card-section class="bg-secondary">
                    <q-btn
                      flat
                      size="lg"
                      @click="loginUser"
                      icon="login"
                      :class="`full-width full-height text-white`"
                      label="Log In"
                    />
                  </q-card-section>
                </div>
                <div v-else>
                  <q-card-section v-if="otpStatus">
                    <!-- <q-input
                      square
                      v-model="login.otp"
                      type="text"
                      label="OTP"
                      class="q-mt-md"
                      color="secondary"
                      :rules="[ val => val && val.length > 0 || 'Please enter your OTP']"
                      maxlength="30"
                    /> -->
                    <vue-otp-box
                      :numberOfBoxes="6"
                      color="#26A69A"
                      position="center"
                      @inputValue="inputValue"
                    ></vue-otp-box>

                  </q-card-section>
                  <q-card-section align="center">
                    <q-btn-group>
                      <q-btn color="secondary" @click="validateOTP" icon="login" label="VALIDATE"></q-btn>
                      <q-btn color="secondary" :disable="disableResend" @click="resendOTP" icon="sms" :label="`RESEND OTP${countDown === 0 ? '' : ' IN '+countDown+' secs'}`"></q-btn>
                    </q-btn-group>
                  </q-card-section>
                  <q-card-section class="q-py-md" v-if="this.message !== null">
                    <div class="doc-note bg-negative q-dark text-center">
                      <q-banner rounded class="bg-negative text-white">
                        <template v-slot:avatar>
                          <q-icon name="fa fa-user-slash" color="white" />
                        </template>
                        {{ this.message }}
                      </q-banner>
                    </div>
                  </q-card-section>
                  <q-inner-loading :showing="this.loginLoading">
                    <q-spinner-hourglass size="50px" color="secondary" />
                  </q-inner-loading>
                </div>
              </q-form>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import VueOtpBox from "vue-otp-box";
import "vue-otp-box/dist/VueOtpBox.css";
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    VueOtpBox
  },
  data () {
    return {
      isEmailAddress: true,
      login: {
        email: 'abagatj8336',
        studentNo: '20202108336',
        mobileNumber: null,
        otp: null
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
      otpStatus: 'students/otpStatus'
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
