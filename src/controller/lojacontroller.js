import { Router } from "express"
import { validarpedcompl } from "../validations/pedidocompl.js"

const endpoints = Router()


//parâmetros combinados
endpoints.post('/loja/pedido', (req, resp) => {

   
    let total = req.body.total
    let parcela = req.body.parcelas
    let cupom = req.query.cupom

    if (parcela > 1) {
        let juros = total * 0.05
        total += juros
    }

    if (cupom == 'QUERO100') {
        total -= 100
    }

    resp.send(`O total da compra é ${total}`)
})

//parâmetro vetor de objeto
endpoints.post('/loja/pedido/completo', (req, resp) => {
    try {
        validarpedcompl(req)

        let itens = req.body.itens
        let parcelas = req.body.parcelas
        let cupom = req.query.cupom
    
        let total = 0
        for (let pedido of itens) {
            total += pedido.preco
        }
    
        if (parcelas > 1) {
            let juros = total * 0.05
            total += juros
        }
    
        if (cupom === "QUERO100") {
            total -= 100
        }
    
        resp.send({
            total: total
        })
    }
    catch(err) {
        logError(err)
        resp.status(400).send ({
            erro: err.message
        })
    }
   

})

export default endpoints