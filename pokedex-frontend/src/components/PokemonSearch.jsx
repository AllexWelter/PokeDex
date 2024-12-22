import React, { useState } from 'react'

function PokemonSearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSearch(searchTerm)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Busca Pokémon...'
                value={searchTerm}
                onChange={handleChange}
            />
            <button type='submit'>Buscar</button>
        </form>
    )
}

export default PokemonSearch