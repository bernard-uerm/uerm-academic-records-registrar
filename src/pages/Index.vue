<template>
  <q-page class="flex flex-center">
  <!-- <q-page
    class="row justify-center items-center q-ma-lg"
  > -->
    <Main v-if="!isLoggedIn"></Main>
  </q-page>
</template>

<script>
import Main from 'src/components/Main.vue';
import { mapGetters } from 'vuex'

export default {
  components: { Main },
  name: 'Index',
  data () {
    return {
      isLoggedIn: false
    }
  },
  computed: {
    ...mapGetters({
      employeeInformation: 'employees/employeeInformation'
    })
  },
  watch: {
    studentCredentials(val) {
      try {
        if (val.NAME) {
          this.isLoggedIn = true
          this.$router.push('/registrar')

        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.checkAuthentication()
  },
  methods: {
    async checkAuthentication () {
      const checkCookies = this.$q.cookies.has('employee_code')
      if (checkCookies) {
        this.$router.push('/registrar')
        const employeeInfo = {
          username: this.$q.cookies.get('employee_code'),
          checking: true
        }
        await this.$store.dispatch('employees/loginEmployee', employeeInfo)
      }
      if (this.$q.localStorage.has('studentLogin')) {
        let studentID = this.$q.localStorage.getItem('studentID')
        const studentInfo = {
          studentNo: studentID,
          checking: true
        }
        await this.$store.dispatch('students/validateStudent', studentInfo)
      }
    },
  }
}
</script>
