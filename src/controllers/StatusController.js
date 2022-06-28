//Crud de status

const status = require('../models/Status');

module.exports = {
  async index(req, res) {
    //Procura todos os status
        const status = await status.findAll();
        return res.json(status);

  },
  async store(req, res) {
    //Cria um novo status
    const { nome } = req.body;
    const status = await status.create({ nome });
    return res.json(status);
    
  },
  async update(req, res) {
    //Atualiza um status
      const { nome } = req.body;
      const { id } = req.params;
      const status = await status.findByPk(id);
      if (!status) {
          return res.status(400).json({ error: "Status não encontrado!" });
      }
      await status.update({ nome });
      return res.json(status);
  },
  async delete(req, res) {
    //Deleta um status
      const { id } = req.params;
      const status = await status.findByPk(id);
      if (!status) {
            return res.status(400).json({ error: "Status não encontrado!" });
      }
      await status.destroy({
          where: { id: id },
      });
        return res.json({ retorno: "Status deletado com sucesso!" });
  },
};