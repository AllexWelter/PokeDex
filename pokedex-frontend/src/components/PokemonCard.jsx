import React from 'react';

function PokemonCard({ pokemon }) { // Recebe as informações do Pokémon como props
  return (
    <div className="pokemon-card"> {/* Div para representar o card do Pokémon */}
      <img 
        src={pokemon.sprites.front_default} // URL da imagem do Pokémon
        alt={pokemon.name} 
      />
      <h3>{pokemon.name}</h3> {/* Nome do Pokémon */}
      <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</p> {/* Tipo(s) do Pokémon */}
      {/* Adicione outras informações do Pokémon que desejar exibir */}
    </div>
  );
}

export default PokemonCard;