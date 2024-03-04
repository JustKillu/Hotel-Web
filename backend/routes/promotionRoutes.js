const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Esquema del promociones
const promoSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  time: String
});

// Crear el modelo del producto
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

// Ruta de la API para leer un producto
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



// Ruta de la API para crear un producto
router.post('/promotions', async (req, res) => {
  try {
    const newPromotions = new Promotion(req.body);
    const savedPromotions = await newPromotions.save();
    res.json(savedPromotions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

// Ruta de la API para actualizar un producto
router.put('/promotions/:id', async (req, res) => {
  try {
    const updatedPromotions = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedPromotions) {
      res.json(updatedPromotions);
    } else {
      res.status(404).json({ message: 'Promocion no encontrado' });
    }
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
