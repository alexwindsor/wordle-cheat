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
                class="border-t-2 bg-gray-700 border-white text-2xl m-2 px-8 text-white"
            >
            &#x2716;
        </button>
        </div>

        <div class="w-1/2 sm:my-auto">
            <button 
            v-if="game.rowReady === true && game.currentRow === row && game.gameState === 1" 
            @click="game.submitRow"
            class="border-t-2 bg-gray-700 border-white text-2xl m-2 px-8"
            >
                &#x2713;
            </button>
        </div>

    </div>

    <FoundWords v-if="game.currentRow > row" :row="row" />

</div>

{{ scrollToBottom() }}

</template>

