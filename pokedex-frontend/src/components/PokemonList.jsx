import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemons, onPokemonClick, selectedType }) { // Recebe a prop selectedType
  console.log('Lista de Pokémons no PokemonList.jsx:', pokemons);

  // Filtra os Pokémons pelo tipo selecionado
  const filteredPokemons = pokemons.filter(pokemon => {
    if (!selectedType) {
      return true; // Se nenhum tipo for selecionado, retorna todos os Pokémons
    }
    return pokemon.types.some(type => type.type.name === selectedType); // Filtra pelo tipo selecionado
  });

  return (
    <ul className="pokemon-list">
      {filteredPokemons.map(pokemon => (
        <li key={pokemon.id} onClick={() => onPokemonClick(pokemon)}>
          <PokemonCard pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;