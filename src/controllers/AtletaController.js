const Atletas = require('../models/Atleta');
const Clubes = require('../models/Clube');

module.exports = {
  async index(req, res){

    const { clube_id } = req.body;

    if(!clube_id){
      return res.status(400).json({
        error: 'Falta parâmetro'
      })
    }

    const clube = await Clubes.findByPk(clube_id, {
      include: { association: 'atletas' }
    });

    if(!clube){
      res.status(400).json({ error: "Clube não encontrado"});
    }

    res.json(clube);
  },
  async store(req, res) {
    const { cpf, nome, dataNascimento, sexo, foto, identificacao, clube_id } = req.body;

    const clube = await Clubes.findByPk(clube_id);

    if(!clube){
      return res.status(400).json({ error: 'Clube não encontrado!' });
    }

    const atleta = await Atletas.create({ cpf, nome, dataNascimento, sexo, foto, identificacao, clube_id });

    return res.json(atleta);

  },
  async update(req, res) {
    const { cpf, nome, dataNascimento, sexo, foto, identificacao, clube_id } = req.body;
    const { id } = req.params;

    const verificaClube = await Atletas.findByPk(clube_id);

    if(!verificaAtleta){
      return res.status(400).json({ error: 'Atleta não encontrado!' });
    }

    if(!verificaClube){
      return res.status(400).json({ error: 'Clube não encontrado!' });
    }

    await Atletas.update(
      { cpf, nome, dataNascimento, sexo, foto, identificacao, clube_id },
      {where: {id: id}}
    );

    const retorno = await Atletas.findByPk(id);
    return res.json(retorno);

  },
  async delete(req, res) {
    const { id } = req.params;

    const atleta = await Atletas.findByPk(id);
    if(!atleta){
      res.status(400).json({error: "Atleta não encontrado"})
    }

    await Atletas.destroy({
      where: {id: id},
    })

    res.json({retorno: "Atleta deletado com sucesso!"})

  }

}