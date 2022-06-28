//Crud de status

const Status = require("../models/State");

module.exports = {
  async index(req, res) {
    //Procura todos os status
    const status = await Status.findAll();
    return res.json(status);
  },
  async store(req, res) {
    //Cria um novo status
    const { nome } = req.body;
    const status = await Status.create({ nome });
    return res.json(status);
  },
  async update(req, res) {
    //Atualiza um status
    const { nome } = req.body;
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(400).json({ error: "Status não encontrado!" });
    }
    await Status.update({ nome }, { where: { id: id } });
    const statusAtualizado = await Status.findByPk(id);
    return res.json(statusAtualizado);
  },
  async delete(req, res) {
    //Deleta um status
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(400).json({ error: "Status não encontrado!" });
    }
    await Status.destroy({
      where: { id: id },
    });
    return res.json({ retorno: "Status deletado com sucesso!" });
  },
};
