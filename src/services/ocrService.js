const Tesseract = require('tesseract.js');

const recognizeText = async (imagePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    return text.trim();
  } catch (error) {
    throw new Error('Error recognizing text');
  }
};

module.exports = { recognizeText };
