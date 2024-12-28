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
  const [listKey, setListKey] = useState(0)

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
        console.log(apiUrl)
        const response = await axios.get(apiUrl)
        setPokemons(prevPokemons => response.data)
        console.log(response.data)
        setPokemons(response.data)
        console.log(pokemons)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()

    console.log(searchTerm)
    console.log(selectedType)

    setListKey(prevKey => prevKey + 1)
  }, [searchTerm, selectedType]) // Executa o useEffect quando o searchTerm ou selectedType mudam

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilter = (type) => {
    setSelectedType(type)
  }

  if (loading) {
    console.log('loading', loading)
    return <div>Carregando...</div>
  }

  if (error) {
    console.log('error', error)
    return <div>Erro: {error.message}</div>
  }

  return (
    <div>
      <h1>POkéDex</h1>
    <PokemonSearch onSearch={handleSearch} />
    <PokemonFilter onFilter={handleFilter} />  
    <PokemonList key={listKey} pokemons={pokemons} />
    </div>
  )
}

export default App