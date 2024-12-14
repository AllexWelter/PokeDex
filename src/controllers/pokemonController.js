import { getPokemonFromDatabase, getPokemonFromPokeAPI } from '../services/pokemonService.js'

const getPokemon = async (req, res) => {
    try {
        const id = req.params.id
        let pokemon = await getPokemonFromDatabase(id)

        if (!pokemon) {
            pokemon = await getPokemonFromPokeAPI(id)

            try {
              const sql = `INSERTO INTO pokemon (id, nome, tipo)`  
            }
        }

        res.json(pokemon)
    } catch (error) {
        console.log('Erro ao buscar Pokémon:', error)
        res.status(500).json({error: 'Erro ao buscar Pokémon' })
    }
}

export { getPokemon }