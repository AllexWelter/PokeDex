import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import PokemonSearch from "./components/PokemonSearch";
import PokemonFilter from "./components/PokemonFilter.jsx";
import PokemonDetails from "./components/PokemonDetails";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);

        // Construir a URL da API com base na busca e filtro
        let apiUrl = "http://localhost:3000/api/pokemons";
        if (searchTerm) {
          apiUrl += `?nome=${searchTerm}`;
        }
        if (selectedType) {
          apiUrl += (searchTerm ? "&" : "?") + `tipo=${selectedType}`;
        }

        const response = await axios.get(apiUrl); // Faz a requisição para a API

        // Buscar os detalhes de cada Pokémon, incluindo a imagem
        const pokemonsWithDetails = await Promise.all(
          response.data.map((pokemon) =>
            axios
              .get(`http://localhost:3000/api/pokemon/${pokemon.id}`)
              .then((res) => res.data),
          ),
        );

        setPokemons(pokemonsWithDetails); // Atualiza o estado com a lista de Pokémons completa
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [searchTerm, selectedType]); // Executa o useEffect quando searchTerm ou selectedType mudam

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (type) => {
    setSelectedType(type);
  };

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