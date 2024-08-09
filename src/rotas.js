import express from 'express'

import usuariocontroller from './controller/usuariocontroller.js'
import mensagemcontroller from './controller/mensagemcontroller.js'
import lojacontroller from './controller/lojacontroller.js'
import exercicioscontroller from './controller/exercicios.controller.js'
import calculadoracontroller from './controller/calculadoracontroller.js'

export default function adicionarRotas (servidor) {
    servidor.use('/storage/perfil', express.static('./storage/perfil'))

    servidor.use(usuariocontroller)
    servidor.use(mensagemcontroller)
    servidor.use(lojacontroller)
    servidor.use(exercicioscontroller)
    servidor.use(calculadoracontroller)
}