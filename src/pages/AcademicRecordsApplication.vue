<template>
  <q-page class="flex flex-center">
    <q-card square style="width:1230px;max-width:1500px;background:linear-gradient(to right, #1976D2 , #26A69A)" class="q-ma-md shadow-15">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-card square class="shadow-15">
              <q-form
                @submit="registerUser"
                ref="registrationForm"
              >
                <q-card-section align="center" class="text-h5 text-weight-thin text-white bg-secondary">
                  UERM ACADEMIC RECORDS APPLICATION
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
                      title="BASIC INFORMATION"
                      icon="settings"
                      :done="step > 1"
                      :header-nav="step > 1"
                      done-color="secondary"
                      active-color="primary"
                    >
                      <q-card>
                        <q-card-section class="bg-secondary" align="center">
                          <div class="text-overline text-white">
                            PERSONAL INFORMATION
                          </div>
                        </q-card-section>
                        <q-card-section>
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
                        </q-card-section>
                      </q-card>
                      <q-stepper-navigation align="center">
                        <q-btn @click="forwardStep(2)" color="secondary" label="Continue" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="2"
                      title="ACADEMIC INFORMATION"
                      icon="create_new_folder"
                      :done="step > 2"
                      :header-nav="step > 2"
                      done-color="secondary"
                      active-color="primary"
                    >
                      <q-card>
                        <q-card-section class="bg-secondary" align="center">
                          <div class="text-overline text-white">
                            STUDENT INFORMATION
                          </div>
                        </q-card-section>
                        <q-card-section>
                          <div class="row justify-between q-col-gutter-lg">
                            <div class="" v-bind:class="{ 'col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center': registrationInfo.currentlyEnrolled }">
                              <q-toggle
                                v-model="registrationInfo.currentlyEnrolled"
                                checked-icon="check"
                                label="Currently Enrolled?"
                                color="secondary"
                                unchecked-icon="clear"
                                class="q-mt-md q-pl-none"
                                size="xl"
                              />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="!registrationInfo.currentlyEnrolled">
                              <q-input
                                v-model="registrationInfo.dateOfGraduation"
                                mask="date"
                                :rules="['date']"
                                label="Date of Graduation"
                                hint="(YYYY/MM/DD)"
                                autocomplete="off"
                                color="secondary"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                      <q-date v-model="registrationInfo.dateOfGraduation" color="secondary">
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
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-sm">
                              <q-input
                                square
                                v-model="registrationInfo.studentNumber"
                                type="text"
                                label="Student #"
                                color="secondary"
                                hint="Student # is not required"
                              >
                                <template v-slot:prepend>
                                  <q-icon name="person" />
                                </template>
                                <template v-slot:append>
                                  <q-icon name="close" @click="registrationInfo.studentNumber = ''" class="cursor-pointer" />
                                </template>
                              </q-input>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-sm">
                              <q-input
                                square
                                v-model="registrationInfo.degreeProgram"
                                type="text"
                                label="Degree Program"
                                color="secondary"
                                hint=""
                              >
                                <template v-slot:prepend>
                                  <q-icon name="person" />
                                </template>
                                <template v-slot:append>
                                  <q-icon name="close" @click="registrationInfo.degreeProgram = ''" class="cursor-pointer" />
                                </template>
                              </q-input>
                            </div>
                            <div class="col-lg-12 col-md-6 col-sm-12 col-xs-12 q-pt-sm">
                              <q-card>
                                <q-card-section class="bg-secondary" align="center">
                                  <div class="text-overline text-white">
                                    PERIOD ENROLLED IN THE MEDICAL CENTER FROM:
                                  </div>
                                </q-card-section>
                                <q-card-section>
                                  <div class="row justify-between q-col-gutter-lg">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pt-sm">
                                      <q-select
                                        v-model="registrationInfo.periodEnrolledFromSchoolYear"
                                        :options="schoolYearFrom"
                                        label="Period Enrolled S.Y. From"
                                        hint=""
                                        color="secondary"
                                      />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pt-sm">
                                      <q-select
                                        v-model="registrationInfo.periodEnrolledfromTerm"
                                        :options="fromTerm"
                                        label="Term"
                                        hint=""
                                        color="secondary"
                                      />
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                            </div>
                            <div class="col-lg-12 col-md-6 col-sm-12 col-xs-12 q-pt-sm">
                              <q-card>
                                <q-card-section class="bg-secondary" align="center">
                                  <div class="text-overline text-white">
                                    PERIOD ENROLLED IN THE MEDICAL CENTER TO:
                                  </div>
                                </q-card-section>
                                <q-card-section>
                                  <div class="row justify-between q-col-gutter-lg">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pt-sm">
                                      <q-select
                                        v-model="registrationInfo.periodEnrolledToSchoolYear"
                                        :options="schoolYearTo"
                                        label="Period Enrolled S.Y. To"
                                        hint=""
                                        color="secondary"
                                      />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pt-sm">
                                      <q-select
                                        v-model="registrationInfo.periodEnrolledToTerm"
                                        :options="toTerm"
                                        label="Term"
                                        hint=""
                                        color="secondary"
                                      />
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>  
                        </q-card-section>
                      </q-card>
                      <q-stepper-navigation align="center">
                        <q-btn @click="forwardStep(3)" color="secondary" label="Continue" />
                        <q-btn flat @click="backwardStep(1)" color="secondary" label="Back" class="q-ml-sm" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="3"
                      title="DOCUMENT REQUEST"
                      icon="create_new_folder"
                      :done="step > 3"
                      :header-nav="step > 3"
                      done-color="secondary"
                      active-color="primary"
                    >
                      <q-card>
                        <q-card-section class="bg-secondary text-overline text-white" align="center">
                          REQUEST FOR ACADEMIC RECORDS
                        </q-card-section>
                        <q-card-section align="right">
                          <q-btn color="secondary" @click="addDocumentRequest" icon="add_circle_outline" label="Add Academic Record Document" />
                        </q-card-section>
                        <q-card-section>
                          <div class="" 
                            v-for="(docRequest, index) in academicDocumentRequest"
                            :key="index"
                          >
                            <div v-if="index%2">
                              <q-card class="q-mb-sm">
                                <q-card-section class="bg-secondary text-white text-overline" align="center">
                                  DOCUMENT #{{ index+1 }}
                                </q-card-section>
                                <q-card-section>
                                  <div class="row justify-center q-col-gutter-md">
                                    <div class="col-lg-5 flex flex-center">
                                      <q-select
                                        v-model="docRequest.document"
                                        :options="academicDocument"
                                        label="Document"
                                        hint=""
                                        color="secondary"
                                      />
                                    </div>
                                    <div class="col-lg-5 flex flex-center">
                                      <q-input
                                        v-model="docRequest.numberOfCopies"
                                        type="number"
                                        label="Number of Copies"
                                        color="secondary"
                                        :rules="[ val => val && val.length > 0 || 'Please enter Number of Copies']"
                                      >
                                        <template v-slot:prepend>
                                          <q-icon name="person" />
                                        </template>
                                        <template v-slot:append>
                                          <q-icon name="close" @click="docRequest.numberOfCopies = ''" class="cursor-pointer" />
                                        </template>
                                      </q-input>
                                    </div>
                                    <div class="col-lg-2 flex flex-center">
                                      <q-btn color="negative" @click="removeDocuments(index)" icon="delete_outline" />
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                            </div>
                            <div v-else>
                              <q-card class="q-mb-sm">
                                <q-card-section class="bg-primary text-white text-overline" align="center">
                                  DOCUMENT #{{ index+1 }}
                                </q-card-section>
                                <q-card-section>
                                  <div class="row justify-center q-col-gutter-md">
                                    <div class="col-lg-5 flex flex-center">
                                      <q-select
                                        v-model="docRequest.document"
                                        :options="academicDocument"
                                        label="Document"
                                        hint=""
                                        color="secondary"
                                      />
                                    </div>
                                    <div class="col-lg-5 flex flex-center">
                                      <q-input
                                        square
                                        v-model="docRequest.numberOfCopies"
                                        type="number"
                                        label="Number of Copies"
                                        color="secondary"
                                        :rules="[ val => val && val.length > 0 || 'Please enter Number of Copies']"
                                      >
                                        <template v-slot:prepend>
                                          <q-icon name="person" />
                                        </template>
                                        <template v-slot:append>
                                          <q-icon name="close" @click="docRequest.numberOfCopies = ''" class="cursor-pointer" />
                                        </template>
                                      </q-input>
                                    </div>
                                    <div class="col-lg-2 flex flex-center">
                                      <q-btn color="negative" @click="removeDocuments(index)" icon="delete_outline" />
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-separator class="q-ma-md"></q-separator> 
                      <q-card>
                        <q-card-section class="bg-secondary text-overline text-white" align="center">
                          ABOVE DOCUMENT/S IS/ARE REQUIRED FOR:
                        </q-card-section>
                        <q-card-section>
                          
                        </q-card-section>
                      </q-card>
                      <q-stepper-navigation align="center">
                        <q-btn @click="forwardStep(4)" color="secondary" label="Continue" />
                        <q-btn flat @click="backwardStep(2)" color="secondary" label="Back" class="q-ml-sm" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="4"
                      title="PROOF OF DOCUMENTS"
                      icon="create_new_folder"
                      :done="step > 4"
                      :header-nav="step > 4"
                      done-color="secondary"
                      active-color="primary"
                    >
                      <q-card>
                        <q-card-section class="bg-secondary text-overline text-white" align="center">
                          STUDENT VERIFICATION
                        </q-card-section>
                        <q-card-section>
                          <div class="row">
                            <div class="col-12">
                              <q-file
                                name="student_file"
                                v-model="registrationInfo.fileProof"
                                label="File Proof"
                                color="secondary"
                                accept=".jpg, image/*, .pdf"
                                :rules="[ val => val !== '' && val !== null || 'Please upload a proof that you are a former or a current student']"
                                hint=""
                              >
                                <template v-slot:prepend>
                                  <q-icon name="person" />
                                </template>
                                <template v-slot:append>
                                  <q-icon name="close" @click="registrationInfo.fileProof = ''" class="cursor-pointer" />
                                </template>
                              </q-file>
                            </div>
                            <div class="col-12">
                              <q-btn type="submit" flat color="secondary" label="Test" class="q-ml-sm" />
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-stepper-navigation align="center">
                        <q-btn @click="forwardStep(5)" color="secondary" label="Continue" />
                        <q-btn flat @click="backwardStep(3)" color="secondary" label="Back" class="q-ml-sm" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="5"
                      title="TERMS AND CONDITIONS"
                      icon="save"
                      :header-nav="step > 5"
                      done-color="secondary"
                      active-color="primary"
                    >
                      <div class="text-body1">
                        <q-checkbox
                          v-model="checkTerms"
                          :label="terms"
                          size="xl"
                          color="secondary"
                        >
                        </q-checkbox>
                      </div>
                      <q-stepper-navigation align="center">
                        <q-btn color="secondary" type="submit" @click="done3 = true" label="Submit" />
                        <q-btn flat @click="backwardStep(4)" color="secondary" label="Back" class="q-ml-sm" />
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
                    label="GO BACK HOME"
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

