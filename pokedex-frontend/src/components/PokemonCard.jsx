import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonCard({ pokemon }) {
  // ... (código do estado e useEffect)

  console.log('Pokémon recebido no PokemonCard.jsx:', pokemon);
  console.log('Sprites do Pokémon no PokemonCard.jsx:', pokemon.sprites);
  console.log('Pokémon completo no PokemonCard.jsx:', pokemon); // Adicione esta linha

  // Remova a condição abaixo:
  // if (isLoading) {
  //   return <div>Carregando...</div>;
  // }

  // Verifica se pokemon e pokemon.sprites estão definidos
  if (pokemon && pokemon.sprites) {
    return (
      <div className='pokemon-card'>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h3>{pokemon.name}</h3>
        <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      </div>
    );
  } else {
    return <div>Pokémon não encontrado</div>;
  }
}

export default PokemonCard;