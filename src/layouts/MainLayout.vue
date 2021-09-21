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
</script>

<style>

  .bg-image {
    background-image: url("~assets/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }


</style>