const express = require('express');
const multer = require('multer');
const placaController = require('../controllers/placaController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/cadastroPlaca', upload.single('foto'), placaController.cadastrarPlaca);
router.get('/relatorio/cidade/:cidade', placaController.gerarRelatorio);
router.get('/consulta/:placa', placaController.consultarPlaca);

module.exports = router;
