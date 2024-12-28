import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PokemonCard({ pokemon }) {
    const [pokemonData, setPokemonData] = useState(null)  //Estado para armazenar os dados do Pokémon
    const [isLoading, setIsLoading] = useState(true)      //Estado para controlar o carregamento

    useEffect(() => {
        
    })

    return (
        <div className='pokemon-card'>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3> {/* Nome do Pokémon */}
            <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</p> {/* Tipo(s) do Pokémon */}
            {/* Adicione outra informações do Pokémon que desejar exibir */}
        </div>
    )
}

export default PokemonCard