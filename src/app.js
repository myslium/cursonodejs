import express from 'express'
import cors from 'cors'

import './utils/global.js'

const servidor = express()
servidor.use(express.json())
servidor.use(cors())

import adicionarRotas from './rotas.js'

adicionarRotas(servidor)

servidor.listen(
    2007,
    () => console.log('A API subiu com sucesso, oie :)')
)