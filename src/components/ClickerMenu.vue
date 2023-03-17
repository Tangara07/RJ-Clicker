<script>

import dio from '../assets/pics/bosses/Part1/dio.png';
import speedwagon from '../assets/pics/bosses/Part1/speedwagon.png';
import wang_chan from '../assets/pics/bosses/Part1/wang_chan.png';
import jack_the_ripper from '../assets/pics/bosses/Part1/jack_the_ripper.png';
import bruford from '../assets/pics/bosses/Part1/bruford.png';
import tarkus from '../assets/pics/bosses/Part1/tarkus.png';
import dio_vampire from '../assets/pics/bosses/Part1/dio_vampire.png';

import straizo from '../assets/pics/bosses/Part2/straizo.png';
import santana from '../assets/pics/bosses/Part2/santana.png';
import wammu from '../assets/pics/bosses/Part2/wammu.png';
import acdc from '../assets/pics/bosses/Part2/acdc.png';
import kars from '../assets/pics/bosses/Part2/kars.png';

import tower from '../assets/pics/bosses/Part3/tower_of_gray.png';
import cap_tennille from '../assets/pics/bosses/Part3/capitan_tennille.png';
import forever from '../assets/pics/bosses/Part3/forever.png';
import devo_the_cursed from '../assets/pics/bosses/Part3/devo_the_cursed.png';
import rubber_soul from '../assets/pics/bosses/Part3/rubber_soul.png';
import j_geil from '../assets/pics/bosses/Part3/j_geil.png';
import hol_horse from '../assets/pics/bosses/Part3/hol_horse.png';
import nena_empress from '../assets/pics/bosses/Part3/nena_empress.png';
import zz from '../assets/pics/bosses/Part3/zz.png';
import enya_geil from '../assets/pics/bosses/Part3/enya_geil.png';
import steely_dan from '../assets/pics/bosses/Part3/steely_dan.png';
import kars from '../assets/pics/bosses/Part3/.png';
import kars from '../assets/pics/bosses/Part3/.png';
import kars from '../assets/pics/bosses/Part3/.png';

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
            dio,
            speedwagon,
            wang_chan,
            jack_the_ripper,
            bruford,
            tarkus,
            dio_vampire,

            straizo,
            santana,
            wammu,
            acdc,
            kars
        ],

        bossNamesList: [
            "Dio",
            "Speedwagon",
            "Wang Chan",
            "Jack the Ripper",
            "Bruford",
            "Tarkus",
            "Vampire Dio",

            "Straizo",
            "Santana",
            "Wammu",
            "AC/DC",
            "Kars"
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
    <v-card class="rounded-card" title="RJ-Clicker!" variant="outlined">
      <v-row>

        <v-col>
          <span>Total Points: {{ score }}</span>
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
  padding-left: 10%;
}

.v-row{
  margin-top: 2%;
  margin-bottom: 2%;
}

body{
  /*padding-top: 25%;*/
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

