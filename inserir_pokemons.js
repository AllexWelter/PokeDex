import axios from 'axios';
import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'allex123',
    database: 'pokedex',
});

const inserirPokemon = async (pokemon) => {
    try {
        const sql = `INSERT INTO pokemon (id, nome, tipo) VALUES (?, ?, ?)`;
        const values = [pokemon.id, pokemon.name, pokemon.types[0].type.name];
        await connection.execute(sql, values);
        console.log(`Pokémon ${pokemon.name} inserido com sucesso!`);
    } catch (error) {
        console.error('Erro ao inserir Pokémon:', error);
    }
};

const buscarPokemons = async () => {
    try {
        for (let id = 1; id <= 150; id++) { // Loop para buscar os 150 primeiros Pokémons
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            await inserirPokemon(response.data);
        }
    } catch (error) {
        console.error('Erro ao buscar Pokémons:', error);
    }
};

buscarPokemons();