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

html { 
  overflow-y: hidden !important 
}

body{
  background: url('./assets/pics/sbr.jpg')no-repeat center center fixed !important; 
  background-size: cover !important;
}

@font-face {
  font-family: 'SF_Fedora';
  src: url('./assets/font/SF_Fedora.ttf');
}

.v-card{
  font-family: SF_Fedora; 
}

</style>
