import { Router} from 'express'
import { buscarPokemonPorNome, getPokemon } from '../controllers/pokemonController.js'
import { listarPokemons } from '../controllers/pokemonController.js'

const router = Router()

router.get('/pokemon/:id', getPokemon)
router.get('/pokemons', listarPokemons)
router.get('/pokemons/nome', buscarPokemonPorNome)

export default router