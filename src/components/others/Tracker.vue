<template>
  <div class="row q-col-gutter-md">
    <div class="col-lg-3 col-sm-12 col-xs-12">
      <q-card class="text-white bg-yellow text-grey-8 cursor-pointer" v-ripple.center @click="redirectAnalytics('unverified')">
        <q-card-section>
          <div class="row justify-center q-col-gutter-lg">
            <q-icon name="rule_folder" size="60px"></q-icon>
            <span class="flex flex-center text-h5">
              {{ unverified.length }}
            </span>
          </div>
        </q-card-section>
        <q-card-section class="q-mt-0 text-overline bg-yellow-7" align="center">
          UNVERIFIED
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-3 col-sm-12 col-xs-12">
      <q-card class="text-white bg-positive cursor-pointer" v-ripple.center @click="redirectAnalytics('verified')">
        <q-card-section>
          <div class="row justify-center q-col-gutter-lg">
            <q-icon name="drive_file_move" size="60px"></q-icon>
            <span class="flex flex-center text-h5">
              {{ verified.length }}
            </span>
          </div>
        </q-card-section>
        <q-card-section class="q-mt-0 text-overline bg-green-7" align="center">
          VERIFIED
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-3 col-sm-12  col-xs-12">
      <q-card class="text-white bg-orange cursor-pointer" v-ripple.center @click="redirectAnalytics('intransit')">
        <q-card-section>
          <div class="row justify-center q-col-gutter-lg">
            <q-icon name="local_shipping" size="60px"></q-icon>
            <span class="flex flex-center text-h5">
              {{ intransit.length }}
            </span>
          </div>
        </q-card-section>
        <q-card-section class="q-mt-0 text-overline bg-orange-7" align="center">
          IN-TRANSIT
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-3 col-sm-12  col-xs-12">
      <q-card class="text-white bg-blue cursor-pointer" v-ripple.center @click="redirectAnalytics('delivered')">
        <q-card-section>
          <div class="row justify-center q-col-gutter-lg">
            <q-icon name="local_post_office" size="60px"></q-icon>
            <span class="flex flex-center text-h5">
              {{ delivered.length }}
            </span>
          </div>
        </q-card-section>
        <q-card-section class="q-mt-0 text-overline bg-blue-7" align="center">
          DELIVERED
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ['requestData'],
  name: 'Tracker',
  data () {
    return {
      unverified: [],
      verified: [],
      intransit: [],
      delivered: []
    }
  },
  watch: {
    requestData (val) {
      this.formatTracking()
    }
  },
  mounted () {
    this.formatTracking()
  },
  methods: {
    formatTracking () {
      if (this.requestData.length > 0) {
        const filterVerified = this.requestData.filter((verified) => verified.Status === 2)
        this.verified = filterVerified

        const filterUnverified = this.requestData.filter((unverified) => unverified.Status === 1)
        this.unverified = filterUnverified

        const filterInTransit = this.requestData.filter((inTransit) => inTransit.Status === 3)
        this.intransit = filterInTransit

        const filterDelivered = this.requestData.filter((delivered) => delivered.Status === 4)
        this.delivered = filterDelivered
      }
    },
    redirectAnalytics (analytics) {
      this.$router.push(`/analytics/analytics-detailed/${analytics}`)
    }
  }
}
</script>