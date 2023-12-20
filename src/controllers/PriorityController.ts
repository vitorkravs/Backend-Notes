import { Request, Response } from "express";
import Annotations from "../models/AnnotationData";

const PriorityController = {
  async read(req: Request, res: Response) {
    try {
      const { priority } = req.query;
      const priorityNotes = await Annotations.find({ priority });
      return res.json(priorityNotes);
    } catch (error) {
      console.error("Erro ao ler anotações por prioridade:", error);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const annotation = await Annotations.findOne({ _id: id });

      if (annotation) {
        // Alterna o valor de 'priority'
        annotation.priority = !annotation.priority;

        // Salva a atualização no banco de dados
        await annotation.save();
      } else {
        return res.status(404).json({ error: "Anotação não encontrada" });
      }

      return res.json(annotation);
    } catch (error) {
      console.error("Erro ao atualizar anotações:", error);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },
};

export default PriorityController;
