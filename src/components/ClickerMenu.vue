<script>

import {bossList} from '../assets/js/bosses'

export default {
  data(){
    return{
      score: 0,
      addSize: 1,
      perSecond: 0,

      hamonUpdateCost: 10,
      foolUpdateCost: 2000,

      arrowUpdateCost: 20,
      splatinumUpdateCost: 1000,

      theWorldUpdateCost: 10000,

      bossHp: 100,
      deathCount: 0,
      interval: null,
      bossCount: 1,

      index: 0,  

      bossList: bossList

    };
  },

  methods: {
    addToScore(){
      this.score += this.addSize;
      this.bossKillClick();
    },

    increaseHitDamage(){
      if(this.score >= this.hamonUpdateCost){
        this.score -= this.hamonUpdateCost;
        this.addSize++;
        this.hamonUpdateCost = parseInt(this.hamonUpdateCost * 1.25);
      }
    },

    increaseFoolDamage(){
      if(this.score >= this.foolUpdateCost){
        this.score -= this.foolUpdateCost;
        this.addSize += 100;
        this.foolUpdateCost = parseInt(this.foolUpdateCost * 3.15);
      }
    },

    increaseArrowPerSecond(){
      if (this.score >= this.arrowUpdateCost){
        clearInterval(this.interval);
        this.perSecond++;
        this.score -= this.arrowUpdateCost;
        this.arrowUpdateCost = parseInt(this.arrowUpdateCost * 1.75);
    
        if (this.perSecond > 0) {
          this.startInterval();
        }
      }
    },

    increaseSPlatinumPerSecond(){
      if (this.score >= this.splatinumUpdateCost){
        clearInterval(this.interval);
        this.perSecond += 100;
        this.score -= this.splatinumUpdateCost;
        this.splatinumUpdateCost = parseInt(this.splatinumUpdateCost * 3);
    
        if (this.perSecond > 0) {
          this.startInterval();
        }
      }
    },

    increaseTheWorldPerSecond(){
      if (this.score >= this.theWorldUpdateCost){
        clearInterval(this.interval);
        this.addSize += 500;
        this.perSecond += 300;
        this.score -= this.theWorldUpdateCost;
        this.theWorldUpdateCost = parseInt(this.theWorldUpdateCost * 5);
    
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
      this.bossHp -= this.addSize;
      this.switchBossIdx();
    },

    bossKillTime(){
      this.bossHp -= this.perSecond;
      this.switchBossIdx();
    },

    switchBossIdx() {
      if (this.bossHp <= 0){
        this.index++;

        if (this.index > this.bossList.length - 1){
          this.index = 0;
        }
     }

     if (this.bossHp <= 0){
        this.deathCount++;

        if(this.deathCount < 20){
          this.score += 500;
        }
        else if (this.deathCount >= 20){
          this.score += 1000;
        }
        else if (this.deathCount >= 40){
          this.score += 2000;
        }
        else if (this.deathCount >= 60){
          this.score += 5000;
        }
        
        this.bossHp = 100 * this.deathCount;
      }

    }
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
    <v-card class="rounded-card" title="RJ-Clicker!" variant="outlined">
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
            <span class="pink">HP: {{ bossHp }}</span>
          </v-row>
        </v-col>

        <v-col>
          <v-avatar size="250" rounded="0">
            <v-img v-bind:src="switchBoss"></v-img>
          </v-avatar>
        </v-col>

      </v-row>
    </v-card> 
    
    <v-card class="rounded-card" variant="outlined">
      <v-row>

        <v-col>
          <v-btn class="btn-hit" @click="addToScore()" rounded="pill" variant="outlined">Hit {{ addSize }} HP</v-btn>
        </v-col>

        <v-spacer></v-spacer>

        <v-col>
          <v-btn class="btn-hamon" @click="this.increaseHitDamage()" rounded="pill" variant="outlined">+ 1 on Damage</v-btn> 
          <v-spacer></v-spacer>          
          <span >Cost: {{ hamonUpdateCost }}</span>
          <v-spacer></v-spacer>
          <v-avatar size="150">
            <v-img 
              src="../assets/pics/upgrades/hamon.png"
              alt="HAMON">
            </v-img>
          </v-avatar>
        </v-col>

        <v-spacer></v-spacer>
      
        <v-col>
          <v-btn class="btn-arrow" @click="increaseArrowPerSecond()" rounded="pill" variant="outlined">+ 1 on Damage per Second</v-btn>
          <v-spacer></v-spacer>
          <span class="text-wrap">Cost: {{ arrowUpdateCost }}</span>
          <v-spacer></v-spacer>
          <v-avatar size="150">
            <v-img 
              src="../assets/pics/upgrades/arrow.png"
              alt="ARROW">
              </v-img>
          </v-avatar>
        </v-col>

        <v-spacer></v-spacer>
       
        <v-col v-show="deathCount >= 20">
          <v-btn class="btn-fool" @click="increaseFoolDamage()" rounded="pill" variant="outlined" >The Fool attack: +100 Damage per Hit</v-btn>
          <v-spacer></v-spacer>
          <span class="text-wrap">Cost: {{ foolUpdateCost }}</span>
          <v-spacer></v-spacer>
          <v-avatar size="150">
              <v-img 
                src="../assets/pics/upgrades/iggi.png"
                alt="TheFool">
              </v-img>
            </v-avatar>
        </v-col>
      
        <v-spacer></v-spacer>
      
        <v-col v-show="deathCount >= 50">
          <v-btn class="btn-splatinum" @click="increaseSPlatinumPerSecond()" rounded="pill" variant="outlined">Star Platinum attack: +100 Damage per Second</v-btn>
          <v-spacer></v-spacer>
          <span class="text-wrap">Cost: {{ splatinumUpdateCost }}</span>
          <v-spacer></v-spacer>
          <v-avatar size="150">
              <v-img 
                src="../assets/pics/upgrades/star_platinum.png"
                alt="StarPlatinum">
              </v-img>
            </v-avatar>
        </v-col>
      
        <v-col v-show="deathCount >= 100">
          <v-btn class="btn-theworld" @click="increaseTheWorldPerSecond()" rounded="pill" variant="outlined">The World attack: +500 Damage per Hit and +300 Damage per Second</v-btn>
          <v-spacer></v-spacer>
          <span class="text-wrap">Cost: {{ theWorldUpdateCost }}</span>
          <v-spacer></v-spacer>
          <v-avatar size="150">
            <v-img 
              src="../assets/pics/upgrades/theworld.png"
              alt="TheWorld">
            </v-img>
          </v-avatar>
        </v-col>
      
      </v-row>
    </v-card> 
  </v-app>
  </template>

<style>

.pink{
  color: #EC008C !important;
  font-size: x-large;
}

.v-card-title{
  color: #EC008C !important;
  font-size: xx-large;
  text-align: center;
}

.v-card{
  margin-left: 22%;
  margin-right: 22%;
}

.v-col{
  padding-left: 7%;
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

.v-application.v-theme--light.v-layout.v-layout--full-height.v-locale--is-ltr {
  background: transparent;
}
</style>

