<template>
  <v-app >
    <v-main>
      <div v-if="!isLoggedIn">
    <!-- login -->
    <template v-if="showLogin">
      <login-form @loggedIn="isLoggedIn = true"/>
      <p class="text-center fontColor">No account yet? <span @click="showLogin=false" class="logRegColor">Sign up</span> instead.</p>
    </template>
    <!-- or register -->
    <template v-else>
      <signup-form @loggedIn="isLoggedIn = true"/>
      <p class="text-center fontColor">Already registered? <span @click="showLogin=true" class="logRegColor">Login</span> instead.</p>
    </template>
  </div>
  <!-- is logged in -->
  <div v-else>
    <clicker-menu/>
  </div>
    </v-main>
  </v-app>
</template>

<script>
import ClickerMenu from './components/ClickerMenu.vue';
import LoginForm from './components/LoginForm.vue';
import SignupForm from './components/SignupForm.vue';
import { auth } from './firebase/init.js'

export default {
  name: 'App',

  components: {
    ClickerMenu,
    LoginForm,
    SignupForm,
  },

  data: () => ({
      isLoggedIn: false,
      showLogin: true,
      displayName: ''
  }),
  beforeUpdate() {
    if (auth.currentUser) {
      // set local 'displayName' to user's displayName
      this.displayName = auth.currentUser.displayName
    }
  }
}
</script>

<style>

.fontColor{
  color: white;
}

.logRegColor{
  color: #EC008C;
}


@font-face {
  font-family: 'SF_Fedora';
  src: url('./assets/font/SF_Fedora.ttf');
}

.v-card{
  font-family: SF_Fedora; 
}

</style>
