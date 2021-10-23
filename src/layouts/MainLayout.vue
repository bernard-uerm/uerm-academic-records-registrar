<template>
  <div  class="bg-image">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
  export default {
    mounted( ){
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