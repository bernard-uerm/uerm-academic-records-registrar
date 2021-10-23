<template>
  <q-page>
    <dashboard></dashboard>
  </q-page>
</template>

<script>
import Dashboard from 'src/components/Dashboard.vue';
// import { mapGetters } from 'vuex'
export default {
  components: { Dashboard },
  name: 'Students',
  data () {
    return {
      isLoggedIn: false
    }
  },
  // computed: {
  //   ...mapGetters({
  //     studentCredentials: 'students/studentCredentials'
  //   })
  // },
  // watch: {
  //   studentCredentials(val) {
  //     if (val) {
  //       this.isLoggedIn = true
  //     }
  //   }
  // },
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