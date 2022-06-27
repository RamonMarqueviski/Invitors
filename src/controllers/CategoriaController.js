const Categorias = require("../models/Categoria");

module.exports = {
  async index(req, res) {
    const categoria = await Categorias.findAll();
    if (!categoria) {
      return res.status(400).json({ error: "Nenhuma categoria encontrada" });
    } else {
      return res.json(categoria);
    }
  },
  async store(req, res) {
    //pega do body o nome, descricao, isDupla, idadeMax, idadeMin
    const { nome, descricao, isDupla, idadeMax, idadeMin } = req.body;
    //cria um novo objeto com os dados do body
    const categoria = await Categorias.create({
      nome,
      descricao,
      isDupla,
      idadeMax,
      idadeMin
    });
    //retorna o objeto criado
    return res.json(categoria);
  },
  async update(req, res) {
    //pega do body o nome, descricao, isDupla, idadeMax, idadeMin
    const { nome, descricao, isDupla, idadeMax, idadeMin } = req.body;
    //pega do params o id
    const { id } = req.params;
    //verifica se existe a categoria
    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(400).json({ error: "Categoria não encontrada" });
    } else {
      //atualiza o objeto
      await Categorias.update(
        { nome, descricao, isDupla, idadeMax, idadeMin },
        { where: { id: id } }
      );
       const categoriaAtualizado = await Categorias.findByPk(id);
      //retorna o objeto atualizado
      return res.status(200).json(categoriaAtualizado);
    }
  },
  async delete(req, res) {
    //pega do params o id
    const { id } = req.params;
    //verifica se existe a categoria
    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(400).json({ error: "Categoria não encontrada" });
    }
    //deleta a categoria
    await Categorias.destroy({
      where: { id: id }
    });
    //retorna mensagem de sucesso
    return res.status(200).json({ retorno: "Categoria deletada com sucesso!" });
  },
};
