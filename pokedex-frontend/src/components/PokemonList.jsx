import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemons, onPokemonClick }) {
    console.log('Lista de Pokémons no PokemonList.jsx:', pokemons); // Adicione esta linha

    return (
        <ul className="pokemon-list">
            {pokemons.map(pokemon => {
                console.log('Pokémon no PokemonList.jsx:', pokemon);
                return (
                    <li key={pokemon.id} onClick={() => onPokemonClick(pokemon)}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                );
            })}
        </ul>
    );
}

export default PokemonList;