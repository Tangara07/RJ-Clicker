<script>

import bossList from '../assets/js/bosses.vue'

export default {
  data(){
    return{
      score: 0,
      addSize: 1,
      perSecond: 0,

      upgradesPerHit:[

      {
        name: "Hamon",
        cost: 10,
        dmg: 1,
        incrCost: 1.25
      },
      {
        name: "Fool",
        cost: 2000,
        dmg: 100,
        incrCost: 3.15
      },
      {
        name: "Josuke",
        cost: 20000,
        dmg: 300,
        incrCost: 5
      },
      ],

      upgradesPerSecond: [
      {    
        name: "Arrow",
        cost: 20,
        dmg: 1,
        incrCost: 1.75
      },
      {
        name: "Star Platinum",
        cost: 1000,
        dmg: 100,
        incrCost: 3
      },
      ],

      deathCount: 0,
      interval: null,
      bossCount: 1,

      overlay: false,

      index: 0,  

      bossList: bossList

    };
  },

  methods: {
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
      this.switchBossIdx();
    },

    bossKillTime(){
      this.bossList[this.index].hp -= this.perSecond;
      this.switchBossIdx();
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
          <v-avatar size="250" rounded="0">
            <v-img 
              @click="addToScore()"
              v-bind:src="switchBoss">
            </v-img>
          </v-avatar>
        </v-col>
    </v-row>

    <v-row>

    <v-col>
          <v-btn @click="overlay = !overlay" rounded="pill" variant="outlined">Menu
            <v-overlay v-model="overlay" class="align-center justify-center">

              <v-card class="rounded-card ovCard" width="600" variant="outlined">
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
                </v-avatar>
              </v-col>
       
              <v-col v-show="deathCount >= 20">
                <v-btn class="btn-fool" @click="increaseHitDamage(1)" rounded="pill" variant="outlined" >The Fool attack: +100 Damage per Hit</v-btn>
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
      
              <v-col v-show="deathCount >= 50">
                <v-btn class="btn-splatinum" @click="increasePerSecond(1)" rounded="pill" variant="outlined">Star Platinum attack: +100 Damage per Second</v-btn>
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

              <v-col v-show="deathCount >= 75">
                <v-btn class="btn-josuke" @click="increasePerHit(2)" rounded="pill" variant="outlined">Crazy Diamond atack: +500 Damage per Hit</v-btn>
                <v-spacer></v-spacer>
                <span class="text-wrap">Cost: {{ josukeUpdateCost }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="150">
                  <v-img 
                    src="../assets/pics/upgrades/josuke.png"
                    alt="Josuke">
                  </v-img>
                </v-avatar>
              </v-col>
            </v-row>
            </v-card>

            </v-overlay>
          </v-btn>
        </v-col>

        <v-col>
          <span class="pink" >Hit {{ addSize }} HP</span>
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

.v-overlay{
  overflow-y: visible !important;
}

.v-application.v-theme--light.v-layout.v-layout--full-height.v-locale--is-ltr {
  background: transparent;
}
</style>

