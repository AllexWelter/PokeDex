// src/components/PokemonDetails.jsx
import React from 'react';

function PokemonDetails({ pokemon }) {
  if (pokemon) { // Verifica se pokemon não é null
    return (
      <div className="pokemon-details">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
        <p>Altura: {pokemon.height}</p>
        <p>Peso: {pokemon.weight}</p>
        <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</p>
        {/* Adicione outras informações do Pokémon que desejar exibir */}
      </div>
    );
  } else {
    return <div>Carregando...</div>; // Ou uma mensagem similar
  }
}

export default PokemonDetails;