import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonList from './components/PokemonList'
import PokemonSearch from './components/PokemonSearch'
import PokemonFilter from './components/PokemonFilter'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/api/pokemons')
        setPokemons(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
  }, []) // Array vazio como segundo argumento garante que o UseEffect seja executado apenas uma vez

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error.message}</div>
  }

  return (
    <div>
      <h1>POkéDex</h1>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.id}>
            {pokemon.id} - {pokemon.nome} - {pokemon.tipo}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App