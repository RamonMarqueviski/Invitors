const Categorias = require("../models/Categoria");
const categoriasCompeticoes = require("../models/CategoriaCompeticao");
const Competicao = require("../models/Competicao");

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
    const { nome, descricao, dupla, idadeMax, idadeMin } = req.body;
    //cria um novo objeto com os dados do body
    const categoria = await Categorias.create({
      nome,
      descricao,
      dupla,
      idadeMax,
      idadeMin,
    });
    //retorna o objeto criado
    return res.json(categoria);
  },
  async update(req, res) {
    //pega do body o nome, descricao, isDupla, idadeMax, idadeMin
    const { nome, descricao, dupla, idadeMax, idadeMin } = req.body;
    //pega do params o id
    const { id } = req.params;
    //verifica se existe a categoria
    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(400).json({ error: "Categoria não encontrada" });
    } else {
      //atualiza o objeto
      await Categorias.update(
        { nome, descricao, dupla, idadeMax, idadeMin },
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
      where: { id: id },
    });
    //retorna mensagem de sucesso
    return res.status(200).json({ retorno: "Categoria deletada com sucesso!" });
  },
  async addPaidCategoriaCompeticao(req, res) {
    const { idCategoria, idCompeticao } = req.params;
    const { paid } = req.body;

    const categoria = await Categorias.findByPk(idCategoria);
    if (!categoria) {
      return res.status(400).json({ error: "Categoria não encontrada" });
    }

    const competicao = await Competicao.findByPk(idCompeticao);
    if (!competicao) {
      return res.status(400).json({ error: "Competição não encontrada" });
    }

    if (!paid || paid <= 0) {
      return res.status(400).json({ error: "Paid inválido" });
    }
    categoriasCompeticoes.update(
      { paid },
      { where: { categoriaId:idCategoria, competicaoId: idCompeticao } }
    );
    return res.status(200).json({ retorno: "Paid atualizado com sucesso!" });
  },
  async addCategoriaEmCompeticao(req, res) {
    const { id } = req.params;
    const { idCategoria } = req.body;
    for (let i = 0; i < idCategoria.length; i++) {
      //Verifica se existe a competicao
      const competicao = await Competicao.findByPk(id);
      if (!competicao) {
        return res.status(400).json({ error: "Competição não encontrada" });
      }
      //Verifica se existe a categoria
      const categoria = await Categorias.findByPk(idCategoria[i]);
      if (!categoria) {
        return res.status(400).json({ error: "Categoria não encontrada" });
      }
      //Adiciona a competicao a categoria
      await competicao.addCategoria(categoria);
    }
    return res
      .status(200)
      .json({ retorno: "Categoria adicionada com sucesso!" });
  },

  async removeCategoriaEmCompeticao(req, res) {
    const { id, idCategoria } = req.params;
    //Verifica se existe a competicao
    const competicao = await Competicao.findByPk(id);
    if (!competicao) {
      return res.status(400).json({ error: "Competição não encontrada" });
    }
    //Verifica se existe a categoria
    const categoria = await Categorias.findByPk(idCategoria);
    if (!categoria) {
      return res.status(400).json({ error: "Categoria não encontrada" });
    }
    //Remove a competicao a categoria
    await competicao.removeCategoria(categoria);
    return res.status(200).json({ retorno: "Categoria removida com sucesso!" });
  },
  async indexCategoriasEmCompeticao(req, res) {
    const { id } = req.params;
    //Verifica se existe a competicao
    const competicao = await Competicao.findByPk(id);
    if (!competicao) {
      return res.status(400).json({ error: "Competição não encontrada" });
    }
    //Retorna as categorias da competicao
    const categorias = await competicao.getCategorias();
    return res.json(categorias);
  },
};
