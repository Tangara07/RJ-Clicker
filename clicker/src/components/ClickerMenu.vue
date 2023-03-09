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
let bossCount = ref(1);

let rubick = ref("../assets/pics/rubick.png");
let marton = ref("../assets/pics/matron.png");
let robi = ref("../assets/pics/robi.png"); 

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

  bossCount.value++;

  if(bossCount.value > 3){
    bossCount.value = 1;
  }
}
}

function bossKillTime(){
  bossHp.value -= perSecond.value;

    if (bossHp.value <= 0){
    deathCount.value++;

    score.value += 500;
    bossHp.value = 100 * deathCount.value;

    bossCount.value++;

    if(bossCount.value > 3){
    bossCount.value = 1;
    }
  }
}

function bossSummon(){

  let image = ref("../assets/pics/rubick.png");

  if (bossCount.value == 1){
    image.value = rubick.value;
  }
  else if (bossCount.value == 2){
    image.value = marton.value;
  }
  else if (bossCount.value == 3){
    image.value = robi.value;
  }

  return image;
}

</script>

<template>
  <v-app >
      <v-card class="rounded-card" title="RJ-Clicker!" variant="outlined">
        <v-row>
          <v-col>
            <span class="clicks">Total Points: <v-col>{{ score }}</v-col></span>
          </v-col>

          <v-spacer></v-spacer>

          <v-col>
            <span class="perSecond">Damage per Second: <v-col>{{ perSecond}}</v-col></span>
          </v-col>

          <v-spacer></v-spacer>

          <v-col>
            <span class="clicks">Boss HP <v-col>{{ bossHp }}</v-col></span>
          </v-col>
          
          <v-spacer></v-spacer>

          <v-col>
            <span class="clicks">Boss killed <v-col>{{ deathCount }}</v-col> times</span>
          </v-col>

          <v-col>
            <v-avatar size="200" rounded="0">
              <v-img 
                :src= "bossSummon()"
                alt="BOSS">
              </v-img>
            </v-avatar>
          <v-spacer></v-spacer>
        </v-col>

      </v-row>
    </v-card>
    
    <v-card class="rounded-card" variant="outlined">

      <v-row> 

        <v-col>
          <v-btn class="btn-add" @click="addToScore" rounded="pill" variant="outlined">Hit {{ addSize }} HP</v-btn>
        </v-col>
        
        <v-spacer></v-spacer>

        <v-col>
          <v-btn class="btn-hamon" @click="increaseAddSize" rounded="pill" variant="outlined">+ 1 on Damage
            <v-avatar>
              <v-img 
                src="../assets/pics/hamon.png"
                alt="HAMON">
              </v-img>
            </v-avatar>
          </v-btn>
          <span>Cost: {{ hamonUpdateCost }}</span>
        </v-col>

        <v-spacer></v-spacer>
      
        <v-col>
          <v-btn class="btn-arrow" @click="increasePerSecond" rounded="pill" variant="outlined">+ 1 on Damage per Second
            <v-avatar>
                <v-img 
                  src="../assets/pics/arrow.png"
                  alt="ARROW">
                </v-img>
              </v-avatar>
          </v-btn>
          <span class="text-wrap">Cost: {{ arrowUpdateCost }}</span>
        </v-col>
      </v-row> 
    </v-card> 
  </v-app>
  </template>

<style>

.v-card{
  padding: 2%;
}

body{
  /*padding-top: 25%;*/
  display: flex;
  justify-content: center;
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
    background-color: #333333;
    color: #ffffff;
}

.v-application.v-theme--light.v-layout.v-layout--full-height.v-locale--is-ltr {
  background: transparent;
}

#app{
  font-family: SF_Fedora; 
}
</style>

