<script setup>

import { game } from '@/game.js'

let keyRow = [["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["z","x","c","v","b","n","m",'del']]
</script>


<template>

<div class="text-center">

<!-- :disabled="game.blackLetters.includes(key)" -->
    <div v-for="keyRows in 3">
        <button 
            v-for="key in keyRow[keyRows - 1]" 
            @click="game.inputLetter(key)" 
            class="border-2 border-white rounded-sm p-2 sm:p-2 m-0 sm:m-2 w-8 sm:w-14 text-base text-white capitalize text-center pointer-events-auto"
            :class="{
                'bg-green-500': game.greenLetters.includes(key),
                'bg-yellow-500': game.yellowLetters.includes(key),
                'bg-black': game.blackLetters.includes(key),
                'bg-gray-600': !game.greenLetters.includes(key) && !game.yellowLetters.includes(key) && !game.blackLetters.includes(key)
            }"
        >
            {{ key.length === 1 ? key : '&#x2190;' }}
        </button>
    </div>

</div>
<!-- 
border-2 border-white rounded-sm p-2 sm:p-2 m-0 sm:m-2 w-8 sm:w-14 text-sm sm:text-base text-white bg-gray-800 capitalize text-center pointer-events-auto -->

</template>

<!-- ============================================================================== 


<script setup>

import { game } from '@/game.js'

let keyRow = [["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["z","x","c","v","b","n","m",'DEL']]


</script>


<template>


<div class="text-center">
    <button v-for="key in keyRow[0]" @click="game.inputLetter(key)" class="border-2 border-white rounded-sm p-2 sm:p-2 m-0 sm:m-2 w-8 sm:w-14 text-sm sm:text-base text-white bg-gray-800 capitalize text-center pointer-events-auto">{{ key }}</button>

    <br>

    <button v-for="key in keyRow[1]" @click="game.inputLetter(key)" class="border-2 border-white rounded-sm p-2 sm:p-2 m-0 sm:m-2 w-8 sm:w-14 text-sm sm:text-base text-white bg-gray-800 capitalize text-center pointer-events-auto">{{ key }}</button>

    <br>

    <button v-for="key in keyRow[2]" @click="game.inputLetter(key)" class="border-2 border-white rounded-sm p-2 sm:p-2 m-0 sm:m-2 w-8 sm:w-14 text-sm sm:text-base text-white bg-gray-800 capitalize text-center pointer-events-auto">{{ key.length === 1 ? key : '&#x2190;' }}</button>
</div>


</template>
-->