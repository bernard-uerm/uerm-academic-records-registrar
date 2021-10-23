<template>
  <div class="row justify-center q-pa-md">
    <div class="col-lg-12 col-md-12 col-xs-12">
      <q-card>
        <q-card-section>
          <q-card>
            <q-card-section align="center" class="text-weight-thin text-h5 text-white bg-primary">
              UERM ACADEMIC RECORDS - REGISTRAR
            </q-card-section>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-lg-3 col-sm-12 col-xs-12">
                  <q-card class="text-white bg-yellow text-grey-8">
                    <q-card-section>
                      <div class="row justify-center q-col-gutter-lg">
                        <q-icon name="rule_folder" size="60px"></q-icon>
                        <span class="flex flex-center text-h5">12345</span>
                      </div>
                    </q-card-section>
                    <q-card-section class="q-mt-0 text-h5 bg-yellow-7" align="center">
                      UNVERIFIED
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-lg-3 col-sm-12 col-xs-12">
                  <q-card class="text-white bg-positive">
                    <q-card-section>
                      <div class="row justify-center q-col-gutter-lg">
                        <q-icon name="drive_file_move" size="60px"></q-icon>
                        <span class="flex flex-center text-h5">12345</span>
                      </div>
                    </q-card-section>
                    <q-card-section class="q-mt-0 text-h5 bg-green-7" align="center">
                      VERIFIED
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-lg-3 col-sm-12  col-xs-12">
                  <q-card class="text-white bg-orange">
                    <q-card-section>
                      <div class="row justify-center q-col-gutter-lg">
                        <q-icon name="local_shipping" size="60px"></q-icon>
                        <span class="flex flex-center text-h5">12345</span>
                      </div>
                    </q-card-section>
                    <q-card-section class="q-mt-0 text-h5 bg-orange-7" align="center">
                      IN-TRANSIT
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-lg-3 col-sm-12  col-xs-12">
                  <q-card class="text-white bg-blue">
                    <q-card-section>
                      <div class="row justify-center q-col-gutter-lg">
                        <q-icon name="local_post_office" size="60px"></q-icon>
                        <span class="flex flex-center text-h5">12345</span>
                      </div>
                    </q-card-section>
                    <q-card-section class="q-mt-0 text-h5 bg-blue-7" align="center">
                      DELIVERED
                    </q-card-section>
                  </q-card>
                </div>
              </div>
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
                  <main-table :requestData="this.unverifiedRequests" :loading="this.loading"></main-table>
                </q-card-section>
              </q-tab-panel>
              <q-tab-panel name="verified">
                <q-card-section class="text-overline">
                  ACADEMIC RECORDS REQUEST - {{ this.tab.toUpperCase() }} FOR THE LAST 30 DAYS
                </q-card-section>
                <q-card-section>
                  <main-table :requestData="this.verifiedRequests" :loading="this.loading"></main-table>
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
import mainTable from './others/mainTable.vue'
export default {
  components: { mainTable },
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