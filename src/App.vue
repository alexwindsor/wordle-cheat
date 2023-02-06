<script setup>

import { onMounted, onUnmounted } from 'vue'
import { game } from '@/game.js'
import Row from '@/components/Row.vue'
import Keyboard from '@/components/Keyboard.vue'


// track any keyboard presses to give option of using computer keyboard as well as virtual keyboard
window.addEventListener('keyup', game.inputLetter)

onMounted(() => {

  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, 1200)

})


onUnmounted(() => {
  window.removeEventListener('keyup', game.inputLetter)
})

game.getRandomWord()

</script>



<template>


<div class="flex w-full flex-wrap h-2/5 sm:h-1/3 px-2 sm:px-16 content-around">

  <h1 class="w-full text-6xl sm:text-8xl text-center sm:text-left mt-4 sm:mt-12" style="font-family: 'Prata', serif;">Wor<span class="text-green-500">d</span><span class="text-yellow-500">C</span>heat</h1>

  <div class="sm:text-lg w-full pl-8 mt-8 sm:pl-24 sm:mt-16">

    With this app, you can either PLAY Wordle as normal, or use this app alongside another version of Wordle (eg. <a href="https://www.nytimes.com/games/wordle" target="_blank" class="underline">New York Times</a> or <a href="https://wordplay.com/" target="_blank" class="underline">WordPlay</a>) to ANALYSE the other game you are playing.

    <br><br>

    You are currently in <span class="text-2xl">{{ game.gameMode === 0 ? 'PLAY' : 'ANALYSE' }}</span> mode.

  </div>

  <div class="w-full my-6 sm:my-10 sm:ml-12 text-center sm:text-left">
    <button 
      class="text-lg p-1 mx-2 bg-gray-800 text-white border-t-2 border-white"
      @click="game.reset(0)"
    >Reset and PLAY</button>

    <button 
      class="text-lg p-1 mx-2 bg-gray-800 text-white border-t-2 border-white"
      @click="game.reset(1)"
    >Reset and ANALYSE</button>
  </div>

  <div class="w-full mb-56 sm:mb-72">
    <Row v-for="row in game.currentRow + 1" :row="row - 1" />
  </div>

</div>



<div v-show="game.gameState < 2" class="fixed w-full bottom-8 pointer-events-none">
  <Keyboard />
</div>


</template>