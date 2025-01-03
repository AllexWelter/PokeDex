import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonList from './components/PokemonList'
import PokemonSearch from './components/PokemonSearch'
import PokemonFilter from './components/PokemonFilter'
import PokemonDetails from './components/PokemonDetails'
import '../src/App.css'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [listKey, setListKey] = useState(0)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

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

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon); // Atualiza o estado com o Pokémon selecionado
  };  

  if (loading) {
    console.log('loading', loading)
    return <div>Carregando...</div>
  }

  if (error) {
    console.log('error', error)
    return <div>Erro: {error.message}</div>
  }

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Seja Bem-vindo a PokéDex do Artigo Tech</h1>
      <p className="pokedex-subtitle">Digite o nome ou o ID do Pokémon que você quer buscar:</p>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Nome ou ID do Pokémon" />
        <button className="search-button">Buscar</button>
      </div>
      <div className="pokemon-details">
        {/* Aqui serão exibidos os detalhes do Pokémon */}
        {pokemonData && (
          <div>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemon-image" />
            <h2 className="pokemon-name">{pokemonData.name}</h2>
            <p className="pokemon-info">Altura: {pokemonData.height}m | Peso: {pokemonData.weight}kg | Tipo: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
          </div>
        )}
      </div>
      <div className="navigation-buttons">
        <button className="nav-button">Pokémon Anterior</button>
        <button className="nav-button">Próximo Pokémon</button>
      </div>
    </div>
  );
}

export default App