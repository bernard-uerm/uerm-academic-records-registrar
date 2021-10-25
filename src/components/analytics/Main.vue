<template>
  <div class="row justify-center q-pa-md">
    <div class="col-lg-12 col-md-12 col-xs-12">
      <q-card style="background:linear-gradient(to right, #26A69A , #1976D2)">
        <q-card-section>
          <q-card>
            <q-card-section align="center" class="text-weight-thin text-h5 text-white bg-primary">
              UERM ACADEMIC RECORDS - ANALYTICS
            </q-card-section>
            <q-card-section>
              <q-card-section>
                <tracker :requestData="this.academicRequestRecords"></tracker>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <q-card>
            
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tracker from 'components/others/Tracker.vue'
export default {
  components: { Tracker },
  name: 'AnalyticsMain',
  async mounted () {
    await this.getAllTransactions()
  },
  watch: {
    academicRequestRecords (val) {
      console.log(val, 'vaklvalvavla')
    }
  },
  computed: {
    ...mapGetters({
      academicRequestRecords: 'records/transactionDetails'
    })
  },
  methods: {
    async getAllTransactions () {
      const validate = await this.authenticate()
      if (validate) {
        await this.$store.dispatch('records/transactions')
      }
    },
    async authenticate () {
      const checkAuth = await this.$store.dispatch('auth/checkAuthentication')
      if (!checkAuth) {
        await this.$store.dispatch('auth/authenticateAPI')
        return { validated: true }
      } else {
        const validate = await this.$store.dispatch('auth/validateToken')
        if (validate.message === 'error') {
          await this.$store.dispatch('auth/authenticateAPI')
          return { validated: true }
        } else {
          return { validated: true }
        }
      }
    }
  }
}
</script>