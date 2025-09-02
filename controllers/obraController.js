import Obra from '../models/obra.js';

const obraController = {
  getObras: async (req, res) => {
    try {
      const obras = await Obra.find();
      return res.status(200).json(obras);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createObra: async (req, res) => {
    try {
      // Usar los mismos nombres de campos que el modelo
      const { nombre, ubicacion, descripcion } = req.body;
      const newObra = new Obra({ nombre, ubicacion, descripcion });
      await newObra.save();
      return res.status(201).json(newObra);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getObraById: async (req, res) => {
    try {
      const { id } = req.params;
      const obra = await Obra.findById(id);
      if (!obra) {
        return res.status(404).json({ message: 'Obra no encontrada' });
      }
      return res.status(200).json(obra);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateObra: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedObra = await Obra.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedObra) {
        return res.status(404).json({ message: 'Obra no encontrada' });
      }
      return res.status(200).json(updatedObra);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteObra: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedObra = await Obra.findByIdAndDelete(id);
      if (!deletedObra) {
        return res.status(404).json({ message: 'Obra no encontrada' });
      }
      return res.status(200).json({ message: 'Obra eliminada correctamente' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default obraController;