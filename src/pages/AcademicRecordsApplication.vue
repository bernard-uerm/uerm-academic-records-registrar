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
                      <q-card class="q-my-md">
                        <q-card-section class="bg-secondary text-overline text-white" align="center">
                          PREVIOUS ACADEMIC RECORDS REQUEST
                        </q-card-section>
                        <q-card-section>
                          <div class="row justify-between q-col-gutter-lg">
                            <div class="" v-bind:class="{ 'col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center': !registrationInfo.haveRecord }">
                              <q-toggle
                                v-model="registrationInfo.haveRecord"
                                checked-icon="check"
                                label="Do you have previous Academic Records Request?"
                                color="secondary"
                                unchecked-icon="clear"
                                class="q-mt-md q-pl-none"
                                size="xl"
                              />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" v-if="registrationInfo.haveRecord">
                              <q-input
                                square
                                v-model="registrationInfo.referenceNumber"
                                type="text"
                                label="Reference Number"
                                color="secondary"
                                :rules="[ val => val && val.length > 0 || 'Please enter your Reference Number']"
                                @focusout="searchReferenceID(registrationInfo.referenceNumber)"
                              >
                                <template v-slot:prepend>
                                  <q-icon name="person" />
                                </template>
                                <template v-slot:append>
                                  <q-icon name="close" @click="registrationInfo.referenceNumber = ''" class="cursor-pointer" />
                                </template>
                              </q-input>
                            </div>
                            <div class="col-12" v-if="this.referenceNumberMessage !== null">
                              <q-banner inline-actions class="text-white bg-red">
                                {{ this.referenceNumberMessage }}
                              </q-banner>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
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
                          <q-btn
                            color="secondary"
                            @click="addDocumentRequest"
                            icon="add_circle_outline"
                            label="Add Academic Record Document"
                          >
                            <q-badge color="orange" floating>
                              {{ academicDocumentRequest.length }}
                            </q-badge>
                          </q-btn>
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
                                        :rules="[ val => val && val.length > 0 || 'Please enter Number of Copies']"
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
                                <q-card-section align="center">
                                  <div class="row justify-center q-col-gutter-md">
                                    <div class="col-lg-7 flex flex-center">
                                      <q-select
                                        v-model="docRequest.document"
                                        :options="academicDocument"
                                        label="Document"
                                        hint="Select your requesting document"
                                        color="secondary"
                                        style="width:500px;"
                                        :rules="[ val => val && val.length > 0 || 'Please select document from the list']"
                                      />
                                    </div>
                                    <div class="col-lg-3 flex flex-center">
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
                          <q-card-section align="center">
                            <div class="row justify-between q-col-gutter-lg">
                              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center" v-bind:class="{ 'col-lg-6': registrationInfo.reasonForRequest === 'OTHERS' }">
                                <q-select
                                  v-model="registrationInfo.reasonForRequest"
                                  :options="reason"
                                  label="Period Enrolled S.Y. From"
                                  hint="Select reason for requesting document(s)"
                                  color="secondary"
                                  :rules="[ val => val && val.length > 0 || 'Please enter reason for the request']"
                                />
                              </div>
                              <div class="col-12" v-if="registrationInfo.reasonForRequest === 'OTHERS'">
                                <q-input
                                  autogrow
                                  square
                                  v-model="registrationInfo.otherReasons"
                                  label="Other Reason for the Request"
                                  color="secondary"
                                  :rules="[ val => val && val.length > 0 || 'Please enter other reason for the request']"
                                >
                                  <template v-slot:prepend>
                                    <q-icon name="person" />
                                  </template>
                                  <template v-slot:append>
                                    <q-icon name="close" @click="registrationInfo.otherReasons = ''" class="cursor-pointer" />
                                  </template>
                                </q-input>
                              </div>
                            </div>
                          </q-card-section>
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
                                accept=".pdf"
                                hint="Upload a PDF File containing proofs that you are a Student of UERM"
                                :rules="[ val => val !== '' && val !== null || 'Please upload a proof that you are a former or a current student']"
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
import { mapGetters } from 'vuex'
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
          document: null,
          numberOfCopies: null
        }
      ],
      referenceNumberMessage: null,
      registrationInfo: {
        haveRecord: false,
        referenceNumber: null,
        // firstname: 'Bernard',
        // middlename: 'Tiaga',
        // lastname: 'Gresola',
        // address: 'Quezon City',
        // emailAddress: 'gresolabernard@gmail.com',
        // mobileNumber: '09053254071',
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
        // console.log(val)
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
  computed: {
    ...mapGetters({
      transactionDetails: 'students/transactionDetails'
    })
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
      console.log(formData)
      // await this.$store.dispatch('students/registerUser', formData)
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
          console.log(this.academicDocumentRequest[0].document)
        }
      })
    },
    formatBatch () {
      var currentYear = new Date().getFullYear() + 1
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
    async searchReferenceID (referenceID) {
      const validate = await this.authenticate()
      if (validate) {
        var reference = {
          referenceID: referenceID
        }
        await this.$store.dispatch('students/transactions', reference)
        if (this.transactionDetails.length > 0) {
          this.referenceNumberMessage = null
          this.registrationInfo.firstname = this.transactionDetails[0].FirstName
          this.registrationInfo.middlename = this.transactionDetails[0].MiddleName
          this.registrationInfo.lastname = this.transactionDetails[0].LastName
          this.registrationInfo.address = this.transactionDetails[0].Address
          this.registrationInfo.emailAddress = this.transactionDetails[0].Email
          this.registrationInfo.mobileNumber = this.transactionDetails[0].ContactNumber
        } else {
          this.referenceNumberMessage = 'Sorry, Reference Number not found. Please enter your personal details below.'
          this.registrationInfo.firstname = null
          this.registrationInfo.middlename = null
          this.registrationInfo.lastname = null
          this.registrationInfo.address = null
          this.registrationInfo.emailAddress = null
          this.registrationInfo.mobileNumber = null
        }
        
      }
    },
    async authenticate () {
      const checkAuth = await this.$store.dispatch('students/checkAuthentication')
      if (!checkAuth) {
        await this.$store.dispatch('students/authenticateAPI')
        return { validated: true }
      } else {
        const validate = await this.$store.dispatch('students/validateToken')
        if (validate.message === 'error') {
          await this.$store.dispatch('students/authenticateAPI')
          return { validated: true }
        } else {
          return { validated: true }
        }
      }
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