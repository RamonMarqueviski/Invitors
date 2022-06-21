const Clubes = require('../models/Clube');

module.exports = {
  async index(req, res){
    const clubes = await Clubes.findAll();
    if(!clubes){
      res.status(400).json({error: 'Se fodeo'})
    }else{
      res.json(clubes);
    }
    
  },
  async store(req, res) {
    const { cnpj, sigla, nome, cidade } = req.body;

    const clube = await Clubes.create({ cnpj, sigla, nome, cidade });

    return res.json(clube);

  },
  async update(req, res) {
    const { cnpj, sigla, nome, cidade } = req.body;
    const { id } = req.params;

    const verificaClube = await Clubes.findByPk(id);

    if(!verificaClube){
      return res.status(400).json({ error: 'Clube não encontrado!' });
    }

    await Clubes.update(
      { cnpj, sigla, nome, cidade },
      {where: {id: id}}
    );

    const retorno = await Clubes.findByPk(id);
    return res.json(retorno);

  },
  async delete(req, res) {
    const { id } = req.params;

    const clube = await Clubes.findByPk(id);
    if(!clube){
      res.status(400).json({error: "Clube não encontrado"})
    }

    await Clubes.destroy({
      where: {id: id},
    })

    res.json({retorno: "Clube deletado com sucesso!"})

  }
}