<template>
  <q-page class="flex flex-center">
    <q-card square style="width:800px;max-width:900px;background:linear-gradient(to right, #1976D2 , #26A69A)" class="q-ma-md shadow-15">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-card square class="shadow-15">
              <q-form
                ref="registrationForm"
              >
                <q-card-section align="center" class="text-h5 text-weight-thin text-white bg-secondary">
                  UERM ACADEME REGISTRATION
                </q-card-section>
                <!-- <q-card-section>
                  <div class="row q-mb-lg">
                    <div class="col-6">
                      <q-input
                        square
                        v-model="registrationInfo.lastname"
                        type="text"
                        label="Lastname"
                        class="q-mt-md"
                        color="secondary"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Lastname']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.lastname = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-input
                        square
                        v-model="registrationInfo.firstname"
                        type="text"
                        label="Firstname"
                        color="secondary"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Firstname']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.firstname = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-input
                        square
                        v-model="registrationInfo.middlename"
                        type="text"
                        label="Middlename"
                        color="secondary"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.middlename = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-card-section> -->
                <q-card-section>
                  <q-stepper
                    v-model="step"
                    header-nav
                    ref="stepper"
                    color="secondary"
                    animated
                  >
                    <q-step
                      :name="1"
                      title="Basic Information"
                      icon="settings"
                      :done="step > 1"
                      :header-nav="step > 1"
                      done-color="secondary"
                      active-color="primary"
                    >
                      <q-input
                        square
                        v-model="registrationInfo.lastname"
                        type="text"
                        label="Lastname"
                        color="secondary"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Lastname']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.lastname = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-input
                        square
                        v-model="registrationInfo.firstname"
                        type="text"
                        label="Firstname"
                        color="secondary"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Firstname']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.firstname = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-input
                        square
                        v-model="registrationInfo.middlename"
                        type="text"
                        label="Middlename"
                        color="secondary"
                        hint=""
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.middlename = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-input
                        type="email"
                        color="secondary"
                        v-model="registrationInfo.emailAddress"
                        label="Personal Email"
                        autocomplete="off"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Email', isValidEmail]"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.emailAddress = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-input
                        type="number"
                        color="secondary"
                        v-model="registrationInfo.mobileNumber"
                        label="Your Contact Number"
                        autocomplete="off"
                        hint="Your Contact Number (09*********)"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Contact Number', val => val.length <= 11 || 'Please enter valid contact number']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.mobileNumber = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-input
                        square
                        v-model="registrationInfo.address"
                        type="text"
                        label="Address"
                        color="secondary"
                        :rules="[ val => val && val.length > 0 || 'Please enter your Address']"
                        hint=""
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.firstname = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-stepper-navigation align="center">
                        <q-btn @click="forwardStep(2)" color="secondary" label="Continue" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="2"
                      title="Academic Information"
                      icon="create_new_folder"
                      :done="step > 2"
                      :header-nav="step > 2"
                      done-color="secondary"
                      active-color="primary"
                    >
                      <q-input
                        square
                        v-model="registrationInfo.studentNumber"
                        type="text"
                        label="Student #"
                        color="secondary"
                        hint="If you can't remember it leave it blank."
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.studentNumber = ''" class="cursor-pointer" />
                        </template>
                      </q-input>
                      <q-toggle
                        v-model="registrationInfo.currentlyEnrolled"
                        checked-icon="check"
                        label="Currently Enrolled?"
                        color="green"
                        unchecked-icon="clear"
                        class="q-mt-md"
                      />
                      
                      <div v-if="!registrationInfo.currentlyEnrolled">
                        <q-input
                          v-model="registrationInfo.dateOfGraduation"
                          mask="date"
                          :rules="['date']"
                          label="Date of Graduation"
                          hint="(YYYY/MM/DD)"
                          autocomplete="off"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="registrationInfo.dateOfGraduation">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                          <template v-slot:prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>
                      <q-select
                        v-model="registrationInfo.periodEnrolledFromSchoolYear"
                        :options="schoolYearFrom"
                        label="Period Enrolled S.Y. From"
                        hint=""
                      />
                      <q-select
                        v-model="registrationInfo.periodEnrolledToSchoolYear"
                        :options="schoolYearTo"
                        label="Period Enrolled S.Y. To"
                        hint=""
                      />
                      <q-file
                        v-model="registrationInfo.fileProof"
                        label="File Proof"
                        color="secondary"
                        accept=".jpg, image/*, .pdf"
                        :rules="[ val => val !== '' && val !== null || 'Please upload a proof that you are a former or a cuurrent student']"
                        hint=""
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click="registrationInfo.fileProof = ''" class="cursor-pointer" />
                        </template>
                      </q-file>

                      <q-stepper-navigation align="center">
                        <q-btn @click="forwardStep(3)" color="secondary" label="Continue" />
                        <q-btn flat @click="backwardStep(1)" color="secondary" label="Back" class="q-ml-sm" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="3"
                      title="Register"
                      icon="save"
                      :header-nav="step > 3"
                      done-color="secondary"
                      active-color="primary"
                    >
                      DISCLAIMER
                      <q-stepper-navigation align="center">
                        <q-btn color="secondary" type="submit" @click="done3 = true" label="Finish" />
                        <q-btn flat @click="backwardStep(2)" color="secondary" label="Back" class="q-ml-sm" />
                      </q-stepper-navigation>
                    </q-step>
                  </q-stepper>
                </q-card-section>
                <q-card-section class="bg-secondary">
                  <q-btn
                    flat
                    size="lg"
                    :to="'/'"
                    icon="undo"
                    :class="`full-width full-height text-white`"
                    label="GO BACK TO LOGIN"
                  />
                </q-card-section>
              </q-form>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
var term = [
  '1ST',
  '2ND',
  '3RD',
  'SUMMER'
]
export default {
  name: 'Home',
  data () {
    return {
      step: 1,
      schoolYearFrom: null,
      schoolYearTo: null,
      registrationInfo: {
        firstname: null,
        middlename: null,
        lastname: null,
        address: null,
        emailAddress: null,
        mobileNumber: null,
        studentNumber: null,
        currentlyEnrolled: false,
        degreeProgram: null,
        dateOfGraduation: null,
        periodEnrolledFromSchoolYear: null,
        periodEnrolledfromTerm: null,
        periodEnrolledToSchoolYear: null,
        periodEnrolledToTerm: null,
        fileProof: null
      }
    }
  },
  watch: {
    registrationInfo: {
      async handler (val) {
        console.log(val)
        this.formatBatch()
      },
      deep: true
    },
    // step (val) {
    //   this.$refs.registrationForm.validate().then(async valid => {
    //     console.log(val)
    //     val = val - 1
    //     console.log(val)
    //   })
    // }
  },
  methods: {
    registerUser () {

    },
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },
    forwardStep (step) {
      this.$refs.registrationForm.validate().then(async valid => {
        if (!valid) {
          return
        } else {
          this.step = step
        }
      })
    },
    formatBatch () {
      var currentYear = new Date().getFullYear() + 3
      console.log(currentYear + 3)
      var batch = []
      for (var yearIndex = 1950; yearIndex <= currentYear; yearIndex++) {
        batch.push(yearIndex)
      }
      this.schoolYearTo = batch
      this.schoolYearFrom = batch
    },
    backwardStep (step) {
      this.step = step
    },
    forgotPassword () {
      console.log(forgotPassword)
    }
  }
}
</script>
