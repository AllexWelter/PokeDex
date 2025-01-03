import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import PokemonSearch from './components/PokemonSearch';
import PokemonFilter from './components/PokemonFilter';
import PokemonDetails from './components/PokemonDetails';
import './App.css'; 

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [listKey, setListKey] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para armazenar o Pokémon selecionado

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        let apiUrl = 'http://localhost:3000/api/pokemons';
        if (searchTerm) {
          apiUrl += `?nome=${searchTerm}`;
        }
        if (selectedType) {
          apiUrl += (searchTerm ? '&' : '?') + `tipo=${selectedType}`;
        }
        console.log(apiUrl);
        const response = await axios.get(apiUrl);
        setPokemons(response.data); // Atualiza o estado com a lista de Pokémons
        console.log('Pokémons recebidos da API no App.jsx:', response.data); // Adicione esta linha
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [searchTerm, selectedType]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (type) => {
    setSelectedType(type);
  };

  // Função para lidar com o clique no Pokémon
  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Seja Bem-vindo a PokéDex</h1>
      <p className="pokedex-subtitle">Digite o nome ou o ID do Pokémon que você quer buscar:</p>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Nome ou ID do Pokémon" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button className="search-button" onClick={() => handleSearch(searchTerm)}>Buscar</button>
      </div>

      <PokemonFilter onFilter={handleFilter} />

      <PokemonList key={listKey} pokemons={pokemons} onPokemonClick={handlePokemonClick} /> 

      {selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} />
      )}

      <div className="navigation-buttons">
        <button className="nav-button">Pokémon Anterior</button>
        <button className="nav-button">Próximo Pokémon</button>
      </div>
    </div>
  );
}

export default App;