import connection from '../database/db.js'
import { getPokemonFromDatabase, getPokemonFromPokeAPI } from '../services/pokemonService.js'
import pokemonSchema from '../schemas/pokemonSchema.js'
import yup from 'yup';

const getPokemon = async (req, res) => {
    try {
        const id = req.params.id

        await yup.validate(req.body, pokemonSchema)

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
                res.status(500).json({ error: 'Erro ao salvar Pokémon' })
                return
            }
        }

        res.json(pokemon)
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.error('Erro de validação:', error)
            res.status(400).json({ error: error.errors })
        } else {
            console.log('Erro ao buscar Pokémon:', error)
            res.status(500).json({ error: 'Erro ao buscar Pokémon' })
        }

    }
}

const listarPokemons = async (req, res) => {
    try {
        const { pagina = 1, limite = 10, ordenacao = 'id', tipo } = req.query

        const paginaNumero = parseInt(pagina)
        const limiteNumero = parseInt(limite)

        let sql = `SELECT * FROM pokemon`
        const values = []

        if (tipo) {
            sql += sql.includes('WHERE') ? ` AND tipo = ?` : ` WHERE tipo = ?`
            values.push(tipo)
        }

        if (pagina !== 1 || limite !== 10) {
            sql += ` ORDER BY ${ordenacao} LIMIT ? OFFSET ?`
            const offset = (paginaNumero - 1) * limiteNumero
            values.push(limiteNumero, offset)
        }

        const conexao = await connection
        const [pokemons] = await conexao.execute(sql, values)

        res.json(pokemons)
    } catch (error) {
        console.error('Erro ao listar Pokémons:', error)
        res.status(500).json({ error: 'Erro ao listar Pokémons' })
    }
}

const buscarPokemonPorNome = async (req, res) => {
    try {
        const { nome } = req.query

        if (!nome) {
            return res.status(400).json({ error: 'O parâmetro "nome" é obrigatório.' })
        }

        const sql = `SELECT * FROM pokemon WHERE nome LIKE ?`
        const conexao = await connection
        const [pokemons] = await conexao.execute(sql, [`%${nome}%`])

        res.json(pokemons)
    } catch (error) {
        console.error('Erro ao buscar Pokémon por nome:', error)
        res.status(500).json({ error: 'Erro ao buscar Pokémon por nome' })
    }
}

export { getPokemon, listarPokemons, buscarPokemonPorNome }