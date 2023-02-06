<script setup>

import { game } from '@/game.js'

defineProps({
    row: Number,
    col: Number
})


</script>


<template>

    <div 
        style="font-family: 'Cutive Mono', monospace;"
        class="text-center font-bold text-2xl sm:text-4xl select-none rounded p-3 m-3 sm:w-12 sm:h-14 inline-block capitalize border-white"
        :class="{
            'border-2 border-white': game.selectedTile[0] === row && game.selectedTile[1] === col,
            'border-1 border-black': game.currentRow !== row,
            'bg-black': game.letters[row][1][col] === 0,
            'bg-yellow-500': game.letters[row][1][col] === 1,
            'bg-green-500': game.letters[row][1][col] === 2
        }"
        @click="game.gameState < 2 ? game.selectTile(row, col) : ''"
    >
        {{ game.letters[row][0][col] === '' ? '&nbsp;' : game.letters[row][0][col] }}
    </div>


</template>

