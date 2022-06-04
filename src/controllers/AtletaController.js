const Atletas = require('../models/Atleta');
const Clubes = require('../models/Clube');

module.exports = {
  async index(req, res){

    const { clube_id } = req.body;

    const clube = await Clubes.findByPk(clube_id, {
      include: { association: 'atletas' }
    });

    if(!clube){
      res.status(400).json({ error: "Clube não encontrado"});
    }

    res.json(clube.atletas);
  },
  async store(req, res) {
    const { cpf, nome, dataNascimento, sexo, foto, identificacao, clube_id } = req.body;

    const clube = await Clubes.findByPk(clube_id);

    if(!clube){
      return res.status(400).json({ error: 'Clube não encontrado!' });
    }

    const atleta = await Atletas.create({  cpf, nome, dataNascimento, sexo, foto, identificacao, clube_id });

    return res.json(atleta);

  }
}