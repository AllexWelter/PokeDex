import axios from 'axios'
import connection from '../database/db.js'

const getPokemonFromDatabase = async (id) => {
    try {
        const sql = 'SELECT * FROM pokemon WHERE id = ?'
        const conexao = await connection
        const [rows] = await conexao.execute(sql, [id])
        return rows[0]
    } catch (error) {
        console.log('Erro ao busca Pokémon no banco de dados:', error)
        throw error
    }    
}

const getPokemonFromPokeApi = async(id) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/${id}')
        return response.data
    } catch (error) {
        console.error('Erro ao buscar Pokémon na PokéAPI:', error)
        throw error
    }
}

export { getPokemonFromDatabase, getPokemonFromPokeApi}