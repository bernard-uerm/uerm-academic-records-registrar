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
      studentCredentials: 'students/studentCredentials'
    })
  },
  watch: {
    studentCredentials(val) {
      try {
        if (val.NAME) {
          this.isLoggedIn = true
          this.$router.push('/students')
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
