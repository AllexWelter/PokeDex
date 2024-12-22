import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonList from './components/PokemonList'
import PokemonSearch from './components/PokemonSearch'
import PokemonFilter from './components/PokemonFilter'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        let apiUrl = 'http://localhost:3000/api/pokemons'
        if (searchTerm) {
          apiUrl += `?nome=${searchTerm}`
        }
        if (selectedType) {
          apiUrl += (searchTerm ? '&' : '?') + `tipo=${selectedType}`
        }
        const response = await axios.get(apiUrl)
        setPokemons(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [searchTerm, selectedType]) // Executa o useEffect quando o searchTerm ou selectedType mudam

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilter = (type) => {
    setSelectedType(type)
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error.message}</div>
  }

  return (
    <div>
      <h1>POkéDex</h1>
    <PokemonSearch onSearch={handleSearch} />
    <PokemonFilter onFilter={handleFilter} />  
    <PokemonList pokemons={pokemons} />
    </div>
  )
}

export default App