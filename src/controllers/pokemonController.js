import connection from '../database/db.js'
import { getPokemonFromDatabase, getPokemonFromPokeAPI } from '../services/pokemonService.js'

const getPokemon = async (req, res) => {
    try {
        const id = req.params.id
        let pokemon = await getPokemonFromDatabase(id)

        if (!pokemon) {
            pokemon = await getPokemonFromPokeAPI(id)

            try {
              const sql = `INSERT INTO pokemon (id, nome, tipo) VALUES (?, ?, ?)`
              const values = [pokemon.id, pokemon.name, pokemon.types[0].type.name]
              const conexao = await connection
              await conexao.execute(sql, values)
              console.log('Pokémon salvo no banco de dados!')  
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

const listarPokemons = async (req, res) => {
    try {
        const { pagina = 1, limite = 10, ordenacao = 'id', tipo} = req.query
        
        let sql = `SELECT * FROM pokemon`
        const values = []

        if (tipo) {
            sql += `WHERE tipo = ?`
            values.push(tipo)
        }

        sql += `ORDER BY ${ordenacao} LIMIT ? OFFSET ?`
        const offset = (pagina - 1) * limite
        values.push(limite, offset)
    }
}

export { getPokemon }