<script>

import bossList from '../assets/vue/bosses.vue'
import upgradesPerHit from '../assets/vue/upgradesPerHit.vue'
import upgradesPerSecond from '../assets/vue/upgradesPerSecond.vue'

export default {
  data(){
    return{
      score: 0,
      addSize: 200,
      perSecond: 0,   

      deathCount: 0,
      interval: null,

      overlay: false,

      index: 0,  

      bossList: bossList,
      upgradesPerHit: upgradesPerHit,
      upgradesPerSecond: upgradesPerSecond,

      disabled: false,

      snackCount: 10,

      snackbar: false,
      text: 'NEW UPGRADE!!!',
      timeout: 750,
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
      this.score += this.addSize;
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
        this.score += this.perSecond;
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

        if (this.index > this.bossList.length - 1){
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
    }
  }
}

</script>

<template>
  <v-app>
    <v-card class="rounded-card cardMarg" title="RJ-Clicker!" variant="outlined">
      <v-row>

        <v-col>
          <span>Total Points: {{ score }} </span>
        </v-col>
          
        <v-col>
          <span class="perSecond">Damage per Second: {{ perSecond}}</span>
        </v-col>
            
        <v-col>
          <span>Boss killed <v-spacer></v-spacer>{{ deathCount }} <v-spacer></v-spacer> times</span>        
        </v-col>

      </v-row>

      <v-row>

        <v-col>
          <v-spacer></v-spacer>
          <v-row>
            <span class="pink">{{switchBossName}}</span>
          </v-row>

          <v-row>
            <span class="pink">HP: {{ bossList[this.index].hp }}</span>
          </v-row>
        </v-col>

        <v-col>
          <div>
          <v-avatar :class="{ blink: disabled }" size="250" rounded="0">
            <v-img 
              @click="addToScore()"
              v-bind:src="switchBoss">
            </v-img>
          </v-avatar>
          </div>
        </v-col>
    </v-row>

    <v-row>

    <v-col>
          <v-btn @click="overlay = !overlay" rounded="pill" variant="outlined">Menu
            <v-overlay v-model="overlay" class="align-center justify-center" scroll-strategy="reposition">
              <v-card class="rounded-card ovCard" width="600" variant="outlined">
              <div class="v-card__text my-list"> 
              <v-row>
              <v-col>
                <v-btn class="btn-hamon" @click="this.increaseHitDamage(0)" rounded="pill" variant="outlined">+ 1 on Damage</v-btn> 
                <v-spacer></v-spacer>          
                <span >Cost: {{ upgradesPerHit[0].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img
                    src="../assets/pics/upgrades/hamon.png"
                    alt="HAMON">
                  </v-img>
                  <v-tooltip
                  activator="parent"
                  max-width="300">
                    <span class="upgradeText">{{ upgradesPerHit[0].info }}</span>
                </v-tooltip>
                </v-avatar>     
              </v-col>
      
              <v-col>
                <v-btn class="btn-arrow" @click="increasePerSecond(0)" rounded="pill" variant="outlined">+ 1 on Damage per Second</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[0].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                    <v-img  
                      src="../assets/pics/upgrades/arrow.png"
                      alt="ARROW">
                    </v-img>
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[0].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>
       
              <v-col v-show="deathCount >= 10">
                <v-btn class="btn-fool" @click="increaseHitDamage(1)" rounded="pill" variant="outlined" >The Fool attack: +100 Damage per Hit</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerHit[1].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img 
                    src="../assets/pics/upgrades/iggi.png"
                    alt="TheFool">
                    <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerHit[1].info }}</span>
                  </v-tooltip>
                  </v-img>
                </v-avatar>
              </v-col>
      
              <v-col v-show="deathCount >= 20">
                <v-btn class="btn-splatinum" @click="increasePerSecond(1)" rounded="pill" variant="outlined">Star Platinum attack: +100 Damage per Second</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerSecond[1].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img 
                    src="../assets/pics/upgrades/star_platinum.png"
                    alt="StarPlatinum">
                  </v-img>
                  <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerSecond[1].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>

              <v-col v-show="deathCount >= 30">
                <v-btn class="btn-josuke" @click="increasePerHit(2)" rounded="pill" variant="outlined">Crazy Diamond atack: +500 Damage per Hit</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ upgradesPerHit[2].cost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img 
                    src="../assets/pics/upgrades/josuke.png"
                    alt="Josuke">
                  </v-img>
                  <v-tooltip
                    activator="parent"
                    max-width="300">
                      <span class="upgradeText">{{ upgradesPerHit[2].info }}</span>
                  </v-tooltip>
                </v-avatar>
              </v-col>
            </v-row>
          </div>
            </v-card>
            </v-overlay>
          </v-btn>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
          </v-snackbar>
        </v-col>

        <v-col>
          <span class="pink" >Hit {{ addSize }} HP</span>
        </v-col>
      </v-row>
      
    </v-card>  
  </v-app>
  </template>

<style>

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

.cardMarg{
  margin-left: 22%;
  margin-right: 22%;
}

.v-col{
  padding-left: 6%;
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

.rounded-card{
    border-radius:50px;
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

