
export function validarpedcompl (req) {
    if(!req.body.parcelas || isNaN(req.body.parcelas)) throw new Error('O parâmetro parcela está invalido')
        if(!req.body.itens) throw new Error('O parâmetro itens está invalido')
}