var reasonForRequest = [
  'SCHOLARSHIP',
  'RE-ADMISSION',
  'TRANSFER TO OTHER SCHOOL',
  'BOARD EXAMINATION',
  'EMPLOYMENT',
  'FURTHER STUDIES',
  'REFERENCE',
  'OTHERS'
]

var academicRecords = [
  'OFFICIAL TRANSCRIPT OF RECORDS',
  'CERTIFICATE OF TRANSFER CREDENTIAL',
  'ORIGINAL DIPLOMA (ISSUED ONLY ONCE)',
  'CERTIFIED TRUE COPY - TRANSCRIPT OF RECORDS',
  'CERTIFIED TRUE COPY - DIPLOMA',
  'CERTIFICATION - GRADUATION',
  'CERTIFICATION - MEDIUM OF INSTRUCTION',
  'CERTIFICATION - ENROLLMENT/ATTENDANCE',
  'CERTIFICATION - NON-ISSUANCE OF SPECIAL ORDER NUMBER',
  'CERTIFICATION - GRADES',
  'CERTIFICATION - GENERAL WEIGHTED AVERAGE',
  'CERTIFICATION - COURSE / SUBJECT DESCRIPTION',
  'CERTIFICATION, AUTHENTICATION AND VERIFICATION - DEPARTMENT OF FOREIGN AFFAIRS (DFA)',
  'CERTIFICATION, AUTHENTICATION AND VERIFICATION - COMMISION ON HIGHER EDUCATION (CHED)',
  'OTHERS'
]
export default {
  name: 'AcademicRecordsApplication',
  data () {
    return {
      step: 1,
      schoolYearFrom: null,
      schoolYearTo: null,
      fromTerm: term,
      toTerm: term,
      reason: reasonForRequest,
      academicDocument: academicRecords,
      checkTerms: false,
      terms: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      academicDocumentRequest: [
        {
          document: 'Select Document',
          numberOfCopies: null
        }
      ],
      registrationInfo: {
        firstname: 'Bernard',
        middlename: 'Tiaga',
        lastname: 'Gresola',
        address: 'Quezon City',
        emailAddress: 'gresolabernard@gmail.com',
        mobileNumber: '09053254071',
        studentNumber: null,
        currentlyEnrolled: false,
        degreeProgram: null,
        dateOfGraduation: null,
        periodEnrolledFromSchoolYear: null,
        periodEnrolledfromTerm: null,
        periodEnrolledToSchoolYear: null,
        periodEnrolledToTerm: null,
        fileProof: null,
        reasonForRequest: null,
        otherReasons: null,
        academicDocument: null,
        otherDocuments: null
      }
    }
  },
  watch: {
    registrationInfo: {
      async handler (val) {
        console.log(val)
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
  mounted () {
    this.formatBatch()
  },
  methods: {
    addDocumentRequest () {
      var newDocument = {
        document: 'Select Document',
        numberOfCopies: null
      }

      this.academicDocumentRequest.push(newDocument)
    },
    removeDocuments (index) {
      const shallowCopyArray = Array.from(this.academicDocumentRequest)
      shallowCopyArray.splice(index, 1)
      this.academicDocumentRequest = shallowCopyArray
    },
    async registerUser (evt) {
      const formData = new FormData(evt.target)
      for (const [ name, value ] of formData.entries()) {
        if (value.name.length > 0) {
          console.log(name)
          console.log(value.name)
        }
      }

      formData.append('lastname', this.registrationInfo.lastname)
      
      await this.$store.dispatch('students/registerUser', formData)
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
      var currentYear = new Date().getFullYear()
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

<style>
  .card-border-primary {
    border-top: none;
    border-bottom: none;
    border-style: solid;
    border-color: rgba(0,0,0,0.12);
    border-left-color: #1976d2 !important;
    border-right-color: #1976d2 !important;
  }

  .card-border-secondary {
    border-style: solid;
    border-color: rgba(0,0,0,0.12);
    border-left-color: #26a69a  !important;
    border-right-color: #26a69a  !important;
  }
</style>