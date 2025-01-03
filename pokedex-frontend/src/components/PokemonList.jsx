import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons, onPokemonClick, selectedType }) {
  // Filtra os Pokémons com base no tipo selecionado (selectedType)
  const filteredPokemons = pokemons.filter((pokemon) => {
    // Se nenhum tipo for selecionado, retorna todos os Pokémons
    if (!selectedType) {
      return true;
    }
    // Verifica se o tipo do Pokémon corresponde ao tipo selecionado
    return pokemon.types.some((type) => type.type.name === selectedType);
  });

  return (
    <ul className="pokemon-list">
      {/* Itera sobre a lista de Pokémons filtrada */}
      {filteredPokemons.map((pokemon) => (
        <li key={pokemon.id} onClick={() => onPokemonClick(pokemon)}>
          {/* Chave única para cada item da lista e função onPokemonClick ao clicar */}
          <PokemonCard pokemon={pokemon} />{" "}
          {/* Renderiza um PokemonCard para cada Pokémon */}
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;