import { Router} from 'express'
import { getPokemon } from '../controllers/pokemonControllers'

const router = Router()

router.get('/pokemon/id', getPokemon)

export default router