<template>
  <q-page class="flex flex-center">
    <q-card square style="width:800px;max-width:900px;background:linear-gradient(to right, #1976D2 , #26A69A)" class="q-ma-md shadow-15">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-card square class="shadow-15">
              <q-form
                @keydown.enter.prevent="registerUser"
                ref="loginForm"
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
                      active-color="green"
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
                        done-color="secondary"
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
                        square
                        v-model="registrationInfo.address"
                        type="text"
                        label="Address"
                        done-color="secondary"
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
                        <q-btn @click="() => { done1 = true; step = 2 }" color="secondary" label="Continue" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="2"
                      title="Academic Information"
                      icon="create_new_folder"
                      :done="step > 2"
                      :header-nav="step > 2"
                      done-color="secondary"
                      active-color="green"
                    >
                      ACADEMIC INFORMATION HERE

                      <q-stepper-navigation align="center">
                        <q-btn @click="() => { done2 = true; step = 3 }" color="secondary" label="Continue" />
                        <q-btn flat @click="step = 1" color="secondary" label="Back" class="q-ml-sm" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="3"
                      title="Register"
                      icon="save"
                      :header-nav="step > 3"
                      done-color="secondary"
                      active-color="green"
                    >
                      DISCLAIMER
                      <q-stepper-navigation align="center">
                        <q-btn color="secondary" type="submit" @click="done3 = true" label="Finish" />
                        <q-btn flat @click="step = 2" color="secondary" label="Back" class="q-ml-sm" />
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
export default {
  name: 'Home',
  data () {
    return {
      step: 1,
      registrationInfo: {
        firstname: null,
        middlename: null,
        lastname: null,
        address: null
      }
    }
  },
  methods: {
    registerUser () {

    },
    forgotPassword () {
      console.log(forgotPassword)
    }
  }
}
</script>
