
import { Router } from "express"
import { calcularMedia } from "../services/media.js"
const endpoints = Router()

//parâmetro de corpo
endpoints.post('/media', (res, resp) =>{
    let n1 = res.body.nota1
    let n2 = res.body.nota2
    let n3 = res.body.nota3

    let media = calcularMedia(n1,n2,n3)

    resp.send({
        media:media
    })
})


//parâmetro de corpo com vetor
endpoints.post('/vetor', (res, resp) => {
    let a = res.body.numeros

    let b = []
    for (let i = 0; i < a.length; i++) {
        b[i] = a[i] * 2
    }

    resp.send(`Os dobros são ${b}`)
})

export default endpoints