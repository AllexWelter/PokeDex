import * as yup from 'yup'

const pokemonSchema = yup.object().shape({
    id: yup.string().positive().integer().required(),
    nome: yup.string().required(),
    tipo: yup.string().required()
})

export default pokemonSchema
