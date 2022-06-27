const Usuarios = require("../models/Usuario");
const Clube = require("../models/Clube");

module.exports = {
  async index(req, res) {
    const usuarios = await Usuarios.findAll();
    if (!usuarios) {
      return res.status(400).json({ error: "Nenhum usuário encontrado" });
    } else {
      return res.json(usuarios);
    }
  },
  async store(req, res) {
    // Criar um usuario com username e senha
    const { username, senha, clubeId } = req.body;

    //Verifica se o clube existe
    const clube = await Clube.findByPk(clubeId);
    if (!clube) {
      return res.status(400).json({ error: "Clube não existe" });
    }

    const usuario = await Usuarios.create({
      username,
      senha,
      clubeId,
    });
    return res.json(usuario);
  },
  async update(req, res) {
    // Atualizar um usuario com username e senha
    const { username, senha, clubeId } = req.body;
    const { id } = req.params;
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    await usuario.update({
      username,
      senha,
      clubeId,
    });
    return res.json(usuario);
  },
  async delete(req, res) {
    // Deletar um usuario com id
    const { id } = req.params;
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    await usuario.destroy({
      where: { id: id },
    });
    return res.json({ retorno: "Usuário deletado com sucesso!" });
  },
  async login(req, res) {
    //Verifica se há algumas pessoa com o username e senha
    const { username, senha } = req.body;

    //Verifica se o usuario existe
    const userExiste = await Usuarios.findOne({
      where: {
        username: username,
      },
    });

    if (!userExiste) {
      return res.status(400).json({ error: "Usuário não existente!" });
    }

    //Verifica se a senha está correta
    const usuario = await Usuarios.findOne({
      where: {
        username,
        senha,
      },
    });
    if (!usuario) {
      return res.status(400).json({ error: "Senha incorreta" });
    }
    return res.json(usuario);
  },
  async indexPorClube(req, res) {
    const { clubeId } = req.body;
    if (!clubeId) {
      return res.status(400).json({ error: "Falta parâmetro" });
    }
    const clube = await Clube.findByPk(clubeId, {
      include: { association: "Usuarios" },
    });
    if (!clube) {
      return res.status(400).json({ error: "Clube não encontrado" });
    }

    return res.json(clube.Usuarios);
  },
};
