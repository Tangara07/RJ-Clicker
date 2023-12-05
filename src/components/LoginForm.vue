<template>
    <form @submit.prevent="login">
    <v-card class="rounded-xl pa-15 mx-auto cardWith text-center" title="Log In!">
        <v-text-field type="email" class="centered-input" placeholder="Email" required v-model="email"> </v-text-field>
        <v-text-field type="password" class="centered-input" placeholder="Password" required v-model="password"> </v-text-field>
        <v-btn type="submit">Log in!</v-btn>
    </v-card>
    </form>
  </template>
  
  <script>
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../firebase/init.js'
  
  export default {
    data() {
      return {
        email:    '',
        password: ''
      }
    },
    methods: {
      login() {
        // login user
        signInWithEmailAndPassword(auth,this.email,this.password)
        .then(() => {
          // emit event for member area
          this.$emit('loggedIn')
        })
      }
    }
  }
  </script>


<style>
    .centered-input input {
      text-align: center
    }

    .v-text-field{
        color: white;
    }

    .cardWith {
        width: 60dvh;
        background: url('../assets/pics/log_reg.jpg')  !important;
        background-size: contain !important;
        box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.8);
        border-color: #000000;
    }
</style>