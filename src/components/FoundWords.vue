<script setup>
import { ref } from 'vue';
import { game } from '@/game.js'

defineProps({
    row: Number
})

let toggle = ref(false)

function showHide() {
    toggle.value = ! toggle.value
    return toggle
}

</script>


<template>

<div class="px-4">

    {{ game.foundWords[row].length }} words found 
    
    <button 
        class="text-xs px-1 ml-2 bg-black border border-white rounded"
        @click="showHide"    
    >{{ toggle ? 'hide' : 'show' }}</button>

    <div v-if="toggle" class="flex flex-nowrap overflow-x-scroll px-2 w-full">

        <div 
            v-for="word in game.foundWords[row]" 
            class="mx-1 mb-1 cursor-copy"
            @click="game.pickWord(word)"
        >
            {{ word }}
        </div>

    </div>
    





</div>


</template>
