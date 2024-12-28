import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PokemonCard({ pokemon }) {
    const [pokemonData, setPokemonData] = useState(null)  //Estado para armazenar os dados do Pokémon
    const [isLoading, setIsLoading] = useState(true)      //Estado para controlar o carregamento

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.get (`http://localhost:3000/api/pokemon/${pokemon.id}`)
                setPokemonData(response.data)
            } catch (error) {
                console.error('Erro ao buscar dados do Pokémon: ', error)
            } finally {
                setIsLoading(false)
            }        
        }
        
        fetchPokemonData()
    }, [pokemon.id])

    console.log('Dados do Pokémon no PokemonCard:', pokemonData)

    if (isLoading) {
        return <div>Carregando...</div>
    }

    if (pokemonData) {
        return (
            <div className='pokemon-card'>
                <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                />
                <h3>{pokemonData.name}</h3> {/* Nome do Pokémon */}
                <p>Tipo: {pokemonData.types.map(type => type.type.name).join(', ')}</p> {/* Tipo(s) do Pokémon */}
                {/* Adicione outra informações do Pokémon que desejar exibir */}
            </div>
        )
    } else {
        return <div>Pokémon não encontrado</div>
    }
    
}

export default PokemonCard