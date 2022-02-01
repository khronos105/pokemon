import pokemonApi from "../api/pokemonApi";


const getPokemons = () => {
    const pokemons = Array.from(Array(650));
    return pokemons.map(( _ , index ) => index +1);
}

const getPokemonsNames = async( [a, b, c, d] = []) => {
    //const resp = await pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/1`)
    const promiseArr = [
        pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${ a }`),
        pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${ b }`),
        pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${ c }`),
        pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${ d }`)
    ]
    const [ p1, p2, p3, p4 ] = await Promise.all(promiseArr);

    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id }
    ]
}

const getPokemonsOptions = async () => {
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5)
    const pokemons = await getPokemonsNames(mixedPokemons.splice(0, 4))
    return pokemons
}

export default getPokemonsOptions