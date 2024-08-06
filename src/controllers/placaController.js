const Placa = require('../models/Placa');
const { recognizeText } = require('../services/ocrService');
const { generatePDF } = require('../utils/pdfGenerator');
const fs = require('fs');

exports.cadastrarPlaca = async (req, res) => {
  const { cidade } = req.body;
  const foto = req.file.path;

  try {
    const placa = await recognizeText(foto);

    const novaPlaca = new Placa({ placa, cidade });
    await novaPlaca.save();

    res.status(201).json({ message: 'Placa cadastrada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar placa.' });
  } finally {
    fs.unlink(foto, () => {}); // Remove a imagem temporária após o processamento
  }
};

exports.gerarRelatorio = async (req, res) => {
  const { cidade } = req.params;

  try {
    const placas = await Placa.find({ cidade });
    const filePath = generatePDF(placas, cidade);

    res.status(200).download(filePath, `relatorio_${cidade}.pdf`, (err) => {
      if (err) console.error(err);
      fs.unlink(filePath, () => {}); // Remove o PDF temporário após o download
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório.' });
  }
};

exports.consultarPlaca = async (req, res) => {
  const { placa } = req.params;

  try {
    const placaEncontrada = await Placa.findOne({ placa });

    if (placaEncontrada) {
      res.status(200).json({ message: 'Placa encontrada!', placa: placaEncontrada });
    } else {
      res.status(404).json({ message: 'Placa não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar placa.' });
  }
};
