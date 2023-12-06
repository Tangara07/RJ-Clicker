<template>
    <form @submit.prevent="signUp">
        <v-card class="rounded-xl pa-15 mx-auto cardWith text-center" title="Sign Up!">
            <v-text-field type="imput" class="centered-input" placeholder="Username" required v-model="username"> </v-text-field>
            <v-text-field type="email" class="centered-input" placeholder="Email" required v-model="email"> </v-text-field>
            <v-text-field type="password" class="centered-input" placeholder="Password" required v-model="password"> </v-text-field>
            <v-btn type="submit">Sign Up!</v-btn>
        </v-card>
    </form>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
  import { auth } from '../firebase/init.js'
  
  export default {
    data() {
      return {
        username: '',
        email:    '',
        password: ''
      }
    },
    methods: {
      signUp() {
        // register and login user
        createUserWithEmailAndPassword(auth,this.email,this.password)
        .then(() => {
  
          // update 'displayName'
          updateProfile(auth.currentUser, {
            displayName: this.username
            
          })
          .then(() => {
            this.$emit('loggedIn')
          })
  
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

</style>