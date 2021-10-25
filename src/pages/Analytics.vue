<template>
  <q-page>
    <AnalyticsMain></AnalyticsMain>
  </q-page>
</template>

<script>
import AnalyticsMain from 'src/components/analytics/Main.vue';
// import { mapGetters } from 'vuex'
export default {
  components: { AnalyticsMain },
  name: 'Analytics',
}
</script>