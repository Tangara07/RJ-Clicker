<script>

import rat from '../assets/pics/bosses/rat.png';
import diavolo from '../assets/pics/bosses/diavolo.png';
import giorno from '../assets/pics/bosses/giorno.png';
import giorno_diavolo from '../assets/pics/bosses/giorno_diavolo.png';
import josuke from '../assets/pics/bosses/josuke.png'
import kira from '../assets/pics/bosses/kira.png';
import josuke_kira from '../assets/pics/bosses/josuke_kira.png';

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

      bossList: [
            rat,
            diavolo,
            giorno,
            giorno_diavolo,
            kira,
            josuke,
            josuke_kira
        ],

        bossNamesList: [
            "Ratt",
            "Diavolo",
            "Giorno",
            "Giorno & Diavolo",
            "Kira",
            "Josuke",
            "Josuke & Kira"
        ],
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
      return this.bossList[this.index];
    },

    switchBossName() {
      return this.bossNamesList[this.index];
    }
  }
}

</script>

<template>
  <v-app>
    <v-row>
      <v-col>
      <v-card class="rounded-card" title="RJ-Clicker!" variant="outlined">
        <v-row>
          <v-col>
            <span class="clicks">Total Points: <v-spacer></v-spacer> {{ score }}</span>
          </v-col>

          <v-spacer></v-spacer>

          <v-col>
            <span class="perSecond">Damage per Second:  <v-spacer></v-spacer>{{ perSecond}}</span>
          </v-col>

          <v-spacer></v-spacer>

          <v-col>
            <span class="clicks">Boss HP  <v-spacer></v-spacer>{{ bossHp }}</span>
          </v-col>
          
          <v-spacer></v-spacer>

          <v-col>
              <span class="clicks">Boss killed  <v-spacer></v-spacer>{{ deathCount }} <v-spacer></v-spacer> times</span>        
          </v-col>

      </v-row>
    </v-card>
  </v-col>

    <v-col>
    <v-card class="rounded-card" variant="outlined">
      
      <v-col>
        <span class="pink">{{switchBossName}}</span>
      </v-col>

      <v-col>
        <v-avatar size="200" rounded="0">
          <v-img v-bind:src="switchBoss"></v-img>
        </v-avatar>
      </v-col>
    </v-card>
  </v-col>
    </v-row>
    
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
      </v-row> 

      <v-row>
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
      </v-row>

      <v-row>
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
      </v-row>

      <v-row>
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
}

.v-card{
  padding-left: 5%;
  padding-right: 5%;
  height: 100%;
  width: 100%;
}

.v-col{
  align-content: center;
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

