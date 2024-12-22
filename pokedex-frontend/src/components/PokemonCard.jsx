import React from 'react'

function PokemonCard({ pokemon }) {
    return (
        <div className='pokemon-card'>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3>
            <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</p>
        </div>
    )
}

export default PokemonCard