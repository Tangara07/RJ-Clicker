<script>

import bossListVue from '../assets/vue/bosses.vue'
import upgradesPerHitVue from '../assets/vue/upgradesPerHit.vue'
import upgradesPerSecondVue from '../assets/vue/upgradesPerSecond.vue'
import { getDatabase, ref, set, onValue} from "firebase/database";
import { auth } from '../firebase/init.js'

export default {
  data(){
    return{
      score: 0,
      addSize: 1,
      perSecond: 0, 
      multipicator: 0,  

      hpNow: null,

      deathCount: 0,
      interval: null,

      overlay: false,

      index: 0,  

      bossList: bossListVue,
      upgradesPerHit: upgradesPerHitVue,
      upgradesPerSecond: upgradesPerSecondVue,

      disabled: false,

      snackCount: 10,

      snackbar: false,
      text: 'NEW UPGRADE!!!',
      timeout: 1000,

    };
  },

  methods: {

  snack(){
    
    if ((this.deathCount % this.snackCount) == 0 && this.deathCount != 0){
      this.snackbar = true;
      this.snackCount += 10;
    }
  },

  addToScore(){
    this.bossKillClick();
  },

  increaseHitDamage(index){
    if(this.score >= this.upgradesPerHit[index].cost){
      this.score -= this.upgradesPerHit[index].cost;
      this.addSize += this.upgradesPerHit[index].dmg;
      this.upgradesPerHit[index].cost = parseInt(this.upgradesPerHit[index].cost * this.upgradesPerHit[index].incrCost);
    }
  },

  increasePerSecond(index){
    if (this.score >= this.upgradesPerSecond[index].cost){
      clearInterval(this.interval);
      this.perSecond += this.upgradesPerSecond[index].dmg;
      this.score -= this.upgradesPerSecond[index].cost;
      this.upgradesPerSecond[index].cost = parseInt(this.upgradesPerSecond[index].cost * this.upgradesPerSecond[index].incrCost);

      if (this.perSecond > 0) {
        this.startInterval();
      }
    }
  },

  startInterval() {
    this.interval = setInterval(() => {
      this.bossKillTime();
    }, 1000)
  },

  bossKillClick(){
    this.bossList[this.index].hp -= this.addSize;

    this.disabled = true
    setTimeout(() => {
      this.disabled = false
    }, 100);    

    this.snack();

    this.switchBossIdx();
  },

  bossKillTime(){
    this.bossList[this.index].hp -= this.perSecond;
    this.switchBossIdx();

    this.snack();
  },

  

  switchBossIdx() {

    if (this.bossList[this.index].hp <= 0){
      this.deathCount++;
      this.score += this.bossList[this.index].reward; 
    }

    if (this.bossList[this.index].hp <= 0){
      this.index++;

      if(this.index < this.bossList.length - 1){
        this.hpNow = bossListVue[this.index].hp;
      }

      if (this.index > this.bossList.length - 1){
        this.multipicator += 4
        this.bossList = bossListVue;
        this.bossList.forEach(key => key.hp *= this.multipicator);
        this.bossList.forEach(key => key.reward *= this.multipicator);
        this.index = 0;
      }
  }   
  },

  },

  computed: {
  switchBoss() {
    return this.bossList[this.index].image;
  },

  switchBossName() {
    return this.bossList[this.index].name;
  },

  computedByImage() {
    return this.bossList[this.index].part;
  },

  countPerCent(){
    return `${Math.round(100 * (this.bossList[this.index].hp / bossListVue[this.index].hp))}%`;
  },
  },

  mounted() { 
  const db = getDatabase();
  const starCountRef = ref(db, 'users/' + auth.currentUser.uid);
  this.hpNow = bossListVue[this.index].hp;
  onValue(starCountRef, (snapshot) => {
    this.score = snapshot.val().score;
    this.addSize = snapshot.val().addSize;
    this.perSecond = snapshot.val().perSecond;
    this.deathCount = snapshot.val().deathCount;
    this.index = snapshot.val().index;
    this.multipicator = snapshot.val().multipicator;
    this.bossList = snapshot.val().bossList;
    this.upgradesPerHit = snapshot.val().upgradesPerHit;
    this.upgradesPerSecond = snapshot.val().upgradesPerSecond;
  });
  this.startInterval();
  },

  watch: {
  score() {
    const db = getDatabase();
    set(ref(db, 'users/' + auth.currentUser.uid), {
      score: this.score,
      addSize: this.addSize,
      perSecond: this.perSecond,  
      deathCount: this.deathCount, 
      index: this.index,
      multipicator: this.multipicator,
      bossList: this.bossList,
      upgradesPerHit: this.upgradesPerHit,
      upgradesPerSecond: this.upgradesPerSecond,
    });
  }
  }
}

