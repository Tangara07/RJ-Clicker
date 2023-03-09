<template>
  <v-app >
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
}
</script>

<style>
body{
  background: url('./assets/pics/morio.jpg')no-repeat center center fixed !important; 
  background-size: cover !important;
}
</style>
