import { Router} from 'express'
import { getPokemon } from '../controllers/pokemonController.js'
import { listarPokemons } from '../controllers/pokemonController.js'

const router = Router()

router.get('/pokemon/:id', getPokemon)
router.get('/pokemons', listarPokemons)

export default router