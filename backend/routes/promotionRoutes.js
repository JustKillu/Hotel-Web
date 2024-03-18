const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const fs = require('fs'); 
// Esquema del promociones
const promoSchema = new mongoose.Schema({
  name: String,
  description: String,
  comodidades: String,
  tarifas: String,
  evaluacion: String,
  img: { data: Buffer, contentType: String }
});

// Crear el modelo del promocion
const Promotion = mongoose.model('Promocion', promoSchema, 'Promotions');

// Crear una instancia de express
const app = express();

// Analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Ruta de la API para obtener promotion
router.get('/promotions', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

// Ruta de la API para leer un promocion
router.get('/promotions/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (promotion) {
      res.json(promotion);
    } else {
      res.status(404).json({ message: 'Promocion no encontrada' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error del servidor', error: error });
  }
});




// Ruta de la API para crear un promocion
router.post('/promotions', upload.single('img'), async (req, res) => {
  try {
    const newPromotions = new Promotion(req.body);
    newPromotions.img.data = fs.readFileSync(req.file.path);
    newPromotions.img.contentType = 'image/png'; // o 'image/jpeg', dependiendo del formato de la imagen
    const savedPromotions = await newPromotions.save();
    res.json(savedPromotions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});


// Ruta de la API para actualizar un promocion
router.put('/promotions/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promocion no encontrado' });
    }
    // Actualizar cada campo con los datos del cuerpo de la solicitud
    promotion.name = req.body.name;
    promotion.description = req.body.description;
    promotion.comodidades = req.body.comodidades;
    promotion.tarifas = req.body.tarifas;
    promotion.evaluacion = req.body.evaluacion;

    const updatedPromotion = await promotion.save();
    res.json(updatedPromotion);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});



router.delete('/promotions/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (promotion) {
      await Promotion.deleteOne({ _id: req.params.id });
      res.json({ message: 'Promocion eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Promocion no encontrado' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error', error: error });
  }
});

module.exports = router;
