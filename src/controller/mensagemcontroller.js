import { Router } from "express"

const endpoints = Router()

//get, (consulta) /helloworld, (parametro) 
endpoints.get('/helloworld', (res, req) => {
    //código do endpoin get + helloworld ===>
    req.send('hello world :)')
})

//endpoint: funcionalidade versionada
endpoints.get('/mensagem/recado', (res, req) => {
    req.send('Oie')
})

endpoints.get('/v2/mensagem/recado', (res, req) => {
    req.send('porque sim :) <33333333 s22222')
})

//endpoint: níveis de rota
endpoints.get('/mensagem/recebendo', (res, req) => {
    req.send('aaaaa')
}) 

endpoints.get('/mensagem/recebendo/novo', (res, req) => {
    req.send('ola')
}) 

endpoints.get('/mensagem/ola', (res, req) => {
    let pessoa = res.query.nome ?? '!'

    req.send(`Seja bem-vindo(a) ${pessoa}`)
})

export default endpoints