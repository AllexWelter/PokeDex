import connection from '../database/db.js'
import { getPokemonFromDatabase, getPokemonFromPokeAPI } from '../services/pokemonService.js'

const getPokemon = async (req, res) => {
    try {
        const id = req.params.id
        let pokemon = await getPokemonFromDatabase(id)

        if (!pokemon) {
            pokemon = await getPokemonFromPokeAPI(id)

            try {
              const sql = `INSERTO INTO pokemon (id, nome, tipo) VALUES (?, ?, ?)`
              const values = [pokemon.id, pokemon.nome, pokemon.type[0].type.name]
              const conexao = await connection
              await conexao.execute(sql, values)
              console.log('Pokémon salvo no banco de dados')  
            } catch (error) {
                console.error('Erro ao salvar Pokémon no banco de dados:', error)
                res.status(500).json({error: 'Erro ao salvar Pokémon' })
                return    
            }
        }

        res.json(pokemon)
    } catch (error) {
        console.log('Erro ao buscar Pokémon:', error)
        res.status(500).json({error: 'Erro ao buscar Pokémon' })
    }
}

export { getPokemon }