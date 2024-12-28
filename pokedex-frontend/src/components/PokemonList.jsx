import React from 'react'
import PokemonCard from './PokemonCard'

function PokemonList({ pokemons }) {
    console.log('Lista de Pokémons no PokemonList:', pokemons)

    return (
        <ul className="pokemon-list">
            {pokemons.map(pokemon => {
                console.log('Pokemon no map: ', pokemon)
                return (
                    <li key={pokemon.id}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                )
            })}
        </ul>
    )
}

export default PokemonList