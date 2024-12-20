import express from 'express'
import cors from 'cors'
import pokemonRoutes from './src/routes/pokemonRoutes.js'

const app = express()
app.use(express.json())

app.use(cors())

app.use('/api', pokemonRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})