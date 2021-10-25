<template>
  <div class="row justify-center q-pa-md">
    <div class="col-lg-12 col-md-12 col-xs-12">
      <q-card style="background:linear-gradient(to right, #26A69A , #1976D2)">
        <q-card-section>
          <q-card>
            <q-card-section align="center" class="text-weight-thin text-h5 text-white bg-primary">
              UERM ACADEMIC RECORDS - REGISTRAR
            </q-card-section>
            <q-card-section>
              <tracker :requestData="this.academicRequestRecords"></tracker>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-white bg-secondary"
              active-color="white"
              indicator-color="white"
              align="justify"
              narrow-indicator
            >
              <q-tab name="unverified" label="UNVERIFIED" />
              <q-tab name="verified" label="VERIFIED" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="unverified">
                <q-card-section class="text-overline">
                  ACADEMIC RECORDS REQUEST - {{ this.tab.toUpperCase() }} FOR THE LAST 30 DAYS
                </q-card-section>
                <q-card-section>
                  <MainTable :requestData="this.unverifiedRequests" :loading="this.loading"></MainTable>
                </q-card-section>
              </q-tab-panel>
              <q-tab-panel name="verified">
                <q-card-section class="text-overline">
                  ACADEMIC RECORDS REQUEST - {{ this.tab.toUpperCase() }} FOR THE LAST 30 DAYS
                </q-card-section>
                <q-card-section>
                  <MainTable :requestData="this.verifiedRequests" :loading="this.loading"></MainTable>
                </q-card-section>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainTable from './others/Table.vue'
import Tracker from './others/Tracker.vue'
export default {
  components: { MainTable, Tracker },
  name: 'Dashboard',
  data () {
    return {
      tab: 'unverified',
      loading: false,
      verifiedRequests: [],
      unverifiedRequests: []
    }
  },
  watch: {
    tab (val) {
      this.getAllTransactions()
    }
  },
  computed: {
    ...mapGetters({
      academicRequestRecords: 'records/transactionDetails'
    })
  },
  mounted () {
    this.getAllTransactions()
  },
  methods: {
    async getAllTransactions (referenceID) {
      const validate = await this.authenticate()
      if (validate) {
        this.loading = true
        await this.$store.dispatch('records/transactions')
        await this.formatData()
        this.loading = false
      }
    },
    formatData () {
      if (this.academicRequestRecords.length > 0) {
        const filterVerified = this.academicRequestRecords.filter((verified) => verified.Status >= 2)
        this.verifiedRequests = filterVerified

        const filterUnverified = this.academicRequestRecords.filter((unverified) => unverified.Status === 1)
        this.unverifiedRequests = filterUnverified
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