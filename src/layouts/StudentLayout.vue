<template>
  <q-layout view="lHh Lpr lFf" class="bg-image">
    <q-header elevated v-if="isLoggedIn" style="background:linear-gradient(to right, #26A69A , #1976D2)">
      <q-toolbar>
        <q-toolbar-title class="text-right text-uppercase">
          UERM Student Portal
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
      v-if="isLoggedIn"
      side="right"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          <q-card>
            <q-card-section align="center">
              {{ studentCredentials.NAME }}
            </q-card-section>
            <q-card-section align="center">
              <q-btn color="primary" @click="logout" icon="logout" label="log out"></q-btn>
            </q-card-section>
          </q-card>
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
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
  {
    title: 'Clearance',
    caption: 'Student Clearance',
    icon: 'school',
    link: 'https://quasar.dev'
  },
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
      essentialLinks: linksList
    }
  },
  computed: {
    ...mapGetters({
      studentCredentials: 'students/studentCredentials'
    })
  },
  watch: {
    studentCredentials(val) {
      if (val) {
        this.isLoggedIn = true
      }
    }
  },
  mounted () {
    this.checkAuthentication()
  },
  methods: {
    async checkAuthentication () {
      if (this.$q.localStorage.has('studentLogin')) {
        let studentID = this.$q.localStorage.getItem('studentID')
        const studentInfo = {
          studentNo: studentID,
          checking: true
        }
        await this.$store.dispatch('students/validateStudent', studentInfo)
      } else {
        this.$router.push('/')
      }
    },
    async logout () {
      await this.$store.dispatch('students/logout')
      this.$router.push('/')
    }
  }
}
</script>
