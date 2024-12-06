import express from 'express'
import pokemonRoutes from './src/controllers/pokemonControllers.js'

const app = express()
app.use(express.json())

app.use('/api', pokemonRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})