</script>

<template>
  
  <v-app>
    <v-card  height="100%" class="cardBackground rounded-card justify-center" title="RJ-Clicker!" variant="outlined" v-bind:style="{ backgroundImage: 'url(' + computedByImage + ')' }">
      <v-row>

        <v-col>
          <v-card-text class="text-center">Total Points: {{ score }} </v-card-text>
        </v-col>
          
        <v-col>
          <v-card-text class="perSecond text-center">Damage per Second: {{ perSecond}}</v-card-text>
        </v-col>
            
        <v-col>
          <v-card-text class="text-center">Boss killed <v-spacer></v-spacer>{{ deathCount }} <v-spacer></v-spacer> times</v-card-text>        
        </v-col>

      </v-row>

      <v-row class="hpBar">
        <v-progress-linear :max="this.hpNow" rounded color="red" model-value="20" :height="20" v-model="this.bossList[this.index].hp">{{ countPerCent }}</v-progress-linear>
      </v-row>

      <v-row>

        <v-col>
          <v-card-text class="text-center">
          <v-avatar :class="{ blink: disabled }" size="400" rounded="0">
            <v-img 
              @click="addToScore()"
              v-bind:src="switchBoss">
            </v-img>
          </v-avatar>
          </v-card-text>
        </v-col>
    </v-row>

    <v-row>

    <v-col>
      <v-card-text class="text-center">
          <v-btn @click="overlay = !overlay" rounded="pill" variant="outlined">Menu
            <v-overlay v-model="overlay" class="align-center justify-center" scroll-strategy="reposition">
              <v-card class="rounded-card ovCard" width="600" variant="outlined">
              <div class="v-card__text my-list"> 
              <v-row>
              <v-col>
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(0)" rounded="pill" variant="outlined">{{ upgradesPerHit[0].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[0].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[0].path"
                    >
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[0].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col>
                <v-btn class="btn-arrow" @click="increasePerSecond(0)" rounded="pill" variant="outlined">{{ upgradesPerSecond[0].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[0].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[0].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[0].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>
              
              <v-col v-show="deathCount >= 10">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(1)" rounded="pill" variant="outlined">{{ upgradesPerHit[1].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[1].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[1].path"
                    >
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[1].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 20">
                <v-btn class="btn-arrow" @click="increasePerSecond(1)" rounded="pill" variant="outlined">{{ upgradesPerSecond[1].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[1].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[1].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[1].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 30">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(2)" rounded="pill" variant="outlined">{{ upgradesPerHit[2].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[2].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[2].path"
                    >
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[2].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 40">
                <v-btn class="btn-arrow" @click="increasePerSecond(2)" rounded="pill" variant="outlined">{{ upgradesPerSecond[2].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[2].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[2].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[2].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 50">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(3)" rounded="pill" variant="outlined">{{ upgradesPerHit[3].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[3].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[3].path"
                    >
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[3].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 60">
                <v-btn class="btn-arrow" @click="increasePerSecond(3)" rounded="pill" variant="outlined">{{ upgradesPerSecond[3].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[3].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[3].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[3].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 70">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(4)" rounded="pill" variant="outlined">{{ upgradesPerHit[4].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[4].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[4].path"
                    >
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[4].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 80">
                <v-btn class="btn-arrow" @click="increasePerSecond(4)" rounded="pill" variant="outlined">{{ upgradesPerSecond[4].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[4].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[4].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[4].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 90">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(5)" rounded="pill" variant="outlined">{{ upgradesPerHit[5].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[5].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[5].path">
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[5].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 100">
                <v-btn class="btn-arrow" @click="increasePerSecond(5)" rounded="pill" variant="outlined">{{ upgradesPerSecond[5].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[5].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[5].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[5].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 110">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(6)" rounded="pill" variant="outlined">{{ upgradesPerHit[6].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[6].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[6].path">
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[6].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 120">
                <v-btn class="btn-arrow" @click="increasePerSecond(6)" rounded="pill" variant="outlined">{{ upgradesPerSecond[6].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[6].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[6].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[6].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 130">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(7)" rounded="pill" variant="outlined">{{ upgradesPerHit[7].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[7].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[7].path">
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[7].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 140">
                <v-btn class="btn-arrow" @click="increasePerSecond(7)" rounded="pill" variant="outlined">{{ upgradesPerSecond[7].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[7].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[7].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[7].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 150">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(8)" rounded="pill" variant="outlined">{{ upgradesPerHit[8].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[8].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[8].path">
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[8].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 160">
                <v-btn class="btn-arrow" @click="increasePerSecond(8)" rounded="pill" variant="outlined">{{ upgradesPerSecond[8].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[8].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[8].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[8].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 170">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(9)" rounded="pill" variant="outlined">{{ upgradesPerHit[9].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[9].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[9].path">
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[9].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 180">
                <v-btn class="btn-arrow" @click="increasePerSecond(9)" rounded="pill" variant="outlined">{{ upgradesPerSecond[9].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[9].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[9].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[9].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 190">
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(10)" rounded="pill" variant="outlined">{{ upgradesPerHit[10].descr }}</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[10].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    v-bind:src="upgradesPerHit[10].path">
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[10].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col v-show="deathCount >= 200">
                <v-btn class="btn-arrow" @click="increasePerSecond(10)" rounded="pill" variant="outlined">{{ upgradesPerSecond[10].descr }}</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[10].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      v-bind:src="upgradesPerSecond[10].path"
                      >
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[10].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

            </v-row>
          </div>
            </v-card>
            </v-overlay>
          </v-btn>
        </v-card-text>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
          </v-snackbar>
        </v-col>

        <v-col>
          <v-row>
            <v-card-text class="text-center pink">{{switchBossName}}</v-card-text>
          </v-row>
        </v-col>

        <v-col>
          <v-card-text class="text-center pink" >Hit {{ addSize }} HP</v-card-text>
        </v-col>
      </v-row>
      
    </v-card>  
  </v-app>
  </template>

<style>

.hpBar{
  padding-left: 22%;
  padding-right: 22%;
}

.v-progress-linear{
  transition: width .75s ease;
  
}

.cardBackground{
  background-size: cover !important;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.7);
  border-color: #000000;
}

.upgradeText{
  font-size: small;
  font-family: SF_Fedora; 
}

.pink{
  color: #EC008C !important;
  font-size: x-large;
}

.v-card-title{
  color: #EC008C !important;
  font-size: xx-large;
  text-align: center;
}

.v-row{
  margin-top: 2%;
  margin-bottom: 2%;
}

body{
  /*padding-top: 25%;*/
  justify-content: center;
}

.v-btn{
  color: #EC008C !important;
  background-color: #000000;
}

.v-card-text{
  font-size: x-large;
}

.rounded-card{
    background-color: #333333;
    color: #ffffff;
}

.ovCard{
  padding-right: 1%;
}

.my-list {
  height: calc(70vh - 200px);
  overflow-y: auto;
}

.v-application.v-theme--light.v-layout.v-layout--full-height.v-locale--is-ltr {
  background: transparent;
}

body{
  background-color: #333333;
}

html {
  overflow: hidden !important;
}

.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
    0% {opacity: 0}
    49%{opacity: 0}
    50% {opacity: 1}
}

</style>

