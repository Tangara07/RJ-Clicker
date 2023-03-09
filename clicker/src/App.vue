<template>
  <v-app >
    <v-main>
        <ClickerMenu/>
    </v-main>
  </v-app>
</template>

<script>
import ClickerMenu from './components/ClickerMenu.vue'

export default {
  name: 'App',

  components: {
    ClickerMenu,
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
