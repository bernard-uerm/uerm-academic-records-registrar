<template>
  <div class="row justify-center q-pa-md">
    <div class="col-lg-12 col-md-12 col-xs-12">
      <q-card style="background:linear-gradient(to right, #26A69A , #1976D2)">
        <q-card-section>
          <q-card>
            <q-card-section align="center" class="text-weight-thin text-h5 text-white bg-primary">
              UERM ACADEMIC RECORDS - ANALYTICS
            </q-card-section>
            <q-card-section v-if="!this.loading">
              <div class="row q-col-gutter-md">
                <div class="col-lg-6 col-sm-12 col-xs-12">
                  <q-card :class="`text-white bg-${detailedData.primaryColor} text-${detailedData.textColor}`">
                    <q-card-section>
                      <div class="row justify-center q-col-gutter-lg">
                        <q-icon :name="detailedData.icon" size="60px"></q-icon>
                        <span class="flex flex-center text-h5">
                          {{ detailedData.requests.length }}
                        </span>
                      </div>
                    </q-card-section>
                    <q-card-section :class="`q-mt-0 text-overline bg-${detailedData.secondaryColor}`" align="center">
                      {{ this.$route.params.id.toUpperCase() }} LAST 30 DAYS
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-lg-6 col-sm-12 col-xs-12">
                  <q-card>
                    <q-card-section align="center" :class="`text-white bg-${detailedData.primaryColor} text-${detailedData.textColor} text-overline`">
                      SEARCH ALL RECORDS
                    </q-card-section>
                    <q-card-section>
                      SEARCH
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>
            <q-card-section align="center" style="padding-top: 75px;" v-if="this.loading">
              <div class="text-h5 text-weight-thin">
                LOADING
              </div>
            </q-card-section>
            <q-inner-loading :showing="this.loading" style="padding-top: 35px;">
              <q-spinner-hourglass size="50px" color="secondary" />
            </q-inner-loading>
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
export default {
  name: 'AnalyticsDetailed',
  data () {
    return {
      loading: false,
      detailedData: {
        requests: [],
        primaryColor: 'secondary',
        secondaryColor: 'teal-7',
        textColor: 'white',
        icon: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      academicRequestRecords: 'records/transactionDetails'
    })
  },
  async mounted () {
    this.loading = true
    await this.getAllTransactions()
    this.loading = false
  },
  methods: {
    async getAllTransactions () {
      const validate = await this.authenticate()
      if (validate.validated) {
        await this.$store.dispatch('records/transactions')
        await this.formatData()
      }
    },
    formatData () {
      var status = ''
      var primaryColor = ''
      var secondaryColor = ''
      var textColor = ''
      var icon = ''
      if (this.$route.params.id === 'unverified') {
        status = 1
        primaryColor = 'yellow'
        secondaryColor = 'yellow-7'
        textColor = 'grey-8'
        icon = 'rule_folder'
      } else if (this.$route.params.id === 'verified') {
        status = 2
        primaryColor = 'green'
        secondaryColor = 'green-7'
        textColor = 'white'
        icon = 'drive_file_move'
      } else if (this.$route.params.id === 'intransit') {
        status = 3
        primaryColor = 'orange'
        secondaryColor = 'orange-7'
        textColor = 'white'
        icon = 'local_shipping'
      } else if (this.$route.params.id === 'delivered') {
        status = 4
        primaryColor = 'blue'
        secondaryColor = 'blue-7'
        textColor = 'white'
        icon = 'local_post_office'
      }
      if (this.academicRequestRecords.length > 0) {
        const filterVerified = this.academicRequestRecords.filter((verified) => verified.Status === status)
        this.detailedData.requests = filterVerified
        this.detailedData.primaryColor = primaryColor
        this.detailedData.secondaryColor = secondaryColor
        this.detailedData.textColor = textColor
        this.detailedData.icon = icon
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