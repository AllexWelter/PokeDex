import React from 'react'

function PokemonCard({ pokemon }) {
    if (!pokemon || !pokemon.sprites) {
        return <div>Carregando...</div>
    }

    return (
        <div className='pokemon-card'>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3> {/* Nome do Pokémon */}
            <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</p> {/* Tipo(s) do Pokémon */}
        </div>
    )
}

export default PokemonCard