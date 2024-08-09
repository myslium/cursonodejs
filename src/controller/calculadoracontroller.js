import { Router } from "express"

const endpoints = Router()
//calculadora 

endpoints.get('/calculadora/somar/:n1/:n2', (res, req) => {

    if (isNaN(res.params.n1) || isNaN(res.params.n2)) {
        req.status(402).send ({
            erro: 'os parametros devem ser números'
        })
    
    }

    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let soma = n1 + n2
    req.send({
        entradas: {
            numero1:n1,
            numero2: n2
       },
       soma: soma
    })
})

endpoints.get('/calculadora/subtrair/:n1/:n2', (res, req) => {
    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let sub = n1 - n2
    req.send(`a subtração entre ${n1} e ${n2} é ${sub}`)
})

endpoints.get('/calculadora/multiplicacao/:n1/:n2', (res, req) => {
    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let mult = n1 * n2
    req.send(`${n1} vezes ${n2} é ${mult}`)
})

endpoints.get('/calculadora/dividir/:n1/:n2', (res, req) => {
    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let div = n1 / n2
    req.send(`${n1} dividido por ${n2} é ${div}`)
})

endpoints.get('/calculadora/potencia/:n1/:n2', (res, req) => {
    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let pot = n1 ** n2
    req.send(`${n1} elevado a ${n2} é ${pot}`)
})

//calculadora com endpoint de query
endpoints.get('/calculadora/somar2', (res, req) => {
    let n1 = Number(res.query.n1)
    let n2 = Number(res.query.n2)
    let soma = n1 + n2
    req.send(`a soma de ${n1} e ${n2} é ${soma}`)
})

export default endpoints