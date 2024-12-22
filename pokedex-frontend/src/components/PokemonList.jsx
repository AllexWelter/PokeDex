import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PokemonList({ onFilter }) {
    const [types, setTypes] = useState([])

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type')
                setTypes(response.data.results)
            } catch (error) {
                console.error('Erro ao buscar tipos de Pokémons:', error)
            }
        }
        fetchTypes()            
    }, [])  // Array vazio como segundo argumento garante que o useEffect seja executado apenas uma vez

} 


export default PokemonList