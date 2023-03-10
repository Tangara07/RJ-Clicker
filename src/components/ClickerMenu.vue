<script setup>
import {ref} from "vue";

let score = ref(0);
let addSize = ref(1);
let perSecond = ref(0);

let hamonUpdateCost = ref(10);
let foolUpdateCost = ref(2000);

let arrowUpdateCost = ref(20);
let splatinumUpdateCost = ref(1000);

let theWorldUpdateCost = ref(10000);

let bossHp = ref(100);
let deathCount = ref(0);
let interval = null;
let bossCount = ref(1);

function addToScore(){
  score.value += addSize.value;
  bossKillClick();
}

function increaseHitDamage(){
if(score.value >= hamonUpdateCost.value){
  score.value -= hamonUpdateCost.value;
  addSize.value++;
  hamonUpdateCost.value = parseInt(hamonUpdateCost.value * 1.25);
}
}

function increaseFoolDamage(){
  if(score.value >= foolUpdateCost.value){
    score.value -= foolUpdateCost.value;
    addSize.value += 100;
    foolUpdateCost.value = parseInt(foolUpdateCost.value * 3.15);
  }
  
}

function increaseArrowPerSecond(){
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

function increaseSPlatinumPerSecond(){
  if (score.value >= splatinumUpdateCost.value){
    clearInterval(interval);
    perSecond.value += 100;
    score.value -= splatinumUpdateCost.value;
    splatinumUpdateCost.value = parseInt(splatinumUpdateCost.value * 3);
    
    if (perSecond.value > 0) {
      startInterval();
    }
  }
}

function increaseTheWorldPerSecond(){
  if (score.value >= theWorldUpdateCost.value){
    clearInterval(interval);
    addSize.value += 500;
    perSecond.value += 300;
    score.value -= theWorldUpdateCost.value;
    theWorldUpdateCost.value = parseInt(theWorldUpdateCost.value * 5);
    
    if (perSecond.value > 0) {
      startInterval();
    }
  }
}

function startInterval() {
  interval = setInterval(() => {
    score.value += perSecond.value;
    bossKillTime();
  }, 1000)
}

function bossKillClick(){
bossHp.value -= addSize.value;


if (bossHp.value <= 0){
  deathCount.value++;

  if(deathCount.value < 20){

  score.value += 500;
  }
  else if (deathCount.value >= 20){
    score.value += 1000;
  }
  else if (deathCount.value >= 40){
    score.value += 2000;
  }
  else if (deathCount.value >= 60){
    score.value += 5000;
  }


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
              <v-img v-if="bossCount==1" src="../assets/pics/rubick.png"></v-img>
              <v-img v-if="bossCount==2" src="../assets/pics/marton.png"></v-img>
              <v-img v-if="bossCount==3" src="../assets/pics/robi.png"></v-img>
            </v-avatar>
          <v-spacer></v-spacer>
        </v-col>

      </v-row>
    </v-card>
    
    <v-card class="rounded-card" variant="outlined">

      <v-row> 

        <v-col>
          <v-btn class="btn-hit" @click="addToScore" rounded="pill" variant="outlined">Hit {{ addSize }} HP</v-btn>
        </v-col>
        
        <v-spacer></v-spacer>

        <v-col>
          <v-btn class="btn-hamon" @click="increaseHitDamage" rounded="pill" variant="outlined">+ 1 on Damage
            <v-avatar>
              <v-img 
                src="../assets/pics/hamon.png"
                alt="HAMON">
              </v-img>
            </v-avatar>
          </v-btn>
          <span >Cost: {{ hamonUpdateCost }}</span>
        </v-col>

        <v-spacer></v-spacer>
      
        <v-col>
          <v-btn class="btn-arrow" @click="increaseArrowPerSecond" rounded="pill" variant="outlined">+ 1 on Damage per Second
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

      <v-row>
        <v-col v-show="deathCount >= 20">
          <v-btn class="btn-fool" @click="increaseFoolDamage" rounded="pill" variant="outlined" >The Fool attack: +100 Damage per Hit
            <v-avatar>
                <v-img 
                  src="../assets/pics/iggi.png"
                  alt="TheFool">
                </v-img>
              </v-avatar>
          </v-btn>
          <span class="text-wrap">Cost: {{ foolUpdateCost }}</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-show="deathCount >= 50">
          <v-btn class="btn-splatinum" @click="increaseSPlatinumPerSecond" rounded="pill" variant="outlined">Star Platinum attack: +100 Damage per Second
            <v-avatar>
                <v-img 
                  src="../assets/pics/star_platinum.png"
                  alt="StarPlatinum">
                </v-img>
              </v-avatar>
          </v-btn>
          <span class="text-wrap">Cost: {{ splatinumUpdateCost }}</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-show="deathCount >= 100">
          <v-btn class="btn-theworld" @click="increaseTheWorldPerSecond" rounded="pill" variant="outlined">The World attack: +500 Damage per Hit and +300 Damage per Second
            <v-avatar>
                <v-img 
                  src="../assets/pics/dio.png"
                  alt="TheWorld">
                </v-img>
              </v-avatar>
          </v-btn>
          <span class="text-wrap">Cost: {{ theWorldUpdateCost }}</span>
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

