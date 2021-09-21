<template>
  <div class="fullscreen text-primary text-center q-pa-md flex flex-center bg-image">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style>

  .bg-image {
    background-image: url("~assets/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }


</style>