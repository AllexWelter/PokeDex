import React, { useState, useEffect} from React
import axios from 'axios'

function App() {
  const [pokemons, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [erros, setError] = useState(null)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/api/pokemons')
        setPokemons(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }  
    }
  })
}