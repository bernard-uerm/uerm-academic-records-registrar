<template>
  <q-layout view="lHh Lpr lFf" class="bg-image">
    <q-header elevated style="background:linear-gradient(to right, #26A69A , #1976D2)">
      <q-toolbar>
        <q-toolbar-title class="text-right text-uppercase">
          UERM Registrar
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="isLoggedIn"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class=""
      side="right"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          <q-card>
            <q-card-section align="center" class="text-overline">
              {{ this.loginInfo.name }}
              <q-separator></q-separator>
              <q-chip color="primary" size="sm" text-color="white" icon="person">
                {{this.loginInfo.position === null ? '' : this.loginInfo.position.toUpperCase() }}
              </q-chip>
            </q-card-section>
            <q-separator></q-separator>
            <EssentialLink
              v-for="link in essentialLinks"
              :key="link.title"
              v-bind="link"
            />
            <q-separator></q-separator>
            <q-card-section align="center">
              <q-btn color="primary" @click="logout" icon="logout" label="log out"></q-btn>
            </q-card-section>
          </q-card>
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Dashboard',
    caption: 'Your Dashboard',
    icon: 'fa fa-chart-area',
    link: 'https://quasar.dev'
  },
  // {
  //   title: 'Clearance',
  //   caption: 'Student Clearance',
  //   icon: 'school',
  //   link: 'https://quasar.dev'
  // },
];

import { mapGetters } from 'vuex'
export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      isLoggedIn: false,
      leftDrawerOpen: false,
      essentialLinks: linksList,
      loading: null,
      loginInfo: {
        name: null,
        position: null
      }
    }
  },
  computed: {
    ...mapGetters({
      employeeInformation: 'employees/employeeInformation'
    })
  },
  mounted () {
    this.checkAuthentication()
  },
  methods: {
    async checkAuthentication () {
      this.loading = true
      console.log(this.$q.cookies.has('isEmployeeLogin'))
      if (this.$q.cookies.has('isEmployeeLogin')) {
        let employeeID = this.$q.cookies.get('employee_code')
        const studentInfo = {
          username: employeeID,
          checking: true
        }
        const validatedStudent = await this.$store.dispatch('employees/loginEmployee', studentInfo)
        this.loginInfo.name = this.employeeInformation.fullName
        this.loginInfo.position = this.employeeInformation.position
      } else {
        this.$router.push('/')
      }
      this.loading = false
    },
    async logout () {
      await this.$store.dispatch('employees/logout')
      this.$router.push('/')
    }
  }
}
</script>


<style>
.bg-image {
  background-image: url("~assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>