<template>
    <h1 v-if="!pokemon">
        Wait please...
    </h1>
    <div v-else>
        <h1>Who is this pokemon?</h1>
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
        <PokemonOptions 
            :pokemons="pokemonArr"
            @selection="checkAnswer"
        />
        <template v-if="showAnswer">
            <h2 class="fade-in">{{ message }}</h2>
            <button @click="newGame">New Game</button>
        </template>
    </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
    components:{
        PokemonPicture,
        PokemonOptions
    },
    data() {
        return {
            pokemonArr:[],
            pokemon: null,
            showPokemon: false,
            showAnswer: null,
            message: ''
        }
    },
    methods:{
        async mixPokemonArray(){
            this.pokemonArr = await getPokemonOptions();
            const rndId = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndId]
        },
        checkAnswer(pokemonId){
            this.showPokemon = true
            this.showAnswer = true

            if(this.pokemon.id === pokemonId){
                this.message = `Correct, ${ this.pokemon.name }`
            }else{
                this.message = `Oops, it was ${ this.pokemon.name }`
            }
        },
        newGame(){
            this.showPokemon = false;
            this.showAnswer = false;
            this.pokemon = null;
            this.mixPokemonArray();
        }
    },
    mounted(){
        this.mixPokemonArray()
    }
}
</script>