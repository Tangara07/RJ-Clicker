<script setup>
import {ref} from "vue";
let score = ref(0);
let addSize = ref(1);
let perSecond = ref(0);
//let totalDamage = 0;
let hamonUpdateCost = ref(10);
let arrowUpdateCost = ref(20);
let bossHp = ref(100);
let deathCount = ref(0);
let interval = null;

function addToScore(){
  score.value += addSize.value;
  //totalDamage++;
  bossKillClick();
}

function increaseAddSize(){
if(score.value >= hamonUpdateCost.value){
  score.value -= hamonUpdateCost.value;
  addSize.value++;
  hamonUpdateCost.value = parseInt(hamonUpdateCost.value * 1.25);
}
}
function startInterval() {
  interval = setInterval(() => {
    score.value += perSecond.value;
    bossKillTime();
  }, 1000)
}
function increasePerSecond(){
  if (score.value >= arrowUpdateCost.value){
    clearInterval(interval);
    perSecond.value++;
    score.value -= arrowUpdateCost.value;
    arrowUpdateCost.value = parseInt(arrowUpdateCost.value * 1.75);
    
    if (perSecond.value > 0) {
      startInterval();
    }
  }
}

function bossKillClick(){
bossHp.value -= addSize.value;


if (bossHp.value <= 0){
  deathCount.value++;

  score.value += 500;
  bossHp.value = 100 * deathCount.value;
}
}

function bossKillTime(){
  bossHp.value -= perSecond.value;

    if (bossHp.value <= 0){
    deathCount.value++;

    score.value += 500;
    bossHp.value = 100 * deathCount.value;
  }
}

</script>

<template>
  <v-app>
  <div id="app" v-cloak>
    <div class="stats">
      <v-card class="rounded-card" title="RJ-Clicker!" variant="outlined" >

        <span class="clicks">Total Points: {{ score }}</span>
      <v-spacer></v-spacer>
        <span class="perSecond">Damage per Second: {{ perSecond}}</span>
        <v-spacer></v-spacer>
        <v-avatar size="80" rounded="0">
              <v-img 
              src="../assets/pics/milker.jpeg"
              alt="BOSS">
              </v-img>
        </v-avatar>
        <v-spacer></v-spacer>
        <span class="clicks">Boss HP {{ bossHp }}</span>
        <v-spacer></v-spacer>
        <span class="clicks">Boss killed {{ deathCount }} times</span>
    </v-card>
    </div>
  
    <div class="score"></div>
    
    <v-card class="rounded-card" variant="outlined">
    <v-btn class="btn-add" @click="addToScore" rounded="pill" variant="outlined">Hit {{ addSize }} HP</v-btn>
  
        <div class="shop">

          <v-btn class="btn-hamon" @click="increaseAddSize" rounded="pill" variant="outlined">+ 1 on Damage
            <v-avatar>
              <v-img 
              src="../assets/pics/hamon.png"
              alt="HAMON">
              </v-img>
            </v-avatar>
          </v-btn>
          <v-spacer></v-spacer>
          <span>Cost: {{ hamonUpdateCost }}</span>

      <v-spacer></v-spacer>
      
        <v-btn class="btn-arrow" @click="increasePerSecond" rounded="pill" variant="outlined">+ 1 on Damage per Second
          <v-avatar>
              <v-img 
              src="../assets/pics/arrow.png"
              alt="ARROW">
              </v-img>
            </v-avatar>
        </v-btn>
        <v-spacer></v-spacer>
        <span class="text-wrap">Cost: {{ arrowUpdateCost }}</span>

      </div>
    </v-card>
  
  </div> 
  </v-app>
   
  </template>

<style>
html {
  box-sizing: border-box;
}
*{
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}
body{
  /* background: url('./assets/pics/morio.jpg')no-repeat center center fixed !important; */
  /* background-size: cover; */

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
@font-face {
  font-family: 'SF_Fedora';
  src: url('../assets/font/SF_Fedora.ttf');
}

.v-btn{
  color: #EC008C !important;
  background-color: #000000;
}

.rounded-card{
    border-radius:50px;
    padding: 5%;
}

#app{
  font-family: SF_Fedora;
}

</style>

