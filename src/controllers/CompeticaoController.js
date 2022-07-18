const Competicao = require("../models/Competicao");
const CategoriasCompeticoes = require("../models/CategoriaCompeticao");
const Atleta = require("../models/Atleta");
const Categoria = require("../models/Categoria");
const CategoriaCompeticaoAtletas = require("../models/CategoriaCompeticaoAtletas");

const xl = require("excel4node");
module.exports = {
  async index(req, res) {
    const competicao = await Competicao.findAll();

    res.json(competicao);
  },
  async store(req, res) {
    const { nome, dataInicio, dataFim, dataPrazoInscricoes } = req.body;

    const competicao = await Competicao.create({
      nome,
      dataInicio,
      dataFim,
      dataPrazoInscricoes,
    });

    return res.json(competicao);
  },
  async update(req, res) {
    const { nome, dataInicio, dataFim, dataPrazoInscricoes } = req.body;
    const { id } = req.params;

    const verificaCompeticao = await Competicao.findByPk(id);

    if (!verificaCompeticao) {
      return res.status(400).json({ error: "Competição não encontrada!" });
    }

    await Competicao.update(
      { nome, dataInicio, dataFim, dataPrazoInscricoes },
      { where: { id: id } }
    );

    const retorno = await Competicao.findByPk(id);
    return res.json(retorno);
  },
  async delete(req, res) {
    const { id } = req.params;

    const competicao = await Competicao.findByPk(id);
    if (!competicao) {
      res.status(400).json({ error: "Competição não encontrada" });
    } else {
      await competicao.destroy({
        where: { id: id },
      });

      res.json({ retorno: "Competição deletada com sucesso!" });
    }
  },
  async gerarXLSX(req, res) {
    //validacao se existe competicao

    // const { id } = req.params;
    //  const competicao = await Competicao.findByPk(id);

    // if (!competicao) {
    //   res.status(400).json({ error: "Competição não encontrada" });
    // }

    //Criacao do Workbook
    const wb = new xl.Workbook();
    //nome para a planilha
    const ws = wb.addWorksheet("Nome da planilha");

    //Busca no banco para retorno -- fazer

    const data = [
      {
        Name: "Ramon Vinicius Marqueviski",
        "Member id": "000001",
        Event: "SMSenior",
        "Partner id": "123123123",
        DoB: "04/04/2001",
        Paid: "R$ 30,00",
        Club: "Furiacao",
      },
      {
        Name: "Afonso",
        "Member id": "000002",
        Event: "SMSenior",
        "Partner id": "123123123",
        DoB: "04/04/2001",
        Paid: "R$ 30,00",
        Club: "Furiacao",
      },
      {
        Name: "Joao Elias",
        "Member id": "000003",
        Event: "SMSenior",
        "Partner id": "123123123",
        DoB: "04/04/2001",
        Paid: "R$ 30,00",
        Club: "Furiacao",
      },
    ];

    //Titulos da planilha

    const headingColumnsNames = [
      "Name",
      "Member id",
      "Event",
      "Partner id",
      "DoB",
      "Paid",
      "Club",
    ];
    //Define o inicio das colunas
    let headingColumnIndex = 1;

    //Monta o header
    headingColumnsNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    //Montando o body

    //Define o inicio da linha
    let rowIndex = 2;

    //Monta o body passando pelo array de objetos
    data.forEach((record) => {
      let ColumnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, ColumnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });

    let name = "Competicao_Blast";
    wb.write(`./ExcelReports/${name}.xlsx`);
    res.json({ retorno: "Excel gerado!" });
  },

  async inscreverAtleta(req, res) {
    const { idCompeticao } = req.params;
    const { idAtleta, idAtleta2, idCategoria } = req.body;

    //Verifica se existe atleta
    const atleta = await Atleta.findByPk(idAtleta);
    if (!atleta) {
      return res.status(400).json({ error: "Atleta não encontrado!" });
    }

    //Verifica se existe categoria em competicao
    const categoriaCompeticao = await CategoriasCompeticoes.findOne({
      where: {
        competicaoId: idCompeticao,
        categoriaId: idCategoria,
      },
      attributes: ["id"],
    });

    if (!categoriaCompeticao) {
      return res
        .status(400)
        .json({ error: "Categoria não encontrada dentro da competição!" });
    }
    //inscrever atleta em uma competicao
    categoriaCompeticao.addCategoriasCompeticoesAtleta(atleta);

    //Verifica se a categoria eh em dupla
    const categoria = await Categoria.findByPk(idCategoria);
    if (
      categoria.dupla == "Dupla mista" ||
      categoria.dupla == "Dupla feminina" ||
      categoria.dupla == "Dupla masculina"
    ) {
      //Verifica se existe atleta2
      if (!idAtleta2) {
        return res
          .status(400)
          .json({ error: "Atleta 2 precisa ser informado!" });
      }
      if (idAtleta2 == idAtleta) {
        return res
          .status(400)
          .json({ error: "Atleta 2 precisa ser diferente que atleta 1!" });
      }
      const atleta2 = await Atleta.findByPk(idAtleta2);
      if (!atleta2) {
        return res.status(400).json({ error: "Atleta não encontrado!" });
      }

      const categoriaCompeticaoAtleta =
        await CategoriaCompeticaoAtletas.findOne({
          where: {
            atletaId: idAtleta,
            id: categoriaCompeticao.id,
          },
        });

      //Verifica se existe a categoriaCompeticaoAtleta

      if (!categoriaCompeticaoAtleta) {
        return res.status(400).json({ error: "Erro interno" });
      }
      await CategoriaCompeticaoAtletas.update(
        { atletaId2: idAtleta2 },
        { where: { id: categoriaCompeticaoAtleta.id } }
      );
      return res.json({ retorno: "Atletas inscritos com sucesso!" });
    } else {
      return res.json({ retorno: "Atleta inscrito com sucesso!" });
    }
  },
  async listarAtletasInscritosCompeticao(req, res) {
    const { idCompeticao, idCategoria } = req.params;

    //Verifica se existe competicao
    const competicao = await Competicao.findByPk(idCompeticao);
    if (!competicao) {
      return res.status(400).json({ error: "Competição não encontrada!" });
    }

    //Verifica se existe categoria em competicao
    const categoriaCompeticao = await CategoriasCompeticoes.findOne({
      where: {
        competicaoId: idCompeticao,
        categoriaId: idCategoria,
      },
    });

    if (!categoriaCompeticao) {
      return res
        .status(400)
        .json({ error: "Categoria não encontrada dentro da competição!" });
    }
    const atletas = await categoriaCompeticao.getCategoriasCompeticoesAtletas();

    return res.json(atletas);
  },
  async desinscreverAtleta() {
    const { idCompeticao } = req.params;
    const { idAtleta, idCategoria } = req.body;

    //Verifica se existe atleta
    const atleta = await Atleta.findByPk(idAtleta);
    if (!atleta) {
      return res.status(400).json({ error: "Atleta não encontrado!" });
    }

    //Verifica se existe categoria em competicao
    const categoriaCompeticao = await CategoriasCompeticoes.findOne({
      where: {
        competicaoId: idCompeticao,
        categoriaId: idCategoria,
      },
    });

    if (!categoriaCompeticao) {
      return res
        .status(400)
        .json({ error: "Categoria não encontrada dentro da competição!" });
    }
    //desinscrever atleta em uma competicao
    categoriaCompeticao.removeCategoriasCompeticoesAtleta(atleta);

    return res.json({ retorno: "Atleta desinscrito com sucesso!" });
  },
};
