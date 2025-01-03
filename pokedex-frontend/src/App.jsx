import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import PokemonSearch from './components/PokemonSearch';
import PokemonFilter from './components/PokemonFilter.jsx';
import PokemonDetails from './components/PokemonDetails';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]); // Estado para armazenar a lista completa de Pokémons com detalhes
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca
  const [selectedType, setSelectedType] = useState(''); // Estado para armazenar o tipo selecionado
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para armazenar o Pokémon selecionado

  useEffect(() => {
    // Função para buscar os Pokémons da API
    const fetchPokemons = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        const response = await axios.get('http://localhost:3000/api/pokemons'); // Faz a requisição para a API para buscar todos os Pokémons
        const pokemonsWithDetails = await Promise.all(
          response.data.map(pokemon => 
            axios.get(`http://localhost:3000/api/pokemon/${pokemon.id}`) // Busca os detalhes de cada Pokémon
            .then(res => res.data)
          )
        );
        setPokemons(pokemonsWithDetails); // Atualiza o estado com a lista completa de Pokémons com detalhes
      } catch (error) {
        setError(error); // Em caso de erro, armazena o erro no estado
      } finally {
        setLoading(false); // Define o carregamento como concluído
      }
    };

    fetchPokemons(); // Chama a função para buscar os Pokémons
  }, []); // Executa o efeito apenas uma vez, quando o componente é montado

  // Função para lidar com a busca
  const handleSearch = (term) => {
    setSearchTerm(term); // Atualiza o estado searchTerm com o termo de busca
  };

  // Função para lidar com o filtro
  const handleFilter = (type) => {
    setSelectedType(type); // Atualiza o estado selectedType com o tipo selecionado
  };

  // Função para lidar com o clique no Pokémon
  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon); // Atualiza o estado selectedPokemon com o Pokémon selecionado
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <div>Erro: {error.message}</div>; // Exibe a mensagem de erro
  }

  return (
    <div className="pokedex-container"> {/* Container principal da Pokédex */}
      <h1 className="pokedex-title">Seja Bem-vindo a PokéDex</h1> {/* Título da Pokédex */}
      <p className="pokedex-subtitle">Digite o nome ou o ID do Pokémon que você quer buscar:</p> {/* Subtítulo */}

      <div className="search-container"> {/* Container para o formulário de busca */}
        <input 
          type="text" 
          className="search-input" 
          placeholder="Nome ou ID do Pokémon" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button className="search-button" onClick={() => handleSearch(searchTerm)}>Buscar</button> {/* Botão de busca */}
      </div>

      <PokemonFilter onFilter={handleFilter} /> {/* Componente para filtrar os Pokémons por tipo */}

      <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick} selectedType={selectedType} /> {/* Componente para exibir a lista de Pokémons */}

      {selectedPokemon && ( // Renderiza o PokemonDetails apenas se selectedPokemon não for null
        <PokemonDetails pokemon={selectedPokemon} /> // Componente para exibir os detalhes do Pokémon selecionado
      )}

      <div className="navigation-buttons"> {/* Container para os botões de navegação */}
        <button className="nav-button">Pokémon Anterior</button> {/* Botão para navegar para o Pokémon anterior */}
        <button className="nav-button">Próximo Pokémon</button> {/* Botão para navegar para o próximo Pokémon */}
      </div>
    </div>
  );
}

export default App;