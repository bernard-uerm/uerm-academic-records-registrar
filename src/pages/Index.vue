<template>
  <q-page class="flex flex-center">
    <q-card square style="width:800px;max-width:900px;background:linear-gradient(to right, #1976D2 , #26A69A)" class="q-ma-md shadow-15">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-lg-5 col-xl-5 col-md-5 col-sm-12 col-xs-12">
            <q-card square class="shadow-15" style="max-height:height:415px;">
              <q-card-section class="bg-primary text-white text-h5 text-weight-thin" align="center">
                UERM ACADEME
              </q-card-section>
              <q-card-section class="text-body1" style="height:268px;" align="center">
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
            <q-card square class="shadow-15" style="height:415px;">
              <q-form
                @keydown.enter.prevent="loginUser"
                ref="loginForm"
              >
                <q-card-section align="center" class="text-h5 text-weight-thin text-white bg-secondary">
                  STUDENT LOGIN
                </q-card-section>
                <q-card-section>
                  <q-input
                    :autofocus="true"
                    square
                    v-model="login.username"
                    type="text"
                    label="Username"
                    class="q-mt-md"
                    color="primary"
                    :rules="[ val => val && val.length > 0 || 'Please enter your Username']"
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
                    color="primary"
                    :rules="[ val => val && val.length > 0 || 'Please enter your Password']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon name="close" @click="login.password = ''" class="cursor-pointer" />
                    </template>
                  </q-input>
                </q-card-section>
                <q-card-section align="center">
                  <q-chip clickable @click="forgotPassword" color="orange" text-color="white" icon="lock">
                    Forgot Password?
                  </q-chip>
                </q-card-section>
                <q-card-section class="bg-secondary">
                  <q-btn
                    flat
                    size="lg"
                    type="submit"
                    @click="login"
                    icon="login"
                    :class="`full-width full-height text-white`"
                    label="Log In"
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
      login: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    loginUser () {

    },
    forgotPassword () {
      console.log(forgotPassword)
    }
  }
}
</script>
