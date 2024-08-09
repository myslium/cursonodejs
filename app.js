import express from 'express'
import cors from 'cors'
import multer from 'multer'


const servidor = express()
servidor.use(express.json())
servidor.use(cors())

let uploadPerfil = multer({dest: './storage/perfil'})

servidor.use('/storage/perfil', express.static('./storage/perfil'))


//get, (consulta) /helloworld, (parametro) 
servidor.get('/helloworld', (res, req) => {
    //código do endpoin get + helloworld ===>
    req.send('hello world :)')
})

//endpoint: funcionalidade versionada
servidor.get('/mensagem/recado', (res, req) => {
    req.send('Oie')
})

servidor.get('/v2/mensagem/recado', (res, req) => {
    req.send('porque sim :) <33333333 s22222')
})

//endpoint: níveis de rota
servidor.get('/mensagem/recebendo', (res, req) => {
    req.send('aaaaa')
}) 

servidor.get('/mensagem/recebendo/novo', (res, req) => {
    req.send('ola')
}) 

//calculadora 

servidor.get('/calculadora/somar/:n1/:n2', (res, req) => {

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

servidor.get('/calculadora/subtrair/:n1/:n2', (res, req) => {
    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let sub = n1 - n2
    req.send(`a subtração entre ${n1} e ${n2} é ${sub}`)
})

servidor.get('/calculadora/multiplicacao/:n1/:n2', (res, req) => {
    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let mult = n1 * n2
    req.send(`${n1} vezes ${n2} é ${mult}`)
})

servidor.get('/calculadora/dividir/:n1/:n2', (res, req) => {
    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let div = n1 / n2
    req.send(`${n1} dividido por ${n2} é ${div}`)
})

servidor.get('/calculadora/potencia/:n1/:n2', (res, req) => {
    let n1 = Number(res.params.n1)
    let n2 = Number(res.params.n2)
    let pot = n1 ** n2
    req.send(`${n1} elevado a ${n2} é ${pot}`)
})

//calculadora com endpoint de query
servidor.get('/calculadora/somar2', (res, req) => {
    let n1 = Number(res.query.n1)
    let n2 = Number(res.query.n2)
    let soma = n1 + n2
    req.send(`a soma de ${n1} e ${n2} é ${soma}`)
})

servidor.get('/mensagem/ola', (res, req) => {
    let pessoa = res.query.nome ?? '!'

    req.send(`Seja bem-vindo(a) ${pessoa}`)
})


//parâmetro de corpo
servidor.post('/media', (res, resp) =>{
    let n1 = res.body.nota1
    let n2 = res.body.nota2
    let n3 = res.body.nota3

    let media = (n1 + n2 + n3) / 3
    resp.send(`A média é ${media}`)
})


//parâmetro de corpo com vetor
servidor.post('/vetor', (res, resp) => {
    let a = res.body.numeros

    let b = []
    for (let i = 0; i < a.length; i++) {
        b[i] = a[i] * 2
    }

    resp.send(`Os dobros são ${b}`)
})

//parâmetros combinados
servidor.post('/loja/pedido', (req, resp) => {

   
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
servidor.post('/loja/pedido/completo', (req, resp) => {
    try {
        if(!req.body.parcelas || isNaN(req.body.parcelas)) throw new Error('O parâmetro parcela está invalido')
        if(!req.body.itens) throw new Error('O parâmetro itens está invalido')
            
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
        resp.status(400).send ({
            erro: err.message
        })
    }
   

})

servidor.post('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {
    let caminho = req.file.path;
    let extensao = req.file.mimetype;
    let nome = req.file.originalname;

    resp.send ({
        caminho: caminho,
        extensao: extensao,
        nome: nome
    })

})


servidor.listen(
    2007,
    () => console.log('A API subiu com sucesso, oie :)')
)