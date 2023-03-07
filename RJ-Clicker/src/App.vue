<script setup>
import { parse } from "@vue/compiler-dom";
import {ref} from "vue";
let score = ref(0);
let addSize = ref(1);
let perSecond = ref(0);
let totalDamage = ref(0);
let hamonUpdateCost = ref(10);
let arrowUpdateCost = ref(20);
let interval = null;

function addToScore(){
  score.value += addSize.value;
  totalDamage++;
}

function increaseAddSize(){
if(score.value >= hamonUpdateCost.value){
  score.value -= hamonUpdateCost.value;
  addSize.value++;
  hamonUpdateCost.value = parseInt(hamonUpdateCost.value * 1,75);
}
}

function startInterval() {
  interval = setInterval(() => {
    score.value += perSecond.value;
  }, 1000)
}

function increasePerSecond(){
  if (score.value >= arrowUpdateCost.value){
    clearInterval(interval);
    perSecond.value++;
    score.value -= arrowUpdateCost.value;
    arrowUpdateCost.value = parseInt(arrowUpdateCost.value * 2,15);
    
    if (perSecond.value > 0) {
      startInterval();
    }
  }
}

</script>

<template>
  <v-app>
<div id="app" v-cloak>
  <div class="stats">
    <span class="clicks">Total Damage: {{ score }}</span>
    <span class="perSecond">Damage per Second: {{ perSecond}}</span>
  </div>

  <div class="score"></div>

  <button class="btn-add" @click="addToScore">CLICK + {{ addSize }}</button>

  <div class="shop">
    <button class="btn-hamon" @click="increaseAddSize">+ 1 on Damage</button>
    <span>Cost: {{ hamonUpdateCost }}</span>
    <button class="btn-arrow" @click="increasePerSecond">+ 1 on Damage per Second</button>
    <span>Cost: {{ arrowUpdateCost }}</span>
  </div>

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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.v-application{
  font-family: 'SF_Fedora';
  font-size: 12px;
}

@font-face {
  font-family: 'SF_Fedora';
  src: url('./assets/fonts/SF_Fedora.ttf');
}

#app{
  
}
</style>
