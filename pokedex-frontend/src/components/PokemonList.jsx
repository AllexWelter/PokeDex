import React from 'react'
import PokemonCard from './PokemonCard'

function PokemonList({ pokemons }) {
    console.log(pokemons)
    return (
        <ul className="pokemon-list">
            {pokemons.map(pokemon => (
                <li key={pokemon.id}>
                    <PokemonCard pokemon={pokemon} />
                </li>
            ))}
        </ul>
    )
}

export default PokemonList