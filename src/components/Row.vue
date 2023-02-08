<script setup>

import { game } from '@/game.js'

import LetterTile from '@/components/LetterTile.vue'
import FoundWords from '@/components/FoundWords.vue'


defineProps({
    row: Number
})

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

</script>


<template>

<div class="border-t border-white bg-gray-900 mb-3 sm:mb-5 text-white">

    <div class="flex w-full flex-wrap sm:content-center sm:justify-center sm:place-self-center">

        <div class="sm:w-1/3 mx-3">
            <LetterTile v-for="col in 5" :row="row" :col="col - 1" />
        </div>

        <div class="ml-10 mr-4 sm:my-auto">
            <button 
                v-if="game.currentRow === row && row > 0 && game.gameState === 1" 
                @click="game.backOneRow"
                class="bg-gray-400 border-t-2 border-white text-2xl m-2 px-8 text-white"
            >
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9498 8.46447C17.3404 8.07394 17.3404 7.44078 16.9498 7.05025C16.5593 6.65973 15.9261 6.65973 15.5356 7.05025L12.0001 10.5858L8.46455 7.05025C8.07402 6.65973 7.44086 6.65973 7.05033 7.05025C6.65981 7.44078 6.65981 8.07394 7.05033 8.46447L10.5859 12L7.05033 15.5355C6.65981 15.9261 6.65981 16.5592 7.05033 16.9497C7.44086 17.3403 8.07402 17.3403 8.46455 16.9497L12.0001 13.4142L15.5356 16.9497C15.9261 17.3403 16.5593 17.3403 16.9498 16.9497C17.3404 16.5592 17.3404 15.9261 16.9498 15.5355L13.4143 12L16.9498 8.46447Z" fill="#ff0000"/><!-- this is a cross -->
                </svg>
            </button>
        </div>

        <div class="w-1/2 sm:my-auto">
            <button 
            v-if="game.rowReady === true && game.currentRow === row && game.gameState === 1" 
            @click="game.submitRow"
            class="bg-gray-400 border-t-2 border-white text-2xl m-2 px-8"
            >
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#00ff00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><!-- this is a tick -->
                </svg>
            </button>
        </div>

    </div>

    <FoundWords v-if="game.currentRow > row" :row="row" />

</div>

{{ scrollToBottom() }}

</template